import React from 'react';
import {
  View,
  ActivityIndicator,
  I18nManager,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
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
  const [isShow, setShow] = React.useState(false);
  const [isData, setData] = React.useState([]);
  const [isShowInfo, setShowInfo] = React.useState(false);
  const [isDataInfo, setDataInfo] = React.useState({});

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

  return (
    <View style={styles.FlexOne}>
      {isLoading ? (
        <View style={styles.WorkSchedule}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <CalendarList
          pastScrollRange={20}
          futureScrollRange={20}
          markedDates={{ ...isDays }}
          enableSwipeMonths={true}
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
      )}

      <TouchableOpacity style={styles.InfoHover} onPress={() => setShow(true)}>
        <Text style={styles.InfoHoverText}>?</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={isShow}>
        <TouchableOpacity
          style={styles.modal}
          onPress={() => setShow(false)}
          activeOpacity={0.5}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.InfoBox, { backgroundColor: LightText }]}>
              <Text style={styles.InfoBoxText}>
                {WorkScheduleUserString.Work}
              </Text>
            </View>
            <View style={styles.InfoBox}>
              <Text style={styles.InfoBoxText}>
                {WorkScheduleUserString.active}
              </Text>
            </View>
            <View style={styles.InfoBox}>
              <Text style={styles.InfoBoxText}>
                {WorkScheduleUserString.Absence}
              </Text>
            </View>
            <View style={styles.InfoBox}>
              <Text style={styles.InfoBoxText}>
                {WorkScheduleUserString.incomplete}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

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
