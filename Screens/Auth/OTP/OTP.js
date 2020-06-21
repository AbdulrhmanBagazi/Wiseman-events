import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Style'
import { OTPStrings } from '../../../Config/Strings'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { width, height } from '../../../Config/Layout'

function OTP({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Title}>{OTPStrings.Title}</Text>
      <Text style={styles.Slogan}>{OTPStrings.Slogan}</Text>

      <View>
        <OTPInputView
          pinCount={4}
          style={{ width: width / 1.5, height: 100 }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.ButtonText}>{OTPStrings.Verify}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OTP
