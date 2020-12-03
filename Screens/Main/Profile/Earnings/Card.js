import React from 'react'
import { View, Text, I18nManager } from 'react-native'
import styles from './Style'
import { EarningsStrings } from '../../../../Config/Strings'

function Card(props) {
  const getColor = (status) => {
    switch (status) {
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)'
      case 'not-paid':
        return 'rgba(229, 83, 83, 0.25)'
      case 'paid':
        return 'rgba(46, 184, 92, 0.25)'
      default:
        return 'rgba(229, 83, 83, 0.25)'
    }
  }

  const getColorBorder = (status) => {
    switch (status) {
      case 'pending':
        return '#f9b115'
      case 'not-paid':
        return '#e55353'
      case 'paid':
        return '#2eb85c'
      default:
        return '#e55353'
    }
  }

  const getArabic = (status) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار'
      case 'paid':
        return 'مدفوع'
      case 'not-paid':
        return 'غير مدفوع'
      default:
        return 'partial-payment'
    }
  }

  return (
    <View style={styles.CardContainer}>
      <View style={styles.DataViewTitle}>
        <View
          style={[
            styles.StatusBox,
            {
              backgroundColor: getColor(props.Data.PaymentStatus),
              borderColor: getColorBorder(props.Data.PaymentStatus),
            },
          ]}></View>
        <Text style={styles.TextCompany}>
          {I18nManager.isRTL ? props.Data.event.NameAr : props.Data.event.Name}
        </Text>
      </View>

      <Text style={styles.TextEvent}>
        {I18nManager.isRTL ? props.Data.event.TitleAr : props.Data.event.Title}
      </Text>
      <Text style={styles.TextDate}>
        {I18nManager.isRTL ? 'عدد الآيام: ' : 'Total Days: '}{' '}
        <Text style={styles.TextDateValue}>{props.Data.total_completed}</Text>
      </Text>

      {props.Data.TransferID ? (
        <Text style={styles.TextTransfer}>
          {I18nManager.isRTL ? 'رقم الحوالة: ' : 'Transfer number: '}
          <Text style={styles.TextDateValue}>{props.Data.TransferID}</Text>
        </Text>
      ) : null}

      <View style={styles.DataView}>
        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.deductionamount}</Text>
          <Text style={styles.TextDataValue}>
            {props.Data.Deduction ? props.Data.Deduction + ' ' + EarningsStrings.SAR : '...'}
          </Text>
        </View>

        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.Bonus}</Text>
          <Text style={styles.TextDataValue}>{props.Data.Bonus + ' ' + EarningsStrings.SAR}</Text>
        </View>

        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.Received}</Text>
          <Text style={styles.TextDataValue}>
            {props.Data.Paid ? props.Data.Paid + ' ' + EarningsStrings.SAR : '...'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Card
