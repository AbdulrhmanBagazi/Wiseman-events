import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from '../Style'
import Icon from '../../../../Config/Icons'
import AnimatedCardImageLoad from '../AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../../Config/Strings'

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

function Card(props) {
  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.SingleAllJob} onPress={props.PushJob}>
            <AnimatedCardImageLoad
              source={{
                uri: item.title,
              }}
            />
            <View style={styles.AllSSingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={{ color: '#000' }}>20 May - 30 May</Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? 'التنظيم في الحدث' : 'Organizing at the event'}
              </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL
                    ? 'حي العليا ، الرياض ، المملكة العربية السعودية'
                    : 'Olaya District, Riyad, Saudi Arabia'}
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
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Card
