import React from 'react'
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import styles from './Style'
import { Register } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'
import { AuthContext } from '../../../Hooks/Context'
import axios from 'axios'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isRegister, setRegister] = React.useState(false)
  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
  })
  const [Check, setCheck] = React.useState('')
  const PhoneInput = (val) => {
    setData({
      ...data,
      Phone: val,
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

  const RegisterAccount = async (val) => {
    console.log(val)
    console.log(isNaN(val.Phone))
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

            <TextInput
              placeholder={Register.Phone}
              style={styles.input}
              onChangeText={(text) => PhoneInput(text)}
              keyboardType={'number-pad'}
            />

            <Inputpassowrd
              placeholderpassword={Register.Password}
              passwordstyle={styles.input}
              change={(text) => PasswordInput(text)}
              placeholder={Register.RePassword}
              style={styles.input}
              onChangeText={(text) => RePasswordInput(text)}
              MatchString={Register.Match}
              Check={Check}
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
