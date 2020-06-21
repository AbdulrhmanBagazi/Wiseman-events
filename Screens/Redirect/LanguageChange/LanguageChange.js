import React from 'react'
import { View, I18nManager, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Restart } from 'fiction-expo-restart'
import { LanguageStore } from '../../../Config/AsyncStorage'
import { LanguageChangeStrings } from '../../../Config/Strings'
import styles from './Style'
import AnimatedButton from './AnimatedButton'

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
    <View style={styles.container}>
      <Text style={styles.PageTitle}>{LanguageChangeStrings.Select}</Text>
      <AnimatedButton />
      <TouchableOpacity style={styles.Button} onPress={() => LanguageChangeHandler(store.SelectLanguage)}>
        <Text style={styles.ButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(LanguageChange))
