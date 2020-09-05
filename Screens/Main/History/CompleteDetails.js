import React from 'react'
import { ScrollView, Text, View, I18nManager } from 'react-native'
import styles from './Style'
import { CompleteDetailsStrings } from '../../../Config/Strings'
import moment from 'moment'
import CalHours from './Details/CalHours'
import CalSalary from './Details/CalSalay'

function CompleteDetails({ route }) {
  const { item } = route.params
  //   console.log(item)

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
          <View style={styles.CompleteDetailsHeaderViewSalary}>
            <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Salary}</Text>
            <Text style={styles.CompleteDetailsHeaderViewTextValue}>
              {item.event.Salary}
              <Text style={styles.CompleteDetailsHeaderViewText}>/h</Text>
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.CompleteDetailsbodyTitle}>Work History</Text>
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
                <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
                  <CalHours Values={item.attendances} />
                </Text>
              </View>
            </View>

            <View style={styles.CompleteDetailsbodyContainerData}>
              <View style={{ flex: 1 }}>
                <Text style={styles.CompleteDetailsbodyContainerDataText}>
                  {CompleteDetailsStrings.Totalearning}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
                  <CalSalary Values={item.attendances} Rate={item} />
                </Text>
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

            <View style={styles.CompleteDetailsbodyContainerData}>
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

            <Text style={styles.msg}>{CompleteDetailsStrings.msg}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default CompleteDetails
