import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import styles from './Style'
import { ResetPasswordString, ErrorsStrings } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'
import axios from 'axios'
import debounce from 'lodash/debounce'
import { URL } from '../../../Config/Config'
import { UserPhoneOTPGet } from '../../../Config/AsyncStorage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

function GetCode({ navigation }) {
  const [data, setData] = React.useState({
    Code: '',
    Password: '', //Aa123123 Aa123122
    RePassword: '',
  })
  const [isCheck, setCheck] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632
    })
  }

  const CodeInput = async (val) => {
    var Code = await convertToArabicNumber(val)
    setData({
      ...data,
      Code: Code,
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

  const ResetPassword = async (val) => {
    await Keyboard.dismiss()
    var OTPphone = await UserPhoneOTPGet()
    if (isLoading) {
      return
    }
    setLoading(true)
    if (val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/) && isCheck === 'Success') {
      axios
        .post(URL + '/user/changePassword', {
          code: val.Code,
          phone: OTPphone,
          password: val.Password,
        })
        .then((response) => {
          if (response.data === 'success') {
            setLoading(false)
            navigation.push('ResetSuccess')
            return
          } else {
            setError(ErrorsStrings.WrongCode)
            setLoading(false)
            return
          }
        })
        .catch((error) => {
          setError(ErrorsStrings.WrongCodeCheck)
          setLoading(false)
          return
        })
    } else {
      setError(ErrorsStrings.Required)
      setLoading(false)
      return
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Text style={styles.TitleCode}>{ResetPasswordString.CodeTitle}</Text>
        <Text style={styles.Slogan}>{ResetPasswordString.CodeSlogan}</Text>
        <Text style={styles.error}>{isError}</Text>

        <TextInput
          placeholder={ResetPasswordString.OTP}
          style={styles.input}
          onChangeText={(text) => CodeInput(text)}
          keyboardType={'number-pad'}
        />
        {/* <View style={styles.ResendContainer}>
              <Text style={styles.Resendmessage}>{ResetPasswordString.Resendmessage + ' '}</Text>
              <TouchableOpacity>
                <Text style={styles.ResendText}>{ResetPasswordString.Resend}</Text>
              </TouchableOpacity>
            </View> */}

        <Inputpassowrd
          placeholderpassword={ResetPasswordString.Password}
          passwordstyle={styles.input}
          change={(text) => PasswordInput(text)}
          placeholder={ResetPasswordString.RePassword}
          style={styles.input}
          onChangeText={(text) => RePasswordInput(text)}
          passwordlength={ResetPasswordString.Length}
          MatchString={ResetPasswordString.Match}
          Check={isCheck}
          PasswordValue={data.Password}
        />

        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(() => (!isLoading ? ResetPassword(data) : null), 200)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{ResetPasswordString.Resetbutton}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default GetCode
