import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager, Image } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'
import AnimatedCardImageLoad from '../../Main/Home/AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings } from '../../../Config/Strings'
import moment from 'moment'

function CompletedJobs(props) {
  const [isData, setData] = React.useState([])

  React.useEffect(() => {
    var newArray = props.Data.filter((item) => {
      // console.log(item.attendances.length)
      return item.Status === 'completed'
      // return item.Status !== 'approved' && item.attendances.length >= 1
    })

    setData(newArray)
  }, [props.Data])

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
      case 'withdrawal':
        return 'rgba(229, 83, 83, 0.25)'
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
      case 'declined':
        return '#e55353'
      case 'canceled':
        return '#e55353'
      case 'completed':
        return '#2eb85c'
      case 'terminated':
        return '#e55353'
      case 'withdrawal':
        return '#e55353'
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
      case 'declined':
        return 'مرفوض'
      case 'terminated':
        return 'ألغيت'
      case 'withdrawal':
        return 'إنسحاب'
    }
  }

  return (
    <View style={styles.AllJobCard}>
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/completedjobillustration.png')} />
      </View>
      <FlatList
        data={isData}
        showsVerticalScrollIndicator={false}
        refreshControl={props.refreshControl}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 0 }}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.SingleAllJob} disabled={true}>
            <AnimatedCardImageLoad
              source={{
                uri: item.event.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.event.NameAr : item.event.Name}
              EventStatus={item.event.Status}
            />
            <View style={styles.AllSSingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={{ color: '#000' }}>
                  {I18nManager.isRTL ? item.event.DateAr : item.event.Date}
                </Text>
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? item.event.TitleAr : item.event.Title}
              </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL ? item.event.LocationAr : item.event.Location}
                </Text>
              </View>
              <View style={styles.SingleJobDetailsDataView}>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Shift}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>{item.eventshift.shift}</Text>
                </View>
                <View style={styles.DataSectionsTime}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Time}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>
                    {I18nManager.isRTL
                      ? moment(item.eventshift.timeEnd, 'hh:mm').format('hh:mma')
                      : moment(item.eventshift.timeStart, 'hh:mm').format('hh:mma')}{' '}
                    {I18nManager.isRTL ? (
                      <Icon name="arrow-left" size={14} color="black" />
                    ) : (
                      <Icon name="arrow-right" size={14} color="black" />
                    )}{' '}
                    {I18nManager.isRTL
                      ? moment(item.eventshift.timeStart, 'hh:mm').format('hh:mma')
                      : moment(item.eventshift.timeEnd, 'hh:mm').format('hh:mma')}
                  </Text>
                </View>
                <View style={styles.DataSectionsAta}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Attendance}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>
                    {moment(item.eventshift.attendance, 'hh:mm').format('hh:mma')}
                  </Text>
                </View>
              </View>
              {props.LoadButton ? (
                <View style={styles.StatusView}>
                  <ActivityIndicator size="large" color={PrimaryColor} />
                </View>
              ) : (
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

                  <TouchableOpacity
                    onPress={() => props.Details('CompleteDetails', { item: item })}
                    style={[styles.StatusBox, { backgroundColor: PrimaryColor, borderColor: PrimaryColor }]}>
                    <Text style={[styles.StatuText, { color: '#fff' }]}>{SingleJobStrings.Details}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default CompletedJobs
