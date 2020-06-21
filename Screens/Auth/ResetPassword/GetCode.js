import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'
import Inputpassowrd from '../SignUp/Password'

function GetCode({ navigation }) {
  const [data, setData] = React.useState({
    Code: '',
    Password: '',
    RePassword: '',
  })

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
  }

  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
  }

  return (
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
      />

      <TouchableOpacity style={styles.Button} onPress={() => navigation.push('ResetSuccess')}>
        <Text style={styles.ButtonText}>{ResetPasswordString.Resetbutton}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GetCode
