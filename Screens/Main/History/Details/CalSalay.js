import React from 'react';
import { Text, ActivityIndicator, I18nManager } from 'react-native';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import styles from '../Style';

function CalSalary(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [Total, setTotal] = React.useState(0);

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

    if (props.Val === 'Meal') {
      setTotal(meal);
      setLoading(false);
    }

    if (props.Val === 'Earning') {
      setTotal(salary);
      setLoading(false);
    }

    if (props.Val === 'Total') {
      setTotal(salary + meal);
      setLoading(false);
    }
  }, [props.Values]);

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {I18nManager.isRTL ? Total + 'ريال ' : Total + ' SAR'}
    </Text>
  );
}

export default CalSalary;
