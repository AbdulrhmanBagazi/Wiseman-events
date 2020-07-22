import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import AnimatedCardImageLoad from '../../Main/Home/AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../Config/Strings'

function Card(props) {
  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={props.Data}
        showsVerticalScrollIndicator={false}
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
                <View style={styles.StatusBox}>
                  <Text style={styles.StatuText}>{I18nManager.isRTL ? 'قيد الإنتظار' : 'Pending'}</Text>
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
