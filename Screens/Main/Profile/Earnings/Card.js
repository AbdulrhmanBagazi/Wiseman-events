import React from 'react';
import { View, Text, I18nManager } from 'react-native';
import styles from './Style';
import { EarningsStrings } from '../../../../Config/Strings';
import humanizeDuration from 'humanize-duration';

function Card(props) {
  const getColor = (status) => {
    switch (status) {
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)';
      case 'not-paid':
        return 'rgba(229, 83, 83, 0.25)';
      case 'paid':
        return 'rgba(46, 184, 92, 0.25)';
      default:
        return 'rgba(229, 83, 83, 0.25)';
    }
  };

  const getColorBorder = (status) => {
    switch (status) {
      case 'pending':
        return '#f9b115';
      case 'not-paid':
        return '#e55353';
      case 'paid':
        return '#2eb85c';
      default:
        return '#e55353';
    }
  };

  const [isDays, setDays] = React.useState([]);
  const [isHours, setHours] = React.useState(false);

  React.useEffect(() => {
    var data = props.Data;
    var Hours = 0;
    var daysCompleted = 0;
    var invoiceData = JSON.parse(data.payment_attendances);

    for (var i = 0; i < invoiceData.length; i++) {
      var hours = invoiceData[i].hours;

      Hours = Hours + Number(hours);
      daysCompleted = daysCompleted + Number(invoiceData[i].total_completed);
    }

    var HoursSec = Hours * 60000;

    setDays(daysCompleted);
    setHours(HoursSec);
  }, [props.Data]);

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
          ]}
        />
        <Text style={styles.TextCompany}>
          {I18nManager.isRTL ? props.Data.event.NameAr : props.Data.event.Name}
        </Text>
      </View>

      <Text style={styles.TextEvent}>
        {I18nManager.isRTL ? props.Data.event.TitleAr : props.Data.event.Title}
      </Text>
      <Text style={styles.TextDate}>
        {I18nManager.isRTL ? 'عدد الآيام: ' : 'Total Days: '}
        <Text style={styles.TextDateValue}>{isDays}</Text>
      </Text>
      <Text style={styles.TextTransfer}>
        {I18nManager.isRTL ? 'الساعات: ' : 'Hours: '}
        <Text style={styles.TextDateValue}>
          {humanizeDuration(isHours, {
            units: ['h', 'm'],
            round: true,
            language: I18nManager.isRTL ? 'ar' : 'en',
            fallbacks: ['en'],
          })}
        </Text>
      </Text>

      {props.Data.TransferID ? (
        <Text style={styles.TextTransfer}>
          {I18nManager.isRTL ? 'رقم الحوالة: ' : 'Transfer number: '}
          <Text style={styles.TextDateValue}>{props.Data.TransferID}</Text>
        </Text>
      ) : null}

      {props.Data.TransferID ? (
        <Text style={styles.TextTransfer}>
          {I18nManager.isRTL ? 'رسوم التحويل: ' : 'Transfer fee: '}
          <Text style={styles.TextDateValue}>
            {8.05 + ' ' + EarningsStrings.SAR}
          </Text>
        </Text>
      ) : null}

      <View style={styles.DataView}>
        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.deductionamount}</Text>
          <Text style={styles.TextDataValue}>
            {props.Data.Deduction
              ? props.Data.Deduction + ' ' + EarningsStrings.SAR
              : '...'}
          </Text>
        </View>

        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.Bonus}</Text>
          <Text style={styles.TextDataValue}>
            {props.Data.Bonus
              ? props.Data.Bonus + ' ' + EarningsStrings.SAR
              : '...'}
          </Text>
        </View>

        <View style={styles.DataViewC}>
          <Text style={styles.TextData}>{EarningsStrings.Received}</Text>
          <Text style={styles.TextDataValue}>
            {props.Data.Paid
              ? props.Data.Paid + ' ' + EarningsStrings.SAR
              : '...'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Card;
