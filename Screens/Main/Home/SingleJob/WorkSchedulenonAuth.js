import React from 'react';
import { View, ActivityIndicator, I18nManager, Alert } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import {
  PrimaryColor,
  PrimaryBorder,
  PrimaryText,
} from '../../../../Config/ColorPalette';
import { LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { URL } from '../../../../Config/Config';
import { inject, observer } from 'mobx-react';
import styles from './Style';

//Config
LocaleConfig.locales.ar = {
  monthNames: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'اكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  dayNames: [
    'الآحد',
    'الإثنين',
    'الثلاثاء',
    'الآربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  monthNamesShort: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'اكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  dayNamesShort: [
    'الآحد',
    'الإثنين',
    'الثلاثاء',
    'الآربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  today: 'اليوم',
};

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = I18nManager.isRTL ? 'ar' : 'en';
//Config

function WorkSchedulenonAuth({ route, store }) {
  const [isLoading, setLoading] = React.useState(true);
  const [isDays, setDays] = React.useState({});

  const { eventId } = route.params;

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(URL + '/user/getEventDaysnonAuth', {
        eventId: eventId,
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            var Days = response.data.days.rows;
            let newDaysObject = {};

            await Days.map((item) => {
              newDaysObject = {
                ...newDaysObject,
                [item.start]: {
                  selected: true,
                  marked: item.start === response.data.SA,
                },
              };
            });

            setDays(newDaysObject);

            setLoading(false);
            return;
          } else if (response.data.check === 'fail') {
            setLoading(false);
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => null }],
              {
                cancelable: false,
              }
            );
            return;
          } else {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => null }],
              {
                cancelable: false,
              }
            );
            return;
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => null }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => null }],
                {
                  cancelable: false,
                }
              );

              return;
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => null }],
                {
                  cancelable: false,
                }
              );
              return;
            }
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => null }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  }, []);

  return (
    <View style={styles.FlexOne}>
      {isLoading ? (
        <View style={styles.ViewCenter}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <CalendarList
          pastScrollRange={20}
          futureScrollRange={20}
          markedDates={{ ...isDays }}
          enableSwipeMonths={true}
          theme={{
            selectedDayBackgroundColor: PrimaryColor,
            'stylesheet.calendar.header': {
              dayHeader: {
                fontWeight: '600',
                color: PrimaryColor,
              },
            },
            'stylesheet.day.basic': {
              today: {
                borderColor: PrimaryBorder,
                borderWidth: 0.8,
              },
              todayText: {
                color: PrimaryText,
                fontWeight: '800',
              },
            },
          }}
        />
      )}
    </View>
  );
}

export default inject('store')(observer(WorkSchedulenonAuth));
