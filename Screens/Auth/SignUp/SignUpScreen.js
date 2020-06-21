import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Style'
import { Register } from '../../../Config/Strings'
import Inputpassowrd from './Password'
import { AuthContext } from '../../../Hooks/Context'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isRegister, setRegister] = React.useState(false)

  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
  })

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
  }

  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
  }

  React.useEffect(() => {
    if (isRegister) {
      Verify()

      return
    }

    return
  }, [isRegister])

  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

      <TextInput
        placeholder={Register.Phone}
        style={styles.input}
        onChangeText={(text) => PhoneInput(text)}
      />

      <Inputpassowrd
        placeholderpassword={Register.Password}
        passwordstyle={styles.input}
        change={(text) => PasswordInput(text)}
        placeholder={Register.RePassword}
        style={styles.input}
        onChangeText={(text) => RePasswordInput(text)}
      />

      <TouchableOpacity style={styles.Button} onPress={() => setRegister(true)}>
        <Text style={styles.ButtonText}>{Register.Continue}</Text>
      </TouchableOpacity>

      <View style={styles.Register}>
        <Text style={styles.Member}>{Register.HaveAccount}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.RegisterText}>{Register.Log}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp
