import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import styles from './Style';
import { Entypo } from '@expo/vector-icons';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import * as Updates from 'expo-updates';
import { LanguageStore } from '../../../../Config/AsyncStorage';

function LanguageSettings({ navigation }) {
  const LanguageChangeHandler = async (val) => {
    if (val === 'ar' && !I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      await LanguageStore(val);
      Updates.reloadAsync();
      return;
    } else if (val === 'en' && I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      await LanguageStore(val);
      Updates.reloadAsync();
      return;
    } else {
      navigation.goBack();
      return;
    }
  };

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.about}>
          <View style={styles.aboutE}>
            <Text style={styles.aboutT}>
              {I18nManager.isRTL ? 'اختيار اللغة' : 'Select Language'}
            </Text>
          </View>
          <View style={styles.aboutB}>
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => LanguageChangeHandler('ar')}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}
              >
                <Text style={styles.LanguageSettingsText}>العربية</Text>
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
                  borderColor: I18nManager.isRTL ? PrimaryColor : '#0E1118',
                  backgroundColor: I18nManager.isRTL ? PrimaryColor : '#F8F8F9',
                }}
              >
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => LanguageChangeHandler('en')}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}
              >
                <Text style={styles.LanguageSettingsText}>English</Text>
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
                  borderColor: I18nManager.isRTL ? '#0E1118' : PrimaryColor,
                  backgroundColor: I18nManager.isRTL ? '#F8F8F9' : PrimaryColor,
                }}
              >
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default LanguageSettings;
