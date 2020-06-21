import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'

function ResetSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Title}>{ResetPasswordString.ResetSuccessful}</Text>
      <Text style={styles.Slogan}>{ResetPasswordString.ResetSuccessfulSlogan}</Text>

      <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.ButtonText}>{ResetPasswordString.Log}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ResetSuccess
