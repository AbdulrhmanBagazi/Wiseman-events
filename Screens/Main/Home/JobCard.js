import React from 'react'
import { View, Image, Text, ImageBackground, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'
import AnimatedCardImageLoad from './AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../Config/Strings'

function JobCard(props) {
  return (
    <View style={styles.JobCard}>
      <View style={styles.space} />
      <View style={styles.Section}>
        <View style={styles.SectionTtitle}>
          <Text style={styles.SectionTitle}>
            {I18nManager.isRTL ? 'وظائف فى' + ' ' + props.TitleAr : 'Jobs at' + ' ' + props.Title}
          </Text>
          <Text style={styles.NumberOfJobs}>{I18nManager.isRTL ? 'وظيفة' : 'Jobs'}</Text>
        </View>
        <View style={styles.SectionMore}>
          <TouchableOpacity style={styles.SectionMore} onPress={props.More}>
            <Text style={styles.JobsMore}>{I18nManager.isRTL ? 'المزيد' : 'More'}</Text>
            <Icon
              name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
              size={14}
              color={PrimaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={props.data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.SingleJob} onPress={props.PushJob}>
            <AnimatedCardImageLoad
              source={{
                uri: item.title,
              }}
            />
            <View style={styles.SingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={{ color: '#000' }}> 20 May - 30 May</Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL
                  ? 'التنظيم في الحدثالتنظيم في الحدثالتنظيم في الحدثالتنظيم في الحدث'
                  : 'Organizing at the eventOrganizing at the eventOrganizing at the event'}
              </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL
                    ? 'حي العليا ، الرياض ، المملكة العربية السعوديةحي العليا ، الرياض ، المملكة العربية السعوديةحي العليا ، الرياض ، المملكة العربية السعودية'
                    : 'Olaya District, Riyad, Saudi ArabiaOlaya District, Riyad, Saudi ArabiaOlaya District, Riyad, Saudi Arabias'}
                </Text>
              </View>
              <View style={styles.SingleJobDetailsDataView}>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Vacancy}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>30/Shift</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Shifts}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>2 Shifts</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Salary}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>
                    10sar<Text style={styles.Hour}>/H</Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default JobCard
