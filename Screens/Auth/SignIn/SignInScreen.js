import React from 'react'
import { I18nManager, AsyncStorage, View, TextInput, Button, Text } from 'react-native'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import { Restart } from 'fiction-expo-restart'

//Strings
import { SignUpStrings } from '../../../Config/Strings'
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

  const changeLangAr = async () => {
    I18nManager.allowRTL(true)
    I18nManager.forceRTL(true)
    await AsyncStorage.setItem('@Wiseman-events:Language', 'ar')
    Restart()
  }

  const changeLangEn = async () => {
    I18nManager.allowRTL(false)
    I18nManager.forceRTL(false)
    await AsyncStorage.setItem('@Wiseman-events:Language', 'en')
    Restart()
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
        <Text>{SignUpStrings.one}</Text>
        <Text>{SignUpStrings.two}</Text>
      </View>

      <Button title={SignUpStrings.login} onPress={() => signIn()}></Button>
      <Button title="SignUp" onPress={() => navigation.push('SignUp')}></Button>

      <Button title="عربي" onPress={() => changeLangAr()}></Button>
      <Button title="English" onPress={() => changeLangEn()}></Button>
    </View>
  )
}

export default inject('store')(observer(SignIn))
