import React from 'react'
import {
  View,
  Text,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import styles from './Style'
import SingleJobImage from './SingleJobImage'
import Icon from '../../../../Config/Icons'
import { SingleJobStrings } from '../../../../Config/Strings'
import Description from './Description'
import Rules from './Rules'
import Tranining from './Tranining'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { width, height } from '../../../../Config/Layout'

function SingleJob({ route, store, navigation }) {
  const [isSelected, setSelected] = React.useState(0)
  const [isPoints, setPoints] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)

  const Scroll = React.useRef(null)
  const { item } = route.params

  React.useEffect(() => {
    var Dpoints = I18nManager.isRTL ? item.DescriptionPointsAr : item.DescriptionPoints
    var Rpoints = I18nManager.isRTL ? item.RulesPointsAr : item.RulesPoints
    var Tpoints = I18nManager.isRTL ? item.TrainingPointsAr : item.TrainingPoints
    var D = Dpoints.split(',')
    var R = Rpoints.split(',')
    var T = Tpoints.split(',')

    setPoints({ D: D, R: R, T: T })

    setLoading(false)
    return
  }, [])

  const check = async (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10
    const currentPage = await Math.floor(xOffset / width)

    if (currentPage === -1) {
      return
    }
    if (currentPage !== isSelected) {
      // console.log(currentPage)
      setSelected(currentPage)
      return
    }

    return
  }

  const ScrollTo = async (val) => {
    const currentPage = await Math.floor(val * width)
    const xOffset = currentPage + 10
    const currentPagetwo = await Math.floor(xOffset / width)

    if (currentPagetwo === -1) {
      return
    }
    if (currentPagetwo !== isSelected) {
      // console.log(currentPagetwo)
      Scroll.current.scrollTo({ x: currentPage })
      return
    }

    return
  }
  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TitleImage}>
          <SingleJobImage
            source={{
              uri: item.ImageURL,
            }}
            Name={I18nManager.isRTL ? item.NameAr : item.Name}
            onPressWork={() => navigation.navigate('WorkSchedule', { eventId: item.id })}
          />
        </View>
        <View style={styles.DataContainer}>
          <Text style={styles.SingleJobDetailsTime}>
            {SingleJobStrings.date}
            <Text style={{ color: '#000' }}>{I18nManager.isRTL ? item.DateAr : item.Date}</Text>
          </Text>
          <Text style={styles.SingleJobDetailsTitle}>{I18nManager.isRTL ? item.TitleAr : item.Title}</Text>
          <TouchableOpacity
            style={styles.SingleJobDetailsLocationView}
            onPress={() => Linking.openURL(item.LocationURL)}>
            <Icon name="map-pin" size={14} color="#000" />
            <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
              {I18nManager.isRTL ? item.LocationAr : item.Location}
            </Text>
            <Icon name="external-link" size={14} color={PrimaryColor} />
          </TouchableOpacity>
          <View style={styles.SingleJobDetailsDataView}>
            <Text style={styles.SingleSalaryText}>{SingleJobStrings.Salary}</Text>
            <View style={styles.DataSectionsTop}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.SalarySpace}>
                  {SingleJobStrings.supervisor + ': '}
                  <Text style={styles.SingleSalaryTextData}>
                    {item.SalarySupervisor} {I18nManager.isRTL ? 'ريال' : 'sar'}
                    <Text style={styles.Hour}>/{I18nManager.isRTL ? 'الساعة' : 'Hour'}</Text>
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text>
                  {SingleJobStrings.organizer + ': '}
                  <Text style={styles.SingleSalaryTextData}>
                    {item.Salary} {I18nManager.isRTL ? 'ريال' : 'sar'}
                    <Text style={styles.Hour}>/{I18nManager.isRTL ? 'الساعة' : 'Hour'}</Text>
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.DataSections}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.SingleShiftText}>{SingleJobStrings.Shifts + ': ' + item.Shifts}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.SingleShiftTextSpace}>
                  {SingleJobStrings.Meal + ': '}
                  {item.ProvideAmeal === true
                    ? I18nManager.isRTL
                      ? 'نعم'
                      : 'yes'
                    : I18nManager.isRTL
                    ? 'لا'
                    : 'no'}
                </Text>
              </View>
            </View>
          </View>

          {!item.ProvideAmeal ? (
            <View style={styles.NoteView}>
              <Text style={styles.NoteText}>{SingleJobStrings.Note + ' '}</Text>
              <Text style={styles.NoteTextValue}>{SingleJobStrings.Mealallowance}</Text>
              <Text style={styles.NoteText}>
                {' ' + item.ProvideAnAllowance}
                {I18nManager.isRTL ? 'ريال' : 'sar'}
              </Text>
            </View>
          ) : null}

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : (
            <View style={styles.Desctiption}>
              {I18nManager.isRTL && Platform.OS !== 'ios' ? (
                <View style={styles.SelectView}>
                  <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(0)}>
                    <Animated.Text
                      style={[
                        styles.SelectText,
                        item.Training === '' && item.TrainingAr === ''
                          ? { color: isSelected === 1 ? PrimaryColor : '#000' }
                          : { color: isSelected === 2 ? PrimaryColor : '#000' },
                      ]}>
                      {/** 2 */}
                      {SingleJobStrings.Description}
                    </Animated.Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(1)}>
                    {/** 1 */}

                    <Animated.Text
                      style={[
                        styles.SelectText,
                        item.Training === '' && item.TrainingAr === ''
                          ? { color: isSelected === 0 ? PrimaryColor : '#000' }
                          : { color: isSelected === 1 ? PrimaryColor : '#000' },
                      ]}>
                      {SingleJobStrings.Rules}
                    </Animated.Text>
                  </TouchableOpacity>

                  {item.Training === '' && item.TrainingAr === '' ? null : (
                    <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(2)}>
                      <Animated.Text
                        style={[styles.SelectText, { color: isSelected === 0 ? PrimaryColor : '#000' }]}>
                        {SingleJobStrings.Tranining}
                      </Animated.Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={styles.SelectView}>
                  <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(0)}>
                    <Animated.Text
                      style={[styles.SelectText, { color: isSelected === 0 ? PrimaryColor : '#000' }]}>
                      {SingleJobStrings.Description}
                    </Animated.Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(1)}>
                    <Animated.Text
                      style={[styles.SelectText, { color: isSelected === 1 ? PrimaryColor : '#000' }]}>
                      {SingleJobStrings.Rules}
                    </Animated.Text>
                  </TouchableOpacity>

                  {item.Training === '' && item.TrainingAr === '' ? null : (
                    <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(2)}>
                      <Animated.Text
                        style={[styles.SelectText, { color: isSelected === 2 ? PrimaryColor : '#000' }]}>
                        {SingleJobStrings.Tranining}
                      </Animated.Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <ScrollView
                pagingEnabled={true}
                scrollEventThrottle={16}
                horizontal={true}
                onScroll={(e) => check(e)}
                ref={Scroll}
                showsHorizontalScrollIndicator={false}>
                <Description
                  Description={I18nManager.isRTL ? item.DescriptionAr : item.Description}
                  Data={isPoints.D}
                />
                <Rules Rules={I18nManager.isRTL ? item.RulesAr : item.Rules} Data={isPoints.R} />

                {item.Training === '' && item.TrainingAr === '' ? null : (
                  <Tranining
                    Training={I18nManager.isRTL ? item.TrainingAr : item.Training}
                    Data={isPoints.T}
                  />
                )}
              </ScrollView>
            </View>
          )}
          {/* {isSelected === 0 ? <Description /> : isSelected === 1 ? <Rules /> : null} */}
        </View>
      </ScrollView>
      <View style={styles.ButtonView}>
        {item.Status === 'active' ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('Application', { item })}>
            <Text style={styles.ButtonText}>{SingleJobStrings.Application}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.ButtonDisabled, { borderColor: '#cccccc', backgroundColor: '#cccccc' }]}
            disabled={true}
            onPress={() => navigation.navigate('Application', { item })}>
            <Text style={styles.ButtonText}>{SingleJobStrings.EventEnded}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default inject('store')(observer(SingleJob))
