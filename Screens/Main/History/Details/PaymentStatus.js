import React from 'react';
import { Text, ActivityIndicator, View, I18nManager } from 'react-native';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import styles from '../Style';
import { CompleteDetailsStrings } from '../../../../Config/Strings';

function PaymentStatus(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [Total, setTotal] = React.useState(0);

  const getColor = (status) => {
    switch (status) {
      case 'paid':
        return 'rgba(46, 184, 92, 0.25)';
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)';
      case 'not-paid':
        return 'rgba(229, 83, 83, 0.25)';
      case 'partially-paid':
        return 'rgba(249, 177, 21, 0.25)';
    }
  };

  const getColorBorder = (status) => {
    switch (status) {
      case 'paid':
        return '#2eb85c';
      case 'wait-list':
        return '#321fdb';
      case 'pending':
        return '#f9b115';
      case 'inactive':
        return '#e55353';
      case 'declined':
        return '#e55353';
      case 'canceled':
        return '#e55353';
      case 'completed':
        return '#2eb85c';
      case 'terminated':
        return '#e55353';
      case 'withdrawal':
        return '#e55353';
    }
  };

  const getArabic = (status) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'bank':
        return 'تحويل';
      case 'cash':
        return 'نقد';
      case 'paid':
        return 'مدفوع';
      case 'not-paid':
        return 'غير مدفوع';
      case 'partially-paid':
        return 'مدفوعة جزئيا';
    }
  };

  React.useEffect(() => {
    setLoading(true);
    var data = props.Values;
    var Meal = props.Meal;
    var MealPlus = props.MealPlus;

    var totalsalary = 0;
    var daysCompleted = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].Status === 'completed') {
        var hours = data[i].TotalHours / 60;
        var rate = data[i].hourly_rate;

        var cal = hours * rate;

        totalsalary = totalsalary + cal;
        if (Meal === false) {
          daysCompleted = daysCompleted + 1;
        }
      }
    }

    var salary = Math.round(totalsalary);
    var meal = daysCompleted * MealPlus;

    setTotal(salary + meal);
    setLoading(false);
  }, [props.Values]);

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : Total > 0 ? (
    <>
      <View style={styles.CompleteDetailsbodyContainerData}>
        <View style={styles.FlexOne}>
          <Text style={styles.CompleteDetailsbodyContainerDataText}>
            {CompleteDetailsStrings.Paymentstatus}
          </Text>
        </View>
        <View style={styles.FlexEnd}>
          <View
            style={[
              styles.CompleteDetailStatusBox,
              {
                backgroundColor: getColor(props.PaymentStatus),
                borderColor: getColorBorder(props.PaymentStatus),
              },
            ]}
          >
            <Text
              style={[
                styles.CompleteDetailsbodyContainerDataTextValue,
                { color: getColorBorder(props.PaymentStatus) },
              ]}
            >
              {I18nManager.isRTL
                ? getArabic(props.PaymentStatus)
                : props.PaymentStatus}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.msg}>{CompleteDetailsStrings.msg}</Text>
    </>
  ) : (
    <View style={styles.CompleteDetailsbodyContainerData} />
  );
}

export default PaymentStatus;
