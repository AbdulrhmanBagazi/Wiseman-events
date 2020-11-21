import * as Permissions from 'expo-permissions'
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
  I18nManager,
} from 'react-native'
import styles from './Style'
import { NotificationStrings, ErrorsStrings } from '../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { Notifications } from 'expo'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import debounce from 'lodash/debounce'
import { PrimaryColor } from '../../../Config/ColorPalette'
import Constants from 'expo-constants'

function Notification({ navigation, store }) {
  const [PushToken, setPushToken] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)
  const [isShow, setShow] = React.useState(false)
  const [isError, setError] = React.useState(' ')

  const registerForPushNotificationsAsync = async () => {
    setLoading(true)
    //
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!')
        setLoading(false)

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

        return
      }
    } else {
      alert('Must use physical device for Push Notifications')
      setLoading(false)
      return
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }

    //

    var token = await Notifications.getExpoPushTokenAsync()
    setPushToken(token)

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
            setShow(true)
            setLoading(false)
            return
          } else {
            setError(ErrorsStrings.ErrorOccurred)
            setLoading(false)
            return
          }
        })
        .catch((error) => {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        })
    }

    return
  }

  const notNow = async () => {
    if (isLoading) {
      return
    }
    setLoading(true)
    axios
      .post(
        URL + '/user/addnotifications',
        {
          notificationsID: 'false',
          allow: false,
        },
        {
          headers: { Authorization: store.token },
        }
      )
      .then((response) => {
        if (response.data === 'success') {
          setShow(true)
          return
        } else {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.ErrorOccurred)
        setLoading(false)
        return
      })
  }

  const NotificationDone = () => {
    setShow(false)
    navigation.navigate('NotificationSuccess')
    return
  }

  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/notificationillustration.png')} />
      </View>
      <Text style={styles.Title}>{NotificationStrings.Title}</Text>
      <Text style={styles.Slogan}>{NotificationStrings.Slogan}</Text>
      <Text style={styles.error}>{isError}</Text>

      <View style={styles.ButtonView}>
        {isLoading ? (
          <View style={styles.ButtonView}>
            <ActivityIndicator size="small" color={PrimaryColor} />
          </View>
        ) : (
          <View style={styles.ButtonView}>
            <TouchableOpacity style={styles.NotButton} onPress={debounce(() => notNow(), 200)}>
              <Text style={styles.NotButtonText}>{NotificationStrings.Not}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => registerForPushNotificationsAsync()}>
              <Text style={styles.ButtonText}>{NotificationStrings.Allow}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal animationType="fade" transparent={true} visible={isShow}>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.Title}>{NotificationStrings.Setting}</Text>
              <Text style={styles.Slogan}>{NotificationStrings.SettingSlogan}</Text>

              <TouchableOpacity
                style={styles.ModalButton}
                onPress={debounce(() => (isLoading ? null : NotificationDone()), 200)}>
                <Text style={styles.ButtonText}>{NotificationStrings.Done}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default inject('store')(observer(Notification))
