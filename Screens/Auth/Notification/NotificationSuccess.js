import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Style'
import { NotificationStrings } from '../../../Config/Strings'

function NotificationSuccess() {
  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/successillustration.png')} />
      </View>
      <Text style={styles.Title}>{NotificationStrings.Congrats}</Text>
      <Text style={styles.Slogan}>{NotificationStrings.CongratsSlogan}</Text>

      <TouchableOpacity style={styles.StartedButton}>
        <Text style={styles.ButtonText}>{NotificationStrings.Started}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationSuccess
