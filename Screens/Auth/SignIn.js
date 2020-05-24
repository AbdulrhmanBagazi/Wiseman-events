import React from 'react'
import { I18nManager, AsyncStorage, View, TextInput, Button, Text } from 'react-native'
import { AuthContext } from '../../Hooks/Context'

import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { Restart } from 'fiction-expo-restart'

// const getLanguage = async () => {
//   var Language = await AsyncStorage.getItem('@Wiseman-events:Language')

//   if (Language === null) {
//     return 'ar'
//   } else {
//     return Language
//   }
// }

i18n.fallbacks = true
i18n.translations = {
  en: { SignIn: 'SignIn', one: '1', two: '2', SignUp: 'SignUp' },
  ar: { SignIn: 'تسجيل دخول', one: '١', two: '٢', SignUp: 'إنشاء حساب' },
}

function SignIn({ navigation }) {
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
    I18nManager.forceRTL(true)
    await AsyncStorage.setItem('@Wiseman-events:Language', 'ar')
    Restart()
  }

  const changeLangEn = async () => {
    I18nManager.forceRTL(false)
    await AsyncStorage.setItem('@Wiseman-events:Language', 'en')
    Restart()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => UserNameInput(text)}
      />
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => PasswordInput(text)}
      />

      <View style={{ justifyContent: 'space-around', width: 300, flexDirection: 'row' }}>
        <Text>{i18n.t('one')}</Text>
        <Text>{i18n.t('two')}</Text>
      </View>

      <Button title={i18n.t('SignIn')} onPress={() => signIn()}></Button>
      <Button title="SignUp" onPress={() => navigation.push('SignUp')}></Button>

      <Button title="عربي" onPress={() => changeLangAr()}></Button>
      <Button title="English" onPress={() => changeLangEn()}></Button>
    </View>
  )
}

export default SignIn
