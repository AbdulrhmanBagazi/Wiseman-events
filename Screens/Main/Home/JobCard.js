import React from 'react'
import { View, Image, Text, Animated, FlatList, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'
import AnimatedCardImageLoad from './AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../Config/Strings'
function JobCard(props) {
  const [isFade, setFade] = React.useState(true)
  const [Fade] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    if (isFade === true) {
      Animated.timing(Fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()

      setFade(false)
      return
    }

    return
  })
  return (
    <Animated.View style={[styles.JobCard, { opacity: Fade }]}>
      <View style={styles.space} />
      <View style={styles.Section}>
        <View style={styles.SectionTtitle}>
          <Text style={styles.SectionTitle}>
            {I18nManager.isRTL ? 'وظائف فى' + ' ' + props.TitleAr : 'Jobs at' + ' ' + props.Title}
          </Text>
          <Text style={styles.NumberOfJobs}>
            {I18nManager.isRTL ? 'وظيفة ' + props.Total : 'Jobs  ' + props.Total}
          </Text>
        </View>
        <View style={styles.SectionMore}>
          <TouchableOpacity
            style={styles.SectionMore}
            onPress={() => props.More('AllJobs', { id: props.ID })}>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.SingleJob} onPress={() => props.click('SingleJob', { item })}>
            <AnimatedCardImageLoad
              source={{
                uri: item.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.NameAr : item.Name}
            />
            <View style={styles.SingleJobDetails}>
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
      />
    </Animated.View>
  )
}

export default JobCard
