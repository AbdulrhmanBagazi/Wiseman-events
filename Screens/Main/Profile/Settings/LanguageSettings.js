import React from 'react'
import { View, Text, ScrollView, Animated, TouchableOpacity, I18nManager, Modal } from 'react-native'
import styles from './Style'
import { Entypo } from '@expo/vector-icons'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { Restart } from 'fiction-expo-restart'
import { LanguageStore } from '../../../../Config/AsyncStorage'

function LanguageSettings({ navigation }) {
  const [AR] = React.useState(new Animated.Value(I18nManager.isRTL ? 100 : 0))
  const [EN] = React.useState(new Animated.Value(I18nManager.isRTL ? 0 : 100))
  const [isLanguage, setLanguage] = React.useState(I18nManager.isRTL ? 'ar' : 'en')
  const [isShow, setShow] = React.useState(false)

  const ArColor = AR.interpolate({
    inputRange: [0, 100],
    outputRange: ['#F8F8F9', PrimaryColor],
  })
  const EnColor = EN.interpolate({
    inputRange: [0, 100],
    outputRange: ['#F8F8F9', PrimaryColor],
  })

  const Select = async (val) => {
    Animated.parallel([
      Animated.timing(AR, {
        toValue: val === 'ar' ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(EN, {
        toValue: val === 'en' ? 100 : 0,
        duration: 500,
      }),
    ]).start()

    setLanguage(val)
  }

  const LanguageChangeHandler = async (val) => {
    if (val === 'ar' && !I18nManager.isRTL) {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(true)
      await LanguageStore(val)
      setShow(false)
      Restart()
      return
    } else if (val === 'en' && I18nManager.isRTL) {
      I18nManager.allowRTL(false)
      I18nManager.forceRTL(false)
      await LanguageStore(val)
      Restart()
      return
    } else {
      setShow(false)

      navigation.goBack()
      return
    }
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.about}>
          <View style={styles.aboutE}>
            <Text style={styles.aboutT}>{I18nManager.isRTL ? 'اختيار اللغة' : 'Select Language'}</Text>
          </View>
          <View style={styles.aboutB}>
            <TouchableOpacity style={styles.aboutButton} onPress={() => Select('ar')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{I18nManager.isRTL ? 'عربي' : 'Arabic'}</Text>
              </View>
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  padding: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  backgroundColor: ArColor,
                }}>
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => Select('en')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{I18nManager.isRTL ? 'انجليزي' : 'English'}</Text>
              </View>
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  padding: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  backgroundColor: EnColor,
                }}>
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Modal animationType="fade" transparent={true} visible={isShow}>
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
                <View style={styles.warning}>
                  <Entypo name="warning" size={50} color="#E8505B" />
                  <Text style={{ marginVertical: 10, color: '#E8505B', fontSize: 16, fontWeight: '600' }}>
                    {isLanguage === 'ar'
                      ? 'يتطلب تغيير اللغة إعادة تشغيل التطبيق'
                      : 'Language change requires the app to restart'}
                  </Text>

                  <View style={styles.ButtonViewModal}>
                    <TouchableOpacity style={styles.NotButton} onPress={() => setShow(false)}>
                      <Text style={styles.NotButtonText}>{isLanguage === 'ar' ? 'إلغاء' : 'Cancel'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ButtonModal}
                      onPress={() => LanguageChangeHandler(isLanguage)}>
                      <Text style={styles.ButtonTextModal}>{isLanguage === 'ar' ? 'حسنا' : 'Ok'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={styles.ButtonView}>
        <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
          <Text style={styles.ButtonText}> {isLanguage === 'ar' ? 'حفظ' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LanguageSettings
