import React from 'react';
import {
  ScrollView,
  Text,
  View,
  I18nManager,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import styles from './Style';
import {
  CompleteDetailsStrings,
  WorkScheduleUserString,
} from '../../../Config/Strings';
import moment from 'moment';
// import CalHours from './Details/CalHours';
import CalSalary from './Details/CalSalay';
import { PrimaryColor } from '../../../Config/ColorPalette';
import axios from 'axios';
import { URL } from '../../../Config/Config';
import { AuthContext } from '../../../Hooks/Context';
import { UserTokenRemove } from '../../../Config/AsyncStorage';
import { inject, observer } from 'mobx-react';
import Paymentdata from './Details/Paymentdata';
import { Entypo } from '@expo/vector-icons';
import { height } from '../../../Config/Layout';
import { useHeaderHeight } from '@react-navigation/stack';
import humanizeDuration from 'humanize-duration';

function CompleteDetails({ route, store }) {
  const { signOut } = React.useContext(AuthContext);
  const [isAtt, setAtt] = React.useState([]);
  const [isData, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isList, setList] = React.useState(false);

  const { items } = route.params;

  React.useEffect(() => {
    var data = items.attendances;
    setAtt(data);
    axios
      .post(
        URL + '/user/Getusersinglepayment',
        {
          applicationId: items.id,
        },
        {
          headers: {
            Authorization: store.token,
            'Cache-Control': 'no-cache',
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            setData(response.data.payments);
            setLoading(false);
            // console.log(response.data.payments)
            return;
          } else if (response.data.check === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            );
            return;
          } else {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
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
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
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
                [{ text: 'OK', onPress: () => setLoading(false) }],
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
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  }, []);

  //   values: ['pending', 'paid', 'not-paid'],

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

  const [heightChange] = React.useState(new Animated.Value(0));
  const headerHeight = useHeaderHeight();

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

  return (
    <View style={styles.FlexOne}>
      {isLoading ? (
        <View style={styles.WorkSchedule}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <ScrollView style={styles.CompleteDetailsView}>
          <View style={styles.ViewAlignSelf}>
            <View style={styles.CompleteDetailsHeader}>
              <View style={styles.CompleteDetailsHeaderView}>
                <Text style={styles.CompleteDetailsHeaderViewText}>
                  {CompleteDetailsStrings.Start}
                </Text>
                <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                  {moment(items.Start).format('D MMMM, YYYY')}
                </Text>
              </View>
              <View style={styles.CompleteDetailsHeaderView}>
                <Text style={styles.CompleteDetailsHeaderViewText}>
                  {CompleteDetailsStrings.Ended}
                </Text>
                <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                  {moment(items.End).format('D MMMM, YYYY')}
                </Text>
              </View>
            </View>

            <View style={styles.CompleteDetailsHeaderHour}>
              {!items.event.ProvideAmeal ? (
                <View style={styles.CompleteDetailsHeaderViewSalary}>
                  <Text style={styles.CompleteDetailsHeaderViewText}>
                    {CompleteDetailsStrings.Totalmeal}
                  </Text>
                  <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                    {items.event.ProvideAnAllowance}
                    {I18nManager.isRTL ? 'ريال ' : ' SAR'}
                    <Text style={styles.CompleteDetailsHeaderViewText}>
                      /{I18nManager.isRTL ? 'يوم عمل' : 'Work day'}
                    </Text>
                  </Text>
                </View>
              ) : null}
            </View>

            <View>
              <Text style={styles.CompleteDetailsbodyTitle}>
                {CompleteDetailsStrings.workHistory}
              </Text>
              <View style={styles.CompleteDetailsbodyContainer}>
                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Late}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} Late={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.absence}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} absence={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.incomplete}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata
                      Values={isData}
                      data={isAtt}
                      incomplete={true}
                    />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.complete}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata
                      Values={isData}
                      data={isAtt}
                      Completed={true}
                    />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Totalhours}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} Hours={true} />
                  </View>
                </View>

                {!items.event.ProvideAmeal ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={styles.FlexOne}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.Total}
                      </Text>
                    </View>
                    <View style={styles.FlexEnd}>
                      <CalSalary
                        Values={items.attendances}
                        Rate={items}
                        Meal={items.event.ProvideAmeal}
                        MealPlus={items.event.ProvideAnAllowance}
                        Val="Earning"
                      />
                    </View>
                  </View>
                ) : null}

                {!items.event.ProvideAmeal ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={styles.FlexOne}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.Totalmeal}
                      </Text>
                    </View>
                    <View style={styles.FlexEnd}>
                      <CalSalary
                        Values={items.attendances}
                        Rate={items}
                        Meal={items.event.ProvideAmeal}
                        MealPlus={items.event.ProvideAnAllowance}
                        Val="Meal"
                      />
                    </View>
                  </View>
                ) : null}

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Totalearning}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <CalSalary
                      Values={items.attendances}
                      Rate={items}
                      Meal={items.event.ProvideAmeal}
                      MealPlus={items.event.ProvideAnAllowance}
                      Val="Total"
                    />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Fees}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} Fees={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.deduction}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata
                      Values={isData}
                      data={isAtt}
                      deduction={true}
                    />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.bonus}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} bonus={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={styles.FlexOne}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Received}
                    </Text>
                  </View>
                  <View style={styles.FlexEnd}>
                    <Paymentdata Values={isData} data={isAtt} paid={true} />
                  </View>
                </View>

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
                          backgroundColor: getColor(items.PaymentStatus),
                          borderColor: getColorBorder(items.PaymentStatus),
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.CompleteDetailsbodyContainerDataTextValue,
                          { color: getColorBorder(items.PaymentStatus) },
                        ]}
                      >
                        {I18nManager.isRTL
                          ? getArabic(items.PaymentStatus)
                          : items.PaymentStatus}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.msg}>{CompleteDetailsStrings.msg}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      <Animated.View style={[styles.hiddinList, { height: heightChange }]}>
        {isData.length >= 1 ? (
          <FlatList
            // data={isDays}
            contentContainerStyle={styles.flatlistitems}
            data={isAtt}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.time}>
                  {item.Start
                    ? WorkScheduleUserString.TakeAttendence +
                      ':  ' +
                      moment
                        .tz(item.Start, 'Asia/Riyadh')
                        .add(
                          item.Late >= 0 && item.Late <= 10 ? item.Late : 0,
                          'minute'
                        )
                        .format('hh:mm a')
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
                <Text style={styles.time}>
                  {item.TotalHours
                    ? WorkScheduleUserString.Totalhours +
                      ':   ' +
                      humanizeDuration(item.TotalHours * 60000, {
                        units: ['h', 'm'],
                        round: true,
                        language: I18nManager.isRTL ? 'ar' : 'en',
                        fallbacks: ['en'],
                      })
                    : WorkScheduleUserString.Totalhours +
                      ':   ' +
                      WorkScheduleUserString.noInfo}
                </Text>
                <Text style={styles.timeJob} numberOfLines={1}>
                  {item.title_ar || item.title
                    ? I18nManager.isRTL
                      ? item.title_ar
                      : item.title
                    : WorkScheduleUserString.noInfo}
                </Text>
                <View style={styles.StatusAtten}>
                  <Text
                    style={[
                      styles.StatusAttenText,
                      { color: getBadge(item.Status) },
                    ]}
                  >
                    {I18nManager.isRTL ? getBadgeAr(item.Status) : item.Status}
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

      <TouchableOpacity style={styles.InfoHover} onPress={() => Start(!isList)}>
        {isList ? (
          <Entypo name="cross" size={24} color="#fff" />
        ) : (
          <Entypo name="list" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default inject('store')(observer(CompleteDetails));
