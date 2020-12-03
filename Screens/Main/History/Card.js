import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import AnimatedCardImageLoad from '../../Main/Home/AnimatedComponets/AnimatedCardImageLoad'
import { SingleJobStrings, AnimatedButtonSelectStrings } from '../../../Config/Strings'
import { PrimaryColor } from '../../../Config/ColorPalette'
import moment from 'moment'

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
        <Image style={styles.tinyLogo} source={require('../../../assets/appliedjobillustration.png')} />
      </View>
      <FlatList
        data={props.Data}
        showsVerticalScrollIndicator={false}
        refreshControl={props.refreshControl}
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
              {/* <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.StartDate}
                <Text style={{ color: item.Start ? '#2eb85c' : '#e55353' }}>
                  {item.Start ? item.Start : SingleJobStrings.StartDateString}
                </Text>
              </Text> */}
              <View style={styles.TypeBadge}>
                {item.Organizer || item.Type === 'organizer' ? (
                  <View style={item.Type === 'organizer' ? styles.badgeS : styles.badgeO}>
                    <Text style={item.Type === 'organizer' ? styles.BadgeTextS : styles.BadgeText}>
                      {AnimatedButtonSelectStrings.organizer}
                    </Text>
                  </View>
                ) : null}

                {item.Supervisor || item.Type === 'supervisor' ? (
                  <View style={item.Type === 'supervisor' ? styles.badgeS : styles.badgeO}>
                    <Text style={item.Type === 'supervisor' ? styles.BadgeTextS : styles.BadgeText}>
                      {AnimatedButtonSelectStrings.supervisor}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? item.event.TitleAr : item.event.Title}
              </Text>
              <TouchableOpacity
                style={styles.SingleJobDetailsLocationView}
                onPress={() => Linking.openURL(item.event.LocationURL)}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL ? item.event.LocationAr : item.event.Location}
                </Text>
                <Icon name="external-link" size={14} color={PrimaryColor} />
              </TouchableOpacity>
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
                  {item.Status === 'inactive' ||
                  item.Status === 'declined' ||
                  item.Status === 'canceled' ||
                  item.Status === 'completed' ||
                  item.Status === 'terminated' ||
                  item.Status === 'withdrawal' ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          '',
                          item.Status === 'pending'
                            ? I18nManager.isRTL
                              ? 'هل أنت متأكد أنك تريد إلغاء التقديم؟'
                              : 'Are you sure you want to cancel the submission?'
                            : I18nManager.isRTL
                            ? 'هل أنت متأكد أنك تريد الإنسحاب من العمل؟'
                            : 'Are you sure you want to withdraw from work?',
                          [
                            {
                              text: I18nManager.isRTL ? 'لا' : 'No',
                              style: 'cancel',
                            },
                            {
                              text: I18nManager.isRTL ? 'نعم' : 'Yes',
                              onPress: () => props.Withdrawalapply(item.id, item.userId, item.eventId),
                            },
                          ],
                          { cancelable: false }
                        )
                      }
                      style={[
                        styles.StatusBoxWithdraw,
                        { backgroundColor: '#e55353', borderColor: '#e55353' },
                      ]}>
                      <Text style={[styles.StatuText, { color: '#fff' }]}>
                        {item.Status === 'pending' ? SingleJobStrings.Cancel : SingleJobStrings.withdrawal}
                      </Text>
                    </TouchableOpacity>
                  )}
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

export default Card
