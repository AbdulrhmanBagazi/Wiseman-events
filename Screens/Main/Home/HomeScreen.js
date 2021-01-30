import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  I18nManager,
  Alert,
  AppState,
  RefreshControl,
  Platform,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { HomePageStrings } from '../../../Config/Strings'
import { URL } from '../../../Config/Config'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'
import axios from 'axios'
import RefreshButton from '../../Components/RefreshButton/RefreshButton'
import Icon from '../../../Config/Icons'
//
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenRemove, QrStore } from '../../../Config/AsyncStorage'
import * as Notifications from 'expo-notifications'
import moment from 'moment'

function Home({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(true)
  const [isSoon, setSoon] = React.useState(false)
  const [isRefresh, setRefresh] = React.useState(false)
  const [isStatus, setStatus] = React.useState(false)
  const appState = React.useRef(AppState.currentState)
  //
  const { signOut, Load } = React.useContext(AuthContext)

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    QrStore(store.data.qr.id)

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      if (Platform.OS === 'android') {
        Notifications.dismissAllNotificationsAsync()
        if (notification.request.content.data.data) {
          if (notification.request.content.data.data === 'Earnings') {
            store.updEarningsBadgeage(store.EarningsBadgeNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'History') {
            store.setHistoryPageBack()
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'NotificationMain') {
            store.setNotificationMainPageBack()
            store.updageNotificationMain(store.NotificationMainNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'Calendar') {
            store.setCalendarIds(store.CalendarMainIDs, notification.request.content.data.eventId)
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          }

          return
        } else {
          return
        }
      } else {
        Notifications.dismissAllNotificationsAsync()

        if (notification.request.content.data.data) {
          if (notification.request.content.data.data === 'Earnings') {
            store.updEarningsBadgeage(store.EarningsBadgeNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'History') {
            store.setHistoryPageBack()
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'NotificationMain') {
            store.setNotificationMainPageBack()
            store.updageNotificationMain(store.NotificationMainNumber + 1, true)

            return
          } else if (notification.request.content.data.data === 'Calendar') {
            store.setCalendarIds(store.CalendarMainIDs, notification.request.content.data.eventId)
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          }
          return
        } else {
          return
        }
      }
    })
    return () => subscription.remove()
  }, [])

  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  React.useEffect(() => {
    if (lastNotificationResponse) {
      navigation.navigate('Home')

      if (Platform.OS === 'android') {
        Notifications.dismissAllNotificationsAsync()
        if (lastNotificationResponse.notification.request.content.data.data) {
          if (lastNotificationResponse.notification.request.content.data.data === 'Earnings') {
            store.updEarningsBadgeage(store.EarningsBadgeNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'History') {
            store.setHistoryPageBack()
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'NotificationMain') {
            store.setNotificationMainPageBack()
            store.updageNotificationMain(store.NotificationMainNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'Calendar') {
            store.setCalendarIds(
              store.CalendarMainIDs,
              lastNotificationResponse.notification.request.content.data.eventId
            )
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          }
          return
        } else {
          return
        }
      } else {
        if (lastNotificationResponse.notification.request.content.data.data) {
          if (lastNotificationResponse.notification.request.content.data.data === 'Earnings') {
            store.updEarningsBadgeage(store.EarningsBadgeNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'History') {
            store.setHistoryPageBack()
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'NotificationMain') {
            store.setNotificationMainPageBack()
            store.updageNotificationMain(store.NotificationMainNumber + 1, true)
          } else if (lastNotificationResponse.notification.request.content.data.data === 'Calendar') {
            store.setCalendarIds(
              store.CalendarMainIDs,
              lastNotificationResponse.notification.request.content.data.eventId
            )
            store.updageHistoryBadge(store.HistoryBadgeNumber + 1, true)
          }
          return
        } else {
          return
        }
      }
    }

    return
  }, [lastNotificationResponse])

  const _handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      if (store.resetDate) {
        var time = await moment(store.resetDate)
        var current = await moment()
        var duration = await moment(current).diff(time, 'minutes')

        if (Number(duration) >= 60) {
          store.setresetDate()
          store.setResetPages()
          Load()

          return
        }

        return
      } else {
        store.setresetDate()
        store.setResetPages()
        return
      }
    }

    appState.current = nextAppState

    return
  }

  React.useEffect(() => {
    setLoading(true)
    setError(true)
    setSoon(false)
    const unsubscribe = navigation.addListener('focus', () => {
      if (store.data.status === null) {
        setStatus(true)
      } else {
        setStatus(false)
      }
      return
    })

    axios
      .get(URL + '/user/mainPageJobs', {
        headers: {
          Authorization: store.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            if (response.data.data.length === 0) {
              setTimeout(() => {
                setError(false)
                setSoon(true)
                setLoading(false)
              }, 1000)
            } else {
              await store.setfewevents(response.data.data)
              setTimeout(() => {
                setLoading(false)
              }, 1000)
            }

            return
          } else if (response.data.check === 'fail') {
            setError(false)
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(false)
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
                [{ text: 'OK', onPress: () => setError(false) }],
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
            [{ text: 'OK', onPress: () => setError(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })

    return unsubscribe
  }, [isRefresh, navigation])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => (isLoading ? null : setRefresh(!isRefresh))}
            tintColor={PrimaryColor}
          />
        }>
        <View style={styles.Container}>
          <TopCard Data={store.banner} />
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : !isError ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              {isSoon ? (
                <View>
                  <Text style={styles.soon}>{HomePageStrings.Soon}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.error}>{HomePageStrings.Error}</Text>
                  <RefreshButton onPress={() => setRefresh(!isRefresh)} />
                </View>
              )}
            </View>
          ) : (
            store.fewevents.map((data) => {
              return (
                <JobCard
                  click={navigation.navigate}
                  More={navigation.navigate}
                  ID={data.id}
                  key={data.id}
                  Title={data.Title}
                  TitleAr={data.TitleAr}
                  Total={data.Total}
                  data={data.events}
                  Loading={store.feweventsloading}
                  FadeIn={isLoading}
                />
              )
            })
          )}
        </View>
      </ScrollView>
      {isStatus ? (
        <View style={styles.Notify}>
          <View style={{ flex: 4 }}>
            <Text style={styles.NotifyText}>{HomePageStrings.Status}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.NotifyButton} onPress={() => navigation.navigate('Status')}>
              <Icon name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'} size={24} color={PrimaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default inject('store')(observer(Home))
