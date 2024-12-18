import React from 'react';
import { View, Text, ActivityIndicator, I18nManager } from 'react-native';
import { PrimaryColor } from '../../../Config/ColorPalette';
import styles from './Style';
import humanizeDuration from 'humanize-duration';

function CalHours(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [Total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    var data = props.Values;
    var total = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].Status === 'completed') {
        total = total + data[i].TotalHours;
      }
    }

    // var Hours = total / 60;
    var minuts = total;
    var mills = minuts * 60000;

    setTotal(mills);
    setLoading(false);
  }, [props.Values]);

  return (
    <View style={styles.dataTextActive}>
      {isLoading ? (
        <ActivityIndicator size="small" color={PrimaryColor} />
      ) : (
        <Text>
          {humanizeDuration(Total, {
            units: ['h', 'm'],
            round: true,
            language: I18nManager.isRTL ? 'ar' : 'en',
            fallbacks: ['en'],
          })}
        </Text>
      )}
    </View>
  );
}

export default CalHours;
