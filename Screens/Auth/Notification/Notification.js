import * as Permissions from 'expo-permissions'
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Style'
import { NotificationStrings } from '../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { Notifications } from 'expo'

function Notification({ navigation, store }) {
  const [PushToken, setPushToken] = React.useState('')

  const registerForPushNotificationsAsync = async () => {
    console.log(1)
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    var token = await Notifications.getExpoPushTokenAsync()
    setPushToken(token)

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
    console.log(PushToken)
    return
  }

  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/notificationillustration.png')} />
      </View>
      <Text style={styles.Title}>{NotificationStrings.Title}</Text>
      <Text style={styles.Slogan}>{NotificationStrings.Slogan}</Text>

      <View style={styles.ButtonView}>
        <TouchableOpacity style={styles.NotButton}>
          <Text style={styles.NotButtonText}>{NotificationStrings.Not}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => registerForPushNotificationsAsync()}>
          <Text style={styles.ButtonText}>{NotificationStrings.Allow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default inject('store')(observer(Notification))
