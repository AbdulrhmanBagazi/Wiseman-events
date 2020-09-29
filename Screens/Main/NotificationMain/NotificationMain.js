import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { AlertStrings } from '../../../Config/Strings'

function NotificationMain({ navigation, store }) {
  const [isLoading, setLoading] = React.useState(false)
  const [refreshing, setrefreshing] = React.useState(false)
  const { signOut } = React.useContext(AuthContext)
  const [isLoadingAlert, setLoadingAlert] = React.useState(false)

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
  })

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      RefreshMiddle()
      setLoading(false)
      Start()
    })

    return unsubscribe
  }, [navigation])

  const Start = () => {
    setTimeout(() => {
      setLoading(true)
    }, 500)
    return
  }

  const RefreshMiddle = async () => {
    setrefreshing(true)
    setLoading(false)
    axios
      .get(URL + '/user/getAlerts', {
        headers: {
          Authorization: store.token,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            await store.setAlertsData(response.data.alerts)
            setrefreshing(false)
            setLoading(true)
            return
          } else if (response.data.check === 'fail') {
            setrefreshing(false)
            setLoading(true)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setrefreshing(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        } else {
          setrefreshing(false)
          setLoading(true)

          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setrefreshing(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setrefreshing(false)
        setLoading(true)

        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove()
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              )

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setrefreshing(false) }],
                {
                  cancelable: false,
                }
              )
              return
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
          )
          return
        }
      })
  }

  const AcceptDeclinePromot = async (id, value, applicationId) => {
    setLoadingAlert(true)
    axios
      .post(
        URL + '/user/acceptDeclinePromot',
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
        if (response.status === 200) {
          if (response.data === 'success') {
            setLoadingAlert(false)

            RefreshMiddle()
            return
          } else if (response.data === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
              {
                cancelable: false,
              }
            )

            return
          } else if (response.data === 'revoke') {
            setLoadingAlert(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'تم إلغاء الطلب!' : 'the request has been canceled!',
              [{ text: 'OK', onPress: () => RefreshMiddle() }],
              {
                cancelable: false,
              }
            )
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove()
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              )

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
                {
                  cancelable: false,
                }
              )
              return
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
          )
          return
        }
      })
  }

  const AcceptDeclineTransfer = async (id, value, applicationId) => {
    setLoadingAlert(true)
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
        if (response.status === 200) {
          if (response.data === 'success') {
            setLoadingAlert(false)

            RefreshMiddle()
            return
          } else if (response.data === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
              {
                cancelable: false,
              }
            )

            return
          } else if (response.data === 'revoke') {
            setLoadingAlert(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'تم إلغاء الطلب!' : 'the request has been canceled!',
              [{ text: 'OK', onPress: () => RefreshMiddle() }],
              {
                cancelable: false,
              }
            )
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove()
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              )

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoadingAlert(false) }],
                {
                  cancelable: false,
                }
              )
              return
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
          )
          return
        }
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={store.alerts}
        showsVerticalScrollIndicator={false}
        srtyle={{
          flex: 1,
        }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={RefreshMiddle} tintColor={PrimaryColor} />
        }
        renderItem={({ item, index }) => (
          <View>
            <View style={index === 0 ? styles.NotificationBoxFirst : styles.NotificationBox}>
              <View style={styles.IconView}>
                {item.type === 'payment' ? (
                  <FontAwesome name="dollar" size={30} color="#9CA2B0" />
                ) : item.type === 'alert' ? (
                  <Icon name="bell" size={30} color="#9CA2B0" />
                ) : item.type === 'warning' ? (
                  <Icon name="alert-triangle" size={30} color="#9CA2B0" />
                ) : item.type === 'promote' ? (
                  <Icon
                    name="chevrons-up"
                    size={30}
                    color={
                      item.replied === false
                        ? '#9CA2B0'
                        : item.replied === true && item.replyvalue === 'Accept'
                        ? '#45a164'
                        : '#d16767'
                    }
                  />
                ) : item.type === 'demote' ? (
                  <Icon name="chevrons-down" size={30} color="#9CA2B0" />
                ) : item.type === 'completed' ? (
                  <Icon name="award" size={30} color="#9CA2B0" />
                ) : (
                  <Icon
                    name="clock"
                    size={30}
                    color={
                      item.TransferShift === null
                        ? '#9CA2B0'
                        : item.TransferShift.replied === false
                        ? '#9CA2B0'
                        : item.TransferShift.replied === true && item.TransferShift.replyvalue === 'accept'
                        ? '#45a164'
                        : '#d16767'
                    }
                  />
                )}
              </View>
              <View style={styles.CenterView}>
                <View style={styles.TimeView}>
                  <Text style={styles.title}>{I18nManager.isRTL ? item.titleAr : item.title}</Text>
                  {isLoading ? (
                    <Text style={styles.TimeText}>{moment(item.createdAt).fromNow()}</Text>
                  ) : (
                    <ActivityIndicator size="small" color={PrimaryColor} />
                  )}
                </View>
                <View style={styles.BodyTextView}>
                  <Text style={styles.bodyText}>{I18nManager.isRTL ? item.messageAr : item.message}</Text>
                </View>
              </View>
            </View>
            {item.type === 'promote' && item.replied === false ? (
              <View style={index === 0 ? styles.NotificationBoxFirst : styles.NotificationBox}>
                {isLoadingAlert ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <View style={styles.SpaceViewBody}>
                    <TouchableOpacity
                      style={styles.Accept}
                      onPress={() => AcceptDeclinePromot(item.id, 'Accept', item.applicationId)}>
                      <Text style={styles.AcceptDeclinetext}>{AlertStrings.Accept}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.Decline}
                      onPress={() => AcceptDeclinePromot(item.id, 'Decline', item.applicationId)}>
                      <Text style={styles.AcceptDeclinetext}>{AlertStrings.Decline}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}

            {item.type === 'transfer' &&
            item.TransferShift !== null &&
            item.TransferShift.replied === false ? (
              <View style={index === 0 ? styles.NotificationBoxFirst : styles.NotificationBox}>
                {isLoadingAlert ? (
                  <ActivityIndicator size="small" color={PrimaryColor} />
                ) : (
                  <View style={styles.SpaceViewBody}>
                    <TouchableOpacity
                      style={styles.Accept}
                      onPress={() =>
                        AcceptDeclineTransfer(
                          item.TransferShift.id,
                          'Accept',
                          item.TransferShift.applicationId
                        )
                      }>
                      <Text style={styles.AcceptDeclinetext}>{AlertStrings.Accept}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.Decline}
                      onPress={() =>
                        AcceptDeclineTransfer(
                          item.TransferShift.id,
                          'Decline',
                          item.TransferShift.applicationId
                        )
                      }>
                      <Text style={styles.AcceptDeclinetext}>{AlertStrings.Decline}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  )
}

export default inject('store')(observer(NotificationMain))
