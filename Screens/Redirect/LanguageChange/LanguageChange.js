import React from 'react'
import { View, I18nManager, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Restart } from 'fiction-expo-restart'
import { LanguageStore } from '../../../Config/AsyncStorage'
import { LanguageChangeStrings } from '../../../Config/Strings'
import styles from './Style'
import AnimatedButton from './AnimatedButton'

LanguageChange = ({ store }) => {
  const [isLanguage, setLanguage] = React.useState('')

  const ChangeLanguage = async (val) => {
    setLanguage(val)
  }

  const LanguageChangeHandler = async (val) => {
    if (val === 'ar') {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(true)
      await LanguageStore(val)
      Restart()
      return
    } else if (val === 'en') {
      I18nManager.allowRTL(false)
      I18nManager.forceRTL(false)
      await LanguageStore(val)
      Restart()
      return
    } else {
      return
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.PageTitle}>{LanguageChangeStrings.Select}</Text>
      <AnimatedButton
        Language={isLanguage}
        onPressArabic={() => ChangeLanguage('ar')}
        onPressEnglish={() => ChangeLanguage('en')}
      />
      <TouchableOpacity style={styles.Button} onPress={() => LanguageChangeHandler(isLanguage)}>
        <Text style={styles.ButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(LanguageChange))
