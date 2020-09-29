import React from 'react'
import { ScrollView, Text, View, I18nManager, FlatList, TouchableOpacity, Linking } from 'react-native'
import styles from './Style'
import { CompleteDetailsStrings } from '../../../Config/Strings'
import moment from 'moment'
import CalHours from './Details/CalHours'
import CalSalary from './Details/CalSalay'
import CalHoursSuper from './Details/CalHoursSuper'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'

function CompleteDetails({ route }) {
  const [Super, setSuper] = React.useState([])
  const [Organizer, setOrganizer] = React.useState([])

  const { item } = route.params
  // console.log(item)

  React.useEffect(() => {
    var data = item.attendances

    var newArrayO = data.filter((item) => {
      // console.log(item.attendances.length)
      // return item.Status === 'completed'
      return item.Type === 'organizer'
    })

    var newArrayS = data.filter((item) => {
      // console.log(item.attendances.length)
      // return item.Status === 'completed'
      return item.Type === 'supervisor'
    })

    setSuper(newArrayS)
    setOrganizer(newArrayO)
  }, [])

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
            <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.SalaryOrganizer}</Text>
            <Text style={styles.CompleteDetailsHeaderViewTextValue}>
              {item.event.Salary}
              {I18nManager.isRTL ? 'ريال' : 'sar'}
              <Text style={styles.CompleteDetailsHeaderViewText}>
                /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
              </Text>
            </Text>
          </View>

          {Super.length >= 1 ? (
            <View style={styles.CompleteDetailsHeaderViewSalary}>
              <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Salary}</Text>
              <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                {item.event.SalarySupervisor}
                {I18nManager.isRTL ? 'ريال' : 'sar'}
                <Text style={styles.CompleteDetailsHeaderViewText}>
                  /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
                </Text>
              </Text>
            </View>
          ) : null}
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
                <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{Organizer.length}</Text>
              </View>
            </View>

            {Super.length >= 1 ? (
              <View style={styles.CompleteDetailsbodyContainerData}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.CompleteDetailsbodyContainerDataText}>
                    {CompleteDetailsStrings.AttendedSuper}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{Super.length}</Text>
                </View>
              </View>
            ) : null}

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.TotalhoursO}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <CalHours Values={item.attendances} />
              </View>
            </View>

            {Super.length >= 1 ? (
              <View style={styles.CompleteDetailsbodyContainerData}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.CompleteDetailsbodyContainerDataText}>
                    {CompleteDetailsStrings.TotalhoursS}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <CalHoursSuper Values={item.attendances} />
                </View>
              </View>
            ) : null}

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Totalearning}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <CalSalary
                  Values={item.attendances}
                  Rate={item}
                  Meal={item.event.ProvideAmeal}
                  MealPlus={item.event.ProvideAnAllowance}
                />
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
      <Text style={styles.CompleteDetailsbodyTitle}>{CompleteDetailsStrings.PaymentAppointments}</Text>
      {item.event.appointments.length < 1 ? (
        <View style={[styles.ActivejobView, { alignSelf: 'center' }]}>
          <View style={styles.ActivejobBoxContainer}>
            <View style={[styles.ActivejobBox, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={styles.CompleteDetailTextnodate}>{CompleteDetailsStrings.noDate}</Text>
            </View>
          </View>
        </View>
      ) : null}
      <FlatList
        data={item.event.appointments}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={[styles.AllJobFlatlist, { alignSelf: 'center' }]}
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
    </ScrollView>
  )
}

export default CompleteDetails
