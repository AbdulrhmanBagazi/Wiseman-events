import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import styles from './Style'
import { SignInStrings, ErrorsStrings } from '../../../Config/Strings'
import AnimatedIcon from './HidePassword'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import InputPhone from '../../Components/PhoneInput/Phone'
import debounce from 'lodash/debounce'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

function SignIn({ navigation, store }) {
  const { signIn } = React.useContext(AuthContext)
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  const [isPhoneCheck, setPhoneCheck] = React.useState('')

  const [data, setData] = React.useState({
    UserName: '',
    Password: '', //Aa123123
  })

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632
    })
  }

  const PhoneInput = async (val) => {
    var phone = await convertToArabicNumber(val)
    setData({
      ...data,
      UserName: phone.trim(),
    })
    if (phone === '') {
      setPhoneCheck('')
      return
    }
    if (isNaN(phone) === true && phone.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (phone.length > 10 || phone.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (isNaN(phone) === false && phone.length === 10) {
      setPhoneCheck('Success')
      return
    }
    return
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val.trim(),
    })
  }

  const Login = async (val) => {
    await Keyboard.dismiss()

    setLoading(true)
    setError(' ')

    if (isPhoneCheck !== 'Success' || data.Password.length < 1) {
      setLoading(false)
      setError(ErrorsStrings.Required)
      return
    }

    axios
      .post(URL + '/user/signin', {
        phone: val.UserName,
        password: val.Password,
      })
      .then(async (response) => {
        if (response.status === 200) {
          await store.setData(response.data)
          await store.setToken(response.data.token)

          setTimeout(() => {
            setLoading(false)
            signIn()
          }, 1000)

          return
        }
      })
      .catch((error) => {
        // console.log(error)
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              setError(ErrorsStrings.LoginError)
              setLoading(false)
              return
            } else {
              setError(ErrorsStrings.ErrorOccurred)
              setLoading(false)
              return
            }
          }
        } else {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        }
      })
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.Logo}></View>
        <Text style={styles.Title}>Welcome to App</Text>
        <Text style={styles.Slogan}>
          It's great opportunity to work on part time job and earn extra money
        </Text>

        <Text style={styles.error}>{isError}</Text>

        <InputPhone
          placeholder={SignInStrings.Phone}
          style={styles.inputPhone}
          onChangeText={(text) => PhoneInput(text)}
          keyboardType={'number-pad'}
          CheckPhone={isPhoneCheck}
        />
        <AnimatedIcon
          placeholder={SignInStrings.Password}
          style={styles.inputPassword}
          onChangeText={(text) => PasswordInput(text)}
        />

        <View style={styles.ForgotContainer}>
          <TouchableOpacity onPress={() => (!isLoading ? navigation.navigate('Reset') : null)}>
            <Text style={styles.ForgotText}>{SignInStrings.Forgot}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(() => (!isLoading ? Login(data) : null), 200)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{SignInStrings.Login}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.Register}>
          <Text style={styles.Member}>{SignInStrings.Member}</Text>
          <TouchableOpacity onPress={() => (!isLoading ? navigation.navigate('SignUp') : null)}>
            <Text style={styles.RegisterText}>{SignInStrings.Register}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.Terms}>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text>{SignInStrings.Terms}</Text>
        </TouchableOpacity>
        <Text style={styles.and}> & </Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text>{SignInStrings.Privacy}</Text>
        </TouchableOpacity>
      </View> */}
    </KeyboardAwareScrollView>
  )
}

export default inject('store')(observer(SignIn))
