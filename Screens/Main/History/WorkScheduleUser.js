import React from 'react';
import {
  View,
  ActivityIndicator,
  I18nManager,
  Alert,
  TouchableOpacity,
  Text,
  Animated,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import {
  PrimaryColor,
  PrimaryText,
  LightText,
  PrimaryBorder,
} from '../../../Config/ColorPalette';
import { LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { URL } from '../../../Config/Config';
import { inject, observer } from 'mobx-react';
import styles from './Style';
import { WorkScheduleUserString } from '../../../Config/Strings';
import InfoModal from '../../Components/InfoModal/InfoModal';
import { UserTokenRemove } from '../../../Config/AsyncStorage';
import { AuthContext } from '../../../Hooks/Context';
import { Entypo } from '@expo/vector-icons';
import { height } from '../../../Config/Layout';
import { useHeaderHeight } from '@react-navigation/stack';
import moment from 'moment-timezone';

//Config
//#11865B
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

function WorkScheduleUser({ route, store }) {
  const { signOut } = React.useContext(AuthContext);
  const [isLoading, setLoading] = React.useState(true);
  // const [refreshing, setrefreshing] = React.useState(false);
  const [isDays, setDays] = React.useState({});
  const [isData, setData] = React.useState([]);
  const [isShowInfo, setShowInfo] = React.useState(false);
  const [isDataInfo, setDataInfo] = React.useState({});
  const [isList, setList] = React.useState(false);
  const [heightChange] = React.useState(new Animated.Value(0));
  const headerHeight = useHeaderHeight();
  const Start = async (val) => {
    setList(val);

    var HeaderH =
      Platform.OS === 'ios'
        ? height - headerHeight
        : height - headerHeight + StatusBar.currentHeight;

    Animated.timing(heightChange, {
      toValue: val ? HeaderH : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const { eventId, applicationId } = route.params;

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        URL + '/user/getEventDaysUser',
        {
          eventId: eventId,
          applicationId: applicationId,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            var Days = response.data.days;
            var Attendance = response.data.Attendance;
            setData(response.data.Attendance);
            let newAttendanceObject = {};
            await Attendance.map((item) => {
              newAttendanceObject = {
                ...newAttendanceObject,
                [item.eventday.start]: item.Status,
              };
            });

            let newDaysObject = {};
            await Days.map((item) => {
              if (newAttendanceObject[item.date]) {
                var value = newAttendanceObject[item.date];
                newDaysObject = {
                  ...newDaysObject,
                  [item.date]: {
                    selected: true,
                    marked: item.date === response.data.SA,
                    selectedColor:
                      value === 'pending'
                        ? '#5bc0de'
                        : value === 'active'
                        ? '#22bb33'
                        : value === 'completed'
                        ? '#22bb33'
                        : value === 'incomplete'
                        ? '#f0ad4e'
                        : '#bb2124',
                    dotColor: PrimaryColor,
                  },
                };
              } else {
                newDaysObject = {
                  ...newDaysObject,
                  [item.date]: {
                    selected: true,
                    marked: item.date === response.data.SA,
                    selectedColor:
                      item.date === response.data.SA ? '#5bc0de' : LightText,
                  },
                };
              }
            });

            setDays(newDaysObject);
            store.removeCalendarIds(store.CalendarMainIDs, eventId);
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
              await UserTokenRemove();
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
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

  const ViewDay = async (val) => {
    var a = await isData.find((e) => e.eventday.start === val.dateString);

    if (a) {
      setShowInfo(true);
      setDataInfo(a);

      return;
    }

    return;
  };

  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return '#61C5FF';
      case 'incomplete':
        return '#D5000E';
      case 'completed':
        return '#2DB329';
      case 'pending':
        return '#FFAA00';
      default:
        return '#D5000E';
    }
  };

  const getBadgeAr = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'incomplete':
        return 'غير مكتمل';
      case 'completed':
        return 'مكتمل';
      case 'didnotstart':
        return ' ';
      case 'absence':
        return 'غياب';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return 'تم رفع بلاغ';
    }
  };

  return (
    <View style={styles.FlexOne}>
      {isLoading ? (
        <View style={styles.WorkSchedule}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <>
          <CalendarList
            pastScrollRange={20}
            futureScrollRange={20}
            markedDates={{ ...isDays }}
            enableSwipeMonths={false}
            onDayPress={(day) => {
              ViewDay(day);
            }}
            theme={{
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
          <Animated.View style={[styles.hiddinList, { height: heightChange }]}>
            {isData.length >= 1 ? (
              <FlatList
                // data={isDays}
                contentContainerStyle={styles.flatlistitems}
                data={isData}
                renderItem={({ item, index }) => (
                  <View style={styles.item}>
                    <Text style={styles.title}>{item.eventday.start}</Text>
                    <Text style={styles.time}>
                      {item.Start
                        ? WorkScheduleUserString.TakeAttendence +
                          ':  ' +
                          moment.tz(item.Start, 'Asia/Riyadh').format('hh:mm a')
                        : WorkScheduleUserString.TakeAttendence +
                          ':  ' +
                          WorkScheduleUserString.noInfo}
                    </Text>
                    <Text style={styles.time}>
                      {item.End
                        ? WorkScheduleUserString.TakeAttendenceEnd +
                          ':   ' +
                          moment.tz(item.End, 'Asia/Riyadh').format('hh:mm a')
                        : WorkScheduleUserString.TakeAttendenceEnd +
                          ':   ' +
                          WorkScheduleUserString.noInfo}
                    </Text>
                    <View style={styles.StatusAtten}>
                      <Text
                        style={[
                          styles.StatusAttenText,
                          { color: getBadge(item.Status) },
                        ]}
                      >
                        {I18nManager.isRTL
                          ? getBadgeAr(item.Status)
                          : item.Status}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text style={styles.noAttendlist}>
                {WorkScheduleUserString.noAttendInfo}
              </Text>
            )}
          </Animated.View>
        </>
      )}

      <TouchableOpacity style={styles.InfoHover} onPress={() => Start(!isList)}>
        {isList ? (
          <Entypo name="calendar" size={24} color="#fff" />
        ) : (
          <Entypo name="list" size={24} color="#fff" />
        )}
      </TouchableOpacity>

      <InfoModal
        OpenModal={isShowInfo}
        onPress={() => setShowInfo(false)}
        TakeAttendence={WorkScheduleUserString.TakeAttendence}
        TakeAttendenceEnd={WorkScheduleUserString.TakeAttendenceEnd}
        Data={isDataInfo}
      />
    </View>
  );
}

export default inject('store')(observer(WorkScheduleUser));
