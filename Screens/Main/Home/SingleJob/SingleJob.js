import React from 'react'
import { View, Text, I18nManager, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { inject, observer } from 'mobx-react'
import styles from './Style'
import SingleJobImage from './SingleJobImage'
import Icon from '../../../../Config/Icons'
import { SingleJobStrings } from '../../../../Config/Strings'
import Description from './Description'
import Rules from './Rules'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { width, height } from '../../../../Config/Layout'

function SingleJob({ route, store, navigation }) {
  const [isSelected, setSelected] = React.useState(0)
  const Scroll = React.useRef(null)

  //  const { item } = route.params

  //   console.log(item)

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
          />
        </View>
        <View style={styles.DataContainer}>
          <Text style={styles.SingleJobDetailsTime}>
            {I18nManager.isRTL ? 'تاريخ الحدث' : 'Event date'}
            <Text style={{ color: '#000' }}> 20 May - 30 May</Text>
          </Text>
          <Text style={styles.SingleJobDetailsTitle}>
            {I18nManager.isRTL ? 'التنظيم في الحدث' : 'Organizing at the event'}
          </Text>
          <View style={styles.SingleJobDetailsLocationView}>
            <Icon name="map-pin" size={14} color="#000" />
            <Text style={styles.SingleJobDetailsLocation}>
              {I18nManager.isRTL
                ? 'حي العليا ، الرياض ، المملكة العربية السعودية'
                : 'Olaya District, Riyad, Saudi Arabia'}
            </Text>
          </View>
          <View style={styles.SingleJobDetailsDataView}>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>{I18nManager.isRTL ? 'شاغر' : 'Vacancy'}</Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>30/Shift</Text>
            </View>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>
                {I18nManager.isRTL ? 'المناوبات' : 'Shifts'}
              </Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>2 Shifts</Text>
            </View>
            <View style={styles.DataSections}>
              <Text style={styles.SingleJobDetailsSections}>{I18nManager.isRTL ? 'راتب' : 'Salary'}</Text>
              <Text style={styles.SingleJobDetailsSectionsValue}>
                10sar<Text style={styles.Hour}>/H</Text>
              </Text>
            </View>
          </View>
          <View style={styles.Desctiption}>
            <View style={styles.SelectView}>
              <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(0)}>
                <Animated.Text
                  style={[styles.SelectText, { color: isSelected === 0 ? PrimaryColor : '#000' }]}>
                  Description
                </Animated.Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(1)}>
                <Animated.Text
                  style={[styles.SelectText, { color: isSelected === 1 ? PrimaryColor : '#000' }]}>
                  Rules
                </Animated.Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.SelectButtonFirst} onPress={() => ScrollTo(2)}>
                <Animated.Text
                  style={[styles.SelectText, { color: isSelected === 2 ? PrimaryColor : '#000' }]}>
                  Training
                </Animated.Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              pagingEnabled={true}
              scrollEventThrottle={16}
              horizontal={true}
              onScroll={(e) => check(e)}
              ref={Scroll}>
              <Description />
              <Rules />
              <Description />
            </ScrollView>
            {/* {isSelected === 0 ? <Description /> : isSelected === 1 ? <Rules /> : null} */}
          </View>
        </View>
      </ScrollView>
      <View style={styles.ButtonView}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>{SingleJobStrings.Application}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default inject('store')(observer(SingleJob))
