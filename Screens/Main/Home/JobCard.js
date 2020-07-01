import React from 'react'
import { View, Image, Text, ImageBackground, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'
import AnimatedCardImageLoad from './AnimatedComponets/AnimatedCardImageLoad'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'https://i.ibb.co/72xDcxj/two.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-asdasd12312',
    title: 'https://i.ibb.co/RyJHcdm/Rectangle.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'https://i.ibb.co/72xDcxj/two.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'https://i.ibb.co/RyJHcdm/Rectangle.png',
  },
]

function JobCard(props) {
  return (
    <View style={styles.JobCard}>
      <View style={styles.space} />
      <View style={styles.Section}>
        <View style={styles.SectionTtitle}>
          <Text style={styles.SectionTitle}>{I18nManager.isRTL ? 'وظائف فى الرياض' : 'Jobs at Riyadh'}</Text>
          <Text style={styles.NumberOfJobs}>25{I18nManager.isRTL ? 'وظيفة' : 'Jobs'}</Text>
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
        data={DATA}
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
                  <Text style={styles.SingleJobDetailsSections}>
                    {I18nManager.isRTL ? 'شاغر' : 'Vacancy'}
                  </Text>
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
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default JobCard
