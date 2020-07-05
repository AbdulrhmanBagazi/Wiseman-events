import React from 'react'
import {
  View,
  Text,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
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
  const [isPoints, setPoints] = React.useState(['asdas', 'asdas'])
  const [isLoading, setLoading] = React.useState(true)

  const Scroll = React.useRef(null)
  const { item } = route.params

  //   console.log(item)

  React.useEffect(() => {
    if (isLoading) {
      var Dpoints = I18nManager.isRTL ? item.DescriptionPointsAr : item.DescriptionPoints
      var Rpoints = I18nManager.isRTL ? item.RulesPointsAr : item.RulesPoints
      var Tpoints = I18nManager.isRTL ? item.TrainingPointsAr : item.TrainingPoints
      var D = Dpoints.split(',')
      var R = Rpoints.split(',')
      var T = Tpoints.split(',')

      setPoints({ D: D, R: R, T: T })

      setLoading(false)
    }
  })

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
              uri: 'https://i.ibb.co/RyJHcdm/Rectangle.png',
            }}
            Name={I18nManager.isRTL ? item.NameAr : item.Name}
          />
        </View>
        <View style={styles.DataContainer}>
          <Text style={styles.SingleJobDetailsTime}>
            {SingleJobStrings.date}
            <Text style={{ color: '#000' }}>{item.Date}</Text>
          </Text>
          <Text style={styles.SingleJobDetailsTitle}>{I18nManager.isRTL ? item.TitleAr : item.Title}</Text>
          <View style={styles.SingleJobDetailsLocationView}>
            <Icon name="map-pin" size={14} color="#000" />
            <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
              {I18nManager.isRTL ? item.LocationAr : item.Location}
            </Text>
          </View>
          <View style={styles.SingleJobDetailsDataView}>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Vacancy}</Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>{item.Employees}</Text>
            </View>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Shifts}</Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>{item.Shifts}</Text>
            </View>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Salary}</Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>
                {item.Salary}
                <Text style={styles.Hour}>{'/' + item.SalaryType}</Text>
              </Text>
            </View>
          </View>

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : (
            <View style={styles.Desctiption}>
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
                <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(2)}>
                  <Animated.Text
                    style={[styles.SelectText, { color: isSelected === 2 ? PrimaryColor : '#000' }]}>
                    {SingleJobStrings.Tranining}
                  </Animated.Text>
                </TouchableOpacity>
              </View>
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
                <Tranining Training={I18nManager.isRTL ? item.TrainingAr : item.Training} Data={isPoints.T} />
              </ScrollView>
            </View>
          )}
          {/* {isSelected === 0 ? <Description /> : isSelected === 1 ? <Rules /> : null} */}
        </View>
      </ScrollView>
      <View style={styles.ButtonView}>
        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Application')}>
          <Text style={styles.ButtonText}>{SingleJobStrings.Application}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default inject('store')(observer(SingleJob))