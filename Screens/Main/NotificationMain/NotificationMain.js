import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  FlatList,
  RefreshControl,
  Alert,
  Linking,
  Image,
} from 'react-native';
import styles from './Style';
import Icon from '../../../Config/Icons';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { PrimaryColor } from '../../../Config/ColorPalette';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { URL } from '../../../Config/Config';
import { AuthContext } from '../../../Hooks/Context';
import { UserTokenRemove } from '../../../Config/AsyncStorage';
import { AlertStrings } from '../../../Config/Strings';
import { Ionicons } from '@expo/vector-icons';

function NotificationMain({ navigation, store }) {
  const [isLoading, setLoading] = React.useState(false);
  const [refreshing, setrefreshing] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);
  const [isLoadingAlert, setLoadingAlert] = React.useState(false);
  const [isData, setData] = React.useState([]);
  const [isDataTransfer, setDataTransfer] = React.useState([]);
  const [isDataJob, setDataJob] = React.useState([]);

  const [count, setcount] = React.useState(0);
  const [ispage, setpage] = React.useState(0);
  const [showMore, setshowmore] = React.useState(false);
  const [LoadFooter, setLoadFooter] = React.useState(false);

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few sec',
      ss: '%d sec',
      m: 'a min',
      mm: '%d mins',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      w: 'a week',
      ww: '%d weeks',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });

  // React.useEffect(() => {
  //   const unsubscribe = navigation
  //     .dangerouslyGetParent()
  //     .addListener('tabPress', (e) => {
  //       // Do something
  //       if (store.NotificationMainPage) {
  //         RefreshMiddle();
  //         setLoading(false);

  //         return;
  //       }

  //       return;
  //     });

  //   return unsubscribe;
  // }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (store.NotificationMainPage) {
        RefreshMiddle();
        setLoading(false);
        return;
      } else {
        store.updageNotificationMain(0, false);
        return;
      }
    });

    return unsubscribe;
  }, [navigation, store.NotificationMainPage]);

  const Start = () => {
    setLoading(true);
    return;
  };

  const RefreshMiddle = async () => {
    setrefreshing(true);
    setLoading(false);
    setshowmore(false);
    axios
      .get(URL + '/user/getAlerts', {
        headers: {
          Authorization: store.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            // console.log(response.data.Transfer);
            setDataTransfer(response.data.Transfer);
            setDataJob(response.data.Jobs);
            setData(response.data.alerts.rows);
            setcount(response.data.alerts.count);
            await store.setNotificationMainPage();
            setrefreshing(false);
            setLoading(true);
            setpage(0);
            store.updageNotificationMain(0, false);

            Start();

            return;
          } else if (response.data.check === 'fail') {
            setrefreshing(false);
            setLoading(true);

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setrefreshing(false) }],
              {
                cancelable: false,
              }
            );
            return;
          } else {
            setrefreshing(false);
            setLoading(true);

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setrefreshing(false) }],
              {
                cancelable: false,
              }
            );
            return;
          }
        } else {
          setrefreshing(false);
          setLoading(true);

          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setrefreshing(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        setrefreshing(false);
        setLoading(true);

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
                [{ text: 'OK', onPress: () => setrefreshing(false) }],
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
            [{ text: 'OK', onPress: () => setrefreshing(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  };

  const AcceptDeclinePromot = async (id, value, applicationId, jobId) => {
    setLoadingAlert(true);
    axios
      .post(
        URL + '/user/acceptDeclinePromot',
        {
          id,
          value,
          applicationId,
          jobId,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data === 'success') {
            setLoadingAlert(false);

            RefreshMiddle();
            store.setHistoryPageBack();

            return;
          } else if (response.data === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
              {
                cancelable: false,
              }
            );

            return;
          } else if (response.data === 'revoke') {
            setLoadingAlert(false);
            Alert.alert(
              '',
              I18nManager.isRTL
                ? 'تم إلغاء الطلب!'
                : 'the request has been canceled!',
              [{ text: 'OK', onPress: () => RefreshMiddle() }],
              {
                cancelable: false,
              }
            );
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
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
                [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
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
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  };

  const AcceptDeclineTransfer = async (id, value, applicationId) => {
    setLoadingAlert(true);
    axios
      .post(
        URL + '/user/acceptDeclineTransfer',
        {
          id,
          value,
          applicationId,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        // console.log(response.data);
        if (response.status === 200) {
          if (response.data === 'success') {
            setLoadingAlert(false);

            RefreshMiddle();
            return;
          } else if (response.data === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
              {
                cancelable: false,
              }
            );

            return;
          } else if (response.data === 'revoke') {
            setLoadingAlert(false);
            Alert.alert(
              '',
              I18nManager.isRTL
                ? 'تم إلغاء الطلب!'
                : 'the request has been canceled!',
              [{ text: 'OK', onPress: () => RefreshMiddle() }],
              {
                cancelable: false,
              }
            );
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        // console.log(error.response);
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
                [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
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
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  };

  const LoadMore = async () => {
    setshowmore(false);
    setLoadFooter(true);
    axios
      .post(
        URL + '/user/getAlertsPages',
        {
          page: ispage + 1,
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
            setData([...isData, ...response.data.alerts.rows]);
            setcount(response.data.alerts.count);
            setpage(ispage + 1);
            setLoadFooter(false);
            return;
          } else if (response.data.check === 'fail') {
            setLoadFooter(false);

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setshowmore(true) }],
              {
                cancelable: false,
              }
            );
            return;
          } else {
            setLoadFooter(false);

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setshowmore(true) }],
              {
                cancelable: false,
              }
            );
            return;
          }
        } else {
          setLoadFooter(false);

          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setshowmore(true) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        setLoadFooter(false);

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
                [{ text: 'OK', onPress: () => setshowmore(true) }],
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
            [{ text: 'OK', onPress: () => setshowmore(true) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  };

  return (
    <View style={styles.Flexone}>
      {isData.length <= 0 ? (
        <View style={styles.MainView}>
          <Image
            style={styles.Image}
            source={require('../../../assets/notificationillustration.png')}
          />
        </View>
      ) : null}

      <FlatList
        data={[...isDataTransfer, ...isDataJob, ...isData]}
        showsVerticalScrollIndicator={false}
        srtyle={{
          flex: 1,
        }}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={RefreshMiddle}
            tintColor={PrimaryColor}
          />
        }
        onEndReachedThreshold={0} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700
        onEndReached={() => {
          isData.length < count ? setshowmore(true) : null;
        }}
        contentContainerStyle={styles.paddingContent}
        ListFooterComponent={
          LoadFooter ? (
            <ActivityIndicator
              style={styles.MarginLoading}
              size="large"
              color={PrimaryColor}
            />
          ) : showMore ? (
            <TouchableOpacity
              style={styles.ShowMoreButton}
              disabled={refreshing}
              onPress={() => LoadMore()}
            >
              <Text style={styles.ShowMoreButtonText}>
                {I18nManager.isRTL ? 'تحميل المزيد' : 'Load More'}
              </Text>
            </TouchableOpacity>
          ) : null
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity disabled={true}>
            <View
              style={
                index === 0
                  ? styles.NotificationBoxFirst
                  : styles.NotificationBox
              }
            >
              <View style={styles.IconView}>
                {item.type === 'payment' ? (
                  <FontAwesome name="dollar" size={30} color="#9CA2B0" />
                ) : item.type === 'alert' ? (
                  <Icon name="bell" size={30} color="#9CA2B0" />
                ) : item.type === 'warning' ? (
                  <Icon name="alert-triangle" size={30} color="#9CA2B0" />
                ) : item.type === 'promote' ? (
                  <Icon name="chevrons-up" size={30} color={'#9CA2B0'} />
                ) : item.type === 'demote' ? (
                  <Icon name="chevrons-down" size={30} color="#9CA2B0" />
                ) : item.type === 'completed' ? (
                  <Icon name="award" size={30} color="#9CA2B0" />
                ) : item.type === 'calendar' ? (
                  <Icon name="calendar" size={30} color="#9CA2B0" />
                ) : item.type === 'clock' ? (
                  <Icon name="clock" size={30} color="#9CA2B0" />
                ) : (
                  <Icon name="map-pin" size={30} color="#9CA2B0" />
                )}
              </View>
              <View style={styles.CenterView}>
                <View style={styles.TimeView}>
                  <Text style={styles.title}>
                    {I18nManager.isRTL ? item.titleAr : item.title}
                  </Text>
                  {isLoading ? (
                    <Text style={styles.TimeText}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color={PrimaryColor} />
                  )}
                </View>
                <View style={styles.BodyTextView}>
                  <Text style={styles.bodyText}>
                    {I18nManager.isRTL ? item.messageAr : item.message}
                  </Text>
                  {item.type === 'location' ? (
                    <Text style={styles.bodyTextTime}>
                      {I18nManager.isRTL
                        ? moment(item.end, 'hh:mm').format('hh:mma')
                        : moment(item.start, 'hh:mm').format('hh:mma')}{' '}
                      {I18nManager.isRTL ? (
                        <Icon name="arrow-left" size={14} color="black" />
                      ) : (
                        <Icon name="arrow-right" size={14} color="black" />
                      )}{' '}
                      {I18nManager.isRTL
                        ? moment(item.start, 'hh:mm').format('hh:mma')
                        : moment(item.end, 'hh:mm').format('hh:mma')}
                    </Text>
                  ) : null}
                </View>
              </View>

              {/* {item.type === 'location' ? <Icon name="external-link" size={14} color={PrimaryColor} /> : null} */}
            </View>

            {item.type === 'promote' && item.replied === false ? (
              <View
                style={
                  index === 0
                    ? styles.NotificationBoxFirst
                    : styles.NotificationBox
                }
              >
                {isLoadingAlert ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <View style={styles.SpaceViewBody}>
                    <TouchableOpacity
                      disabled={refreshing}
                      style={styles.Accept}
                      onPress={() =>
                        AcceptDeclinePromot(
                          item.id,
                          'Accept',
                          item.applicationId,
                          item.newJob
                        )
                      }
                    >
                      <Text style={styles.AcceptDeclinetext}>
                        {AlertStrings.Accept}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      disabled={refreshing}
                      style={styles.Decline}
                      onPress={() =>
                        AcceptDeclinePromot(
                          item.id,
                          'Decline',
                          item.applicationId,
                          item.newJob
                        )
                      }
                    >
                      <Text style={styles.AcceptDeclinetext}>
                        {AlertStrings.Decline}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : item.type === 'location' ? (
              <View style={styles.NotificationBoxFirst}>
                <View style={styles.SpaceViewBody}>
                  <TouchableOpacity
                    disabled={refreshing}
                    style={styles.LocationButton}
                    onPress={() => Linking.openURL(item.location)}
                  >
                    <Text style={styles.AcceptDeclinetext}>
                      {AlertStrings.Location}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.Contact}
                    disabled={refreshing}
                    onPress={() =>
                      Linking.openURL(
                        'whatsapp://send?phone=+966' + Number(item.phone)
                      )
                        .then((data) => {
                          return null;
                        })
                        .catch(() => {
                          Alert.alert(
                            '',
                            I18nManager.isRTL
                              ? 'تأكد من تثبيت WhatsApp على جهازك!'
                              : 'Make sure WhatsApp installed on your device',
                            {
                              cancelable: false,
                            }
                          );

                          return null;
                        })
                    }
                  >
                    <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : item.type === 'whatsApp' ? (
              <View style={styles.NotificationBoxFirst}>
                <View style={styles.SpaceViewBody}>
                  <TouchableOpacity
                    style={styles.Contact}
                    disabled={refreshing}
                    onPress={() =>
                      Linking.openURL(item.phone)
                        .then((data) => {
                          return null;
                        })
                        .catch(() => {
                          Alert.alert(
                            '',
                            I18nManager.isRTL
                              ? 'تأكد من تثبيت WhatsApp على جهازك!'
                              : 'Make sure WhatsApp installed on your device',
                            {
                              cancelable: false,
                            }
                          );

                          return null;
                        })
                    }
                  >
                    <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {item.type === 'transfer' && item.replied === false ? (
              <View
                style={
                  index === 0
                    ? styles.NotificationBoxFirst
                    : styles.NotificationBox
                }
              >
                {isLoadingAlert ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <View style={styles.SpaceViewBody}>
                    <TouchableOpacity
                      style={styles.Accept}
                      disabled={refreshing}
                      onPress={() =>
                        AcceptDeclineTransfer(
                          item.id,
                          'Accept',
                          item.applicationId
                        )
                      }
                    >
                      <Text style={styles.AcceptDeclinetext}>
                        {AlertStrings.Accept}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.Decline}
                      disabled={refreshing}
                      onPress={() =>
                        AcceptDeclineTransfer(
                          item.id,
                          'Decline',
                          item.applicationId
                        )
                      }
                    >
                      <Text style={styles.AcceptDeclinetext}>
                        {AlertStrings.Decline}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      />

      {}
    </View>
  );
}

export default inject('store')(observer(NotificationMain));
