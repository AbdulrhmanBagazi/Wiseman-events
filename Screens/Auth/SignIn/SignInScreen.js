import React from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import styles from './Style'
//Strings
import { SignInStrings } from '../../../Config/Strings'

function SignIn({ navigation, store }) {
  const { signIn } = React.useContext(AuthContext)
  const [data, setData] = React.useState({
    UserName: '',
    Password: '',
  })

  const UserNameInput = (val) => {
    setData({
      ...data,
      UserName: val,
    })
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={(text) => UserNameInput(text)} />
      <TextInput style={styles.input} onChangeText={(text) => PasswordInput(text)} />

      <Button title={SignInStrings.login} onPress={() => signIn()}></Button>
      <Button title={SignInStrings.register} onPress={() => navigation.push('SignUp')}></Button>
      <Button title={SignInStrings.Language} onPress={() => navigation.push('Language')}></Button>
    </View>
  )
}

export default inject('store')(observer(SignIn))
