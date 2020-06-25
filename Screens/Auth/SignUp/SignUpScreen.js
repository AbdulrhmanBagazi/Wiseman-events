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
import { Register, ErrorsStrings } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'
import InputPhone from '../../Components/PhoneInput/Phone'
import { AuthContext } from '../../../Hooks/Context'
import { URL } from '../../../Config/Config'
import axios from 'axios'
import store from '../../../Config/Mobx'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  //
  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
  })
  const [isCheck, setCheck] = React.useState('')
  const [isPhoneCheck, setPhoneCheck] = React.useState('')

  const PhoneInput = (val) => {
    setData({
      ...data,
      Phone: val,
    })
    if (val === '') {
      setPhoneCheck('')
      return
    }
    if (isNaN(val) === true && val.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (val.length > 10 || val.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (isNaN(val) === false && val.length === 10) {
      setPhoneCheck('Success')
      return
    }
    return
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
    return
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
    return
  }

  //Aa123123
  const RegisterAccount = async (val) => {
    await Keyboard.dismiss()
    if (isLoading) {
      return
    }
    await setLoading(true)
    if (
      val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/) &&
      isCheck === 'Success' &&
      isPhoneCheck === 'Success'
    ) {
      axios
        .post(URL + '/user/signup', {
          phone: val.Phone,
          password: val.Password,
        })
        .then((response) => {
          if (response.data.error === 'exists') {
            setError(ErrorsStrings.MobileUsed)
            setLoading(false)
            return
          } else if (response.status === 200) {
            setError(' ')
            store.setData(response.data.user)
            store.setToken(response.data.token)
            Verify()
            return
          }
        })
        .catch((error) => {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        })
      return
    }

    await setLoading(false)
    return
  }

  // React.useEffect(() => {
  //   if (isRegister) {
  //     Verify()

  //     return
  //   }

  //   return
  // }, [isRegister])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 30}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo} />
            <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

            <Text style={styles.error}>{isError}</Text>

            <InputPhone
              placeholder={Register.Phone}
              style={styles.input}
              onChangeText={(text) => PhoneInput(text)}
              keyboardType={'number-pad'}
              CheckPhone={isPhoneCheck}
            />

            <Inputpassowrd
              placeholderpassword={Register.Password}
              passwordstyle={styles.PasswordInput}
              change={(text) => PasswordInput(text)}
              placeholder={Register.RePassword}
              style={styles.PasswordInput}
              onChangeText={(text) => RePasswordInput(text)}
              MatchString={Register.Match}
              Check={isCheck}
              PasswordValue={data.Password}
            />

            <TouchableOpacity style={styles.Button} onPress={() => RegisterAccount(data)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.ButtonText}>{Register.Continue}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.Register}>
              <Text style={styles.Member}>{Register.HaveAccount}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.RegisterText}>{Register.Log}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp
