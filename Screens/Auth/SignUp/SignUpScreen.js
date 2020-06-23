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
import { Register } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'
import InputPhone from '../../Components/PhoneInput/Phone'
import { AuthContext } from '../../../Hooks/Context'
import { URL } from '../../../Config/Config'
import axios from 'axios'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isRegister, setRegister] = React.useState(false)
  const [isError, setError] = React.useState('')
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

  const RegisterAccount = async (val) => {
    if (val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/)) {
      console.log(true)

      return
    }

    // axios
    //   .post(URL + '/user/signin', {
    //     phone: val.Phone,
    //     password: val.Password,
    //   })
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
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
      keyboardVerticalOffset={90}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo} />
            <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

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
              <Text style={styles.ButtonText}>{Register.Continue}</Text>
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
