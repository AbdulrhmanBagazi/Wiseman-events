import React from 'react'
import { View, Image, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
  PrimaryBorder,
} from '../../../Config/ColorPalette'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

function JobCard(props) {
  return (
    <View style={styles.JobCard}>
      <View style={styles.Section}>
        <View style={styles.SectionTtitle}>
          <Text style={styles.SectionTitle}>Jobs at Riyadh</Text>
          <Text style={styles.NumberOfJobs}>25 jobs</Text>
        </View>
        <View style={styles.SectionMore}>
          <TouchableOpacity style={styles.SectionMore} onPress={props.More}>
            <Text style={styles.JobsMore}>More</Text>
            <Icon name="chevron-right" size={14} color={PrimaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.SingleJob}>
            <ImageBackground source={require('../../../assets/two.png')} style={styles.SingleJobTitleView}>
              <View style={styles.SingleJobLayer}>
                <Text style={styles.SingleTitle}>WWE Event</Text>
              </View>
            </ImageBackground>
            <View style={styles.SingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                Event date: <Text style={{ color: '#000' }}>20 May - 30 May</Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle}>WWE is hiring volunteer boys </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation}>Olaya District, Riyad, Saudi Arabia</Text>
              </View>
              <View style={styles.SingleJobDetailsDataView}>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>Vacancy</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>30/Shift</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>Shifts</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>2 Shifts</Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>Salary</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>10sar/H</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default JobCard
