import React from 'react'
import { ScrollView, Text, View, I18nManager, FlatList, TouchableOpacity, Linking } from 'react-native'
import styles from './Style'
import { CompleteDetailsStrings } from '../../../Config/Strings'
import moment from 'moment'
import CalHours from './Details/CalHours'
import CalSalary from './Details/CalSalay'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'

function CompleteDetails({ route }) {
  const { item } = route.params
  // console.log(item)

  React.useEffect(() => {}, [])

  //   values: ['pending', 'paid', 'not-paid'],

  const getColor = (status) => {
    switch (status) {
      case 'paid':
        return 'rgba(46, 184, 92, 0.25)'
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)'
      case 'not-paid':
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
      case 'pending':
        return 'قيد الانتظار'
      case 'bank':
        return 'تحويل'
      case 'cash':
        return 'نقد'
      case 'paid':
        return 'مدفوع'
      case 'not-paid':
        return 'لم يتم الدفع'
    }
  }

  return (
    <ScrollView style={styles.CompleteDetailsView}>
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <View style={styles.CompleteDetailsHeader}>
          <View style={styles.CompleteDetailsHeaderView}>
            <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Start}</Text>
            <Text style={styles.CompleteDetailsHeaderViewTextValue}>
              {moment(item.Start).format('D MMMM, YYYY')}
            </Text>
          </View>
          <View style={styles.CompleteDetailsHeaderView}>
            <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Ended}</Text>
            <Text style={styles.CompleteDetailsHeaderViewTextValue}>
              {moment(item.End).format('D MMMM, YYYY')}
            </Text>
          </View>
        </View>

        <View style={styles.CompleteDetailsHeaderHour}>
          <View style={styles.CompleteDetailsHeaderViewSalary}>
            <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Salary}</Text>
            <Text style={styles.CompleteDetailsHeaderViewTextValue}>
              {item.event.Salary}
              {I18nManager.isRTL ? 'ريال' : 'sar'}
              <Text style={styles.CompleteDetailsHeaderViewText}>
                /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
              </Text>
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.CompleteDetailsbodyTitle}>{CompleteDetailsStrings.workHistory}</Text>
          <View style={styles.CompleteDetailsbodyContainer}>
            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Attended}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
                  {item.attendances.length}
                </Text>
              </View>
            </View>

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Totalhours}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <CalHours Values={item.attendances} />
              </View>
            </View>

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Totalearning}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <CalSalary Values={item.attendances} Rate={item} />
              </View>
            </View>

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Paymentstatus}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View
                  style={[
                    styles.CompleteDetailStatusBox,
                    {
                      backgroundColor: getColor(item.PaymentStatus),
                      borderColor: getColorBorder(item.PaymentStatus),
                    },
                  ]}>
                  <Text
                    style={[
                      styles.CompleteDetailsbodyContainerDataTextValue,
                      { color: getColorBorder(item.PaymentStatus) },
                    ]}>
                    {I18nManager.isRTL ? getArabic(item.PaymentStatus) : item.PaymentStatus}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.CompleteDetailsbodyContainerData, { marginBottom: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Paymentmethod}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
                  {item.PaymentMethod === 'pending'
                    ? null
                    : I18nManager.isRTL
                    ? getArabic(item.PaymentMethod)
                    : item.PaymentMethod}
                </Text>
              </View>
            </View>

            {/* <Text style={styles.msg}>{CompleteDetailsStrings.msg}</Text> */}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.CompleteDetailsbodyTitle}>{CompleteDetailsStrings.PaymentAppointments}</Text>
        <FlatList
          data={item.event.appointments}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.AllJobFlatlist}
          renderItem={({ item, index }) => (
            <View style={styles.ActivejobView}>
              <View style={styles.ActivejobBoxContainer}>
                <View style={styles.ActivejobBox}>
                  <View style={styles.ActivejobBoxTop}>
                    <View style={styles.Activejobsplit}>
                      <Text style={styles.GrayColorText}>{I18nManager.isRTL ? 'التاريخ' : 'Date'}</Text>
                      <Text style={styles.dataTextActive}>{item.Date}</Text>
                    </View>

                    <View style={styles.Activejobsplit}>
                      <Text style={styles.GrayColorText}>{I18nManager.isRTL ? 'الوقت' : 'Time'}</Text>
                      <Text style={styles.dataTextActive}>
                        {moment(item.TimeStart, 'hh:mm').format('LT') +
                          ' => ' +
                          moment(item.TimeEnd, 'hh:mm').format('LT')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ActivejobBoxTop}>
                    <View style={styles.Activejobsplit}>
                      <Text style={styles.GrayColorText}>{I18nManager.isRTL ? 'وصف' : 'Description'}</Text>
                      <Text style={styles.dataTextActive}>{item.msg}</Text>
                    </View>
                  </View>
                  <View style={styles.SplitBodyHOne}>
                    <TouchableOpacity
                      style={styles.SingleJobDetailsLocationView}
                      onPress={() => Linking.openURL(item.LocationURL)}>
                      <Icon name="map-pin" size={24} color={PrimaryColor} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  )
}

export default CompleteDetails
