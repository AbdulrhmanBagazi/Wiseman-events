import React from 'react'
import { View, Button, I18nManager, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Restart } from 'fiction-expo-restart'
import { LanguageStore } from '../../Config/AsyncStorage'

LanguageChange = ({ navigation, store }) => {
  const LanguageChangeHandler = async (Language) => {
    if (Language === 'ar' && store.Language !== 'ar') {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(true)
      await LanguageStore(Language)
      Restart()
    } else if (Language === 'en' && store.Language !== 'en') {
      I18nManager.allowRTL(false)
      I18nManager.forceRTL(false)
      await LanguageStore(Language)
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
