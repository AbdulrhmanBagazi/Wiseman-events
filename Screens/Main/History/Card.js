import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import AnimatedCardImageLoad from '../../Main/Home/AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../Config/Strings'

function Card(props) {
  const getColor = (status) => {
    switch (status) {
      case 'approved':
        return 'rgba(46, 184, 92, 0.25)'
      case 'wait-list':
        return 'rgba(50, 31, 219, 0.25)'
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)'
      case 'inactive':
        return 'rgba(229, 83, 83, 0.25)'
      case 'canceled':
        return 'rgba(229, 83, 83, 0.25)'
      case 'terminated':
        return 'rgba(229, 83, 83, 0.25)'
      case 'completed':
        return 'rgba(46, 184, 92, 0.25)'
    }
  }

  const getColorBorder = (status) => {
    switch (status) {
      case 'approved':
        return '#2eb85c'
      case 'wait-list':
        return '#321fdb'
      case 'pending':
        return '#f9b115'
      case 'inactive':
        return '#e55353'
      case 'terminated':
        return '#e55353'
      case 'canceled':
        return '#e55353'
      case 'completed':
        return '#2eb85c'
    }
  }

  const getArabic = (status) => {
    switch (status) {
      case 'approved':
        return 'تمت الموافقة'
      case 'wait-list':
        return 'قائمة الإنتظار'
      case 'pending':
        return 'قيد الانتظار'
      case 'inactive':
        return 'غير نشط'
      case 'canceled':
        return 'ألغيت'
      case 'completed':
        return 'منجز'
      case 'terminated':
        return 'منتهية'
    }
  }

  //#2eb85c  (46, 184, 92)
  //#321fdb (50, 31, 219)
  //#f9b115 (249, 177, 21)
  //#e55353  (229, 83, 83)

  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={props.Data}
        showsVerticalScrollIndicator={false}
        refreshControl={props.refreshControl}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.SingleAllJob} disabled={true}>
            <AnimatedCardImageLoad
              source={{
                uri: item.eventshift.event.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.eventshift.event.NameAr : item.eventshift.event.Name}
            />
            <View style={styles.AllSSingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={{ color: '#000' }}>{item.eventshift.event.Date}</Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? item.eventshift.event.TitleAr : item.eventshift.event.Title}
              </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL ? item.eventshift.event.LocationAr : item.eventshift.event.Location}
                </Text>
              </View>
              <View style={styles.SingleJobDetailsDataView}>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Shift}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>{item.eventshift.shift}</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Time}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>{item.eventshift.time}</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Attendance}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>{item.eventshift.attendance}</Text>
                </View>
              </View>
              <View style={styles.StatusView}>
                <View
                  style={[
                    styles.StatusBox,
                    { backgroundColor: getColor(item.Status), borderColor: getColorBorder(item.Status) },
                  ]}>
                  <Text style={[styles.StatuText, { color: getColorBorder(item.Status) }]}>
                    {I18nManager.isRTL ? getArabic(item.Status) : item.Status}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Card
