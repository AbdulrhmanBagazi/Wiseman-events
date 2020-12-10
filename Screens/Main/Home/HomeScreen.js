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
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import * as Notifications from 'expo-notifications'

function Home({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(true)
  const [isSoon, setSoon] = React.useState(false)
  const [isRefresh, setRefresh] = React.useState(false)
  const [isStatus, setStatus] = React.useState(false)
  const responseListener = React.useRef()
  const notificationListener = React.useRef()
  const appState = React.useRef(AppState.currentState)
  //
  const { signOut } = React.useContext(AuthContext)

  React.useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.navigate('Home')
      if (response.notification.request.content.data.body.data) {
        if (response.notification.request.content.data.body.data === 'Earnings') {
          navigation.navigate('Profile')
          navigation.navigate(response.notification.request.content.data.body.data)
        } else {
          navigation.navigate(response.notification.request.content.data.body.data)
        }
        return
      } else {
        return
      }
    })

    // navigation.navigate('Profile')
    // navigation.navigate('Earnings')
    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   console.log(notification)
    // })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  const _handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      store.setResetPages()
    }

    appState.current = nextAppState
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
              setError(false)
              setSoon(true)
              setLoading(false)
            } else {
              await store.setfewevents(response.data.data)
              setLoading(false)
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
