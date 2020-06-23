import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'

function GetCode({ navigation }) {
  const [data, setData] = React.useState({
    Code: '',
    Password: '',
    RePassword: '',
  })
  const [Check, setCheck] = React.useState('')

  const CodeInput = (val) => {
    setData({
      ...data,
      Code: val,
    })
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
    if (val === '') {
      setCheck('')
    } else if (data.RePassword === val) {
      setCheck('Success')
    } else {
      setCheck('Error')
    }
  }

  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
    if (val === '') {
      setCheck('')
    }
    if (data.Password === val) {
      setCheck('Success')
    } else {
      setCheck('Error')
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <Text style={styles.TitleCode}>{ResetPasswordString.CodeTitle}</Text>
            <Text style={styles.Slogan}>{ResetPasswordString.CodeSlogan}</Text>

            <TextInput
              placeholder={ResetPasswordString.OTP}
              style={styles.input}
              onChangeText={(text) => CodeInput(text)}
            />
            <View style={styles.ResendContainer}>
              <Text style={styles.Resendmessage}>{ResetPasswordString.Resendmessage + ' '}</Text>
              <TouchableOpacity>
                <Text style={styles.ResendText}>{ResetPasswordString.Resend}</Text>
              </TouchableOpacity>
            </View>

            <Inputpassowrd
              placeholderpassword={ResetPasswordString.Password}
              passwordstyle={styles.input}
              change={(text) => PasswordInput(text)}
              placeholder={ResetPasswordString.RePassword}
              style={styles.input}
              onChangeText={(text) => RePasswordInput(text)}
              passwordlength={ResetPasswordString.Length}
              MatchString={ResetPasswordString.Match}
              Check={Check}
            />

            <TouchableOpacity style={styles.Button} onPress={() => navigation.push('ResetSuccess')}>
              <Text style={styles.ButtonText}>{ResetPasswordString.Resetbutton}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default GetCode
