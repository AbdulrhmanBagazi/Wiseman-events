import React from 'react';
import { View, Text, ActivityIndicator, I18nManager } from 'react-native';
import { PrimaryColor } from '../../../Config/ColorPalette';
import styles from './Style';

function CalSalary(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [Total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    var data = props.Values;
    var Meal = props.Meal;
    var MealPlus = props.MealPlus;

    var Salary = 0;
    var daysCompleted = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].Status === 'completed') {
        var hours = data[i].TotalHours / 60;
        var calsalary = hours * data[i].hourly_rate;

        Salary = Salary + calsalary;

        if (Meal === false) {
          daysCompleted = daysCompleted + 1;
        }
      }
    }

    var salary = Math.round(Salary);
    var meal = daysCompleted * MealPlus;

    var sumtotal = salary + meal;

    setTotal(sumtotal ? sumtotal : 0);
    setLoading(false);
  }, [props.Values]);

  return (
    <View style={styles.dataTextActive}>
      {isLoading ? (
        <ActivityIndicator size="small" color={PrimaryColor} />
      ) : (
        <Text>{I18nManager.isRTL ? Total + ' ريال' : Total + ' SAR'}</Text>
      )}
    </View>
  );
}

export default CalSalary;
