import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from '../Style'
import Icon from '../../../../Config/Icons'
import AnimatedCardImageLoad from '../AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../../Config/Strings'

function Card(props) {
  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={props.Data}
        showsVerticalScrollIndicator={false}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.SingleAllJob} onPress={() => props.click('SingleJob', { item })}>
            <AnimatedCardImageLoad
              source={{
                uri: item.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.NameAr : item.Name}
            />
            <View style={styles.AllSSingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={{ color: '#000' }}>{item.Date}</Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? item.TitleAr : item.Title}
              </Text>
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
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Card
