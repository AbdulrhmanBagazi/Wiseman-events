import React from 'react'
import { View, Button, I18nManager, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Restart } from 'fiction-expo-restart'
import LanguageAsyncStorage from '../../Hooks/AsyncStorage'

function LanguageChange({ navigation, store }) {
  const LanguageChangeHandler = async (Language) => {
    if (Language === 'ar' && store.Language !== 'ar') {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(true)
      LanguageAsyncStorage(Language)
      Restart()
    } else if (Language === 'en' && store.Language !== 'en') {
      I18nManager.allowRTL(false)
      I18nManager.forceRTL(false)
      LanguageAsyncStorage(Language)
      Restart()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="عربي" onPress={() => LanguageChangeHandler('ar')}></Button>
      <Button title="English" onPress={() => LanguageChangeHandler('en')}></Button>
      <Text>{store.Language}</Text>
    </View>
  )
}

export default inject('store')(observer(LanguageChange))
