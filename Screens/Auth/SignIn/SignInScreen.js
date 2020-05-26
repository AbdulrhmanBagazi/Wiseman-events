import React from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'

//Strings
import { SignInStrings } from '../../../Config/Strings'
//ColorPalette
import { BackgroundColor } from '../../../Config/ColorPalette'
//Layout
import { width, height } from '../../../Config/Layout'

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
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BackgroundColor }}>
      <TextInput
        style={{ height: 40, width, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => UserNameInput(text)}
      />
      <TextInput
        style={{ height: 40, width, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => PasswordInput(text)}
      />

      <View style={{ justifyContent: 'space-around', width: 300, flexDirection: 'row' }}>
        <Text>{SignInStrings.one}</Text>
        <Text>{SignInStrings.two}</Text>
      </View>

      <Button title={SignInStrings.login} onPress={() => signIn()}></Button>
      <Button title={SignInStrings.register} onPress={() => navigation.push('SignUp')}></Button>
      <Button title={SignInStrings.Language} onPress={() => navigation.push('Language')}></Button>
    </View>
  )
}

export default inject('store')(observer(SignIn))
