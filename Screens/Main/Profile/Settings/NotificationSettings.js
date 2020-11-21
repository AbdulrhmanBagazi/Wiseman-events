import React from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import {
  View,
  Text,
  ScrollView,
  Switch,
  Modal,
  I18nManager,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { URL } from '../../../../Config/Config'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'
import Constants from 'expo-constants'

function NotificationSettings({ store }) {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [isShow, setShow] = React.useState(false)
  //
  const { signOut } = React.useContext(AuthContext)
  // console.log(store.data.notification.notificationsID)

  const registerForPushNotificationsAsync = async () => {
    await setIsEnabled((previousState) => !previousState)
    setShow(true)

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!')
        setShow(false)

        Alert.alert(
          '',
          I18nManager.isRTL
            ? 'يرجى السماح للتطبيق باستخدام الإشعارات من إعدادات هاتفك'
            : 'Please allow the app to use notifications from your phone setting',
          [
            {
              text: I18nManager.isRTL ? 'إلغاء' : 'cancel',
              style: 'cancel',
            },
            {
              text: I18nManager.isRTL ? 'أفتح الإعدادات ' : 'open settings',
              onPress: () => Linking.openSettings(),
            },
          ],
          { cancelable: false }
        )
        await setIsEnabled((previousState) => !previousState)

        return
      }
    } else {
      alert('Must use physical device for Push Notifications')
      setShow(false)
      await setIsEnabled((previousState) => !previousState)

      return
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
    //

    var token = (await Notifications.getExpoPushTokenAsync()).data

    if (token) {
      axios
        .post(
          URL + '/user/addnotifications',
          {
            notificationsID: token,
            allow: true,
          },
          {
            headers: { Authorization: store.token },
          }
        )
        .then((response) => {
          if (response.data === 'success') {
            if (store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            } else if (!store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            }
            setTimeout(() => {
              setShow(false)
            }, 2000)
            return
          } else {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        })
        .catch((error) => {
          // console.log(error.response)
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setShow(false) }],
            {
              cancelable: false,
            }
          )
          return
        })
    }

    return
  }

  const toggleSwitch = async () => {
    await setIsEnabled((previousState) => !previousState)
    setShow(true)
    axios
      .post(
        URL + '/user/updatenotifications',
        {
          allow: !isEnabled,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        // console.log(response.data)
        if (response.status === 200) {
          if (response.data === 'success') {
            if (store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            } else if (!store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            }
            setTimeout(() => {
              setShow(false)
            }, 2000)
            return
          } else if (response.data === 'fail') {
            setIsEnabled((previousState) => !previousState)
            setShow(false)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          } else {
            setIsEnabled((previousState) => !previousState)
            setShow(false)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setIsEnabled((previousState) => !previousState)
        setShow(false)
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
                [{ text: 'OK', onPress: () => setShow(false) }],
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
            [{ text: 'OK', onPress: () => setShow(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
  }

  React.useEffect(() => {
    if (store.data.notification) {
      setIsEnabled(store.data.notification.allow)
    }
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.about}>
        <View style={styles.aboutE}></View>
        <View style={styles.aboutB}>
          <View style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{I18nManager.isRTL ? 'إشعارات' : 'Notification'}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Switch
                trackColor={{ false: '#767577', true: '#AF0029' }}
                thumbColor={isEnabled ? '#FEF3F6' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={
                  store.data.notification.notificationsID === 'false'
                    ? registerForPushNotificationsAsync
                    : toggleSwitch
                }
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default inject('store')(observer(NotificationSettings))
