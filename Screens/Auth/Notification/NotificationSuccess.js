import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Style'
import { NotificationStrings } from '../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../../Hooks/Context'
import debounce from 'lodash/debounce'

function NotificationSuccess() {
  const { Load } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/successillustration.png')} />
      </View>
      <Text style={styles.Title}>{NotificationStrings.Congrats}</Text>
      <Text style={styles.Slogan}>{NotificationStrings.CongratsSlogan}</Text>

      <TouchableOpacity style={styles.StartedButton} onPress={debounce(() => Load(), 200)}>
        <Text style={styles.ButtonText}>{NotificationStrings.Started}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(NotificationSuccess))
