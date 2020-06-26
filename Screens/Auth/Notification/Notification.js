import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Style'
import { NotificationStrings } from '../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

function Notification({ navigation, store }) {
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
        <TouchableOpacity style={styles.Button} onPress={() => navigation.push('NotificationSuccess')}>
          <Text style={styles.ButtonText}>{NotificationStrings.Allow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default inject('store')(observer(Notification))
