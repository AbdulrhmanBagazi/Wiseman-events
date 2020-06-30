import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from '../Style'
import Icon from '../../../../Config/Icons'
import AnimatedCardImageLoad from '../AnimatedComponets/AnimatedCardImageLoad'

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

function Card(props) {
  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.SingleAllJob}>
            <AnimatedCardImageLoad />
            <View style={styles.AllSSingleJobDetails}>
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
                  <Text style={styles.SingleJobDetailsSectionsValue}>
                    10sar<Text style={styles.Hour}>/H</Text>
                  </Text>
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

export default Card
