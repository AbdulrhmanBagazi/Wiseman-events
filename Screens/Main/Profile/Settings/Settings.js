import React from 'react'
import { View, Text, ScrollView, Switch, TouchableOpacity, I18nManager, Image } from 'react-native'
import styles from './Style'
import { SettingsPageStrings } from '../../../../Config/Strings'
import { Entypo } from '@expo/vector-icons'

function Settings({ navigation }) {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <ScrollView>
      <View style={styles.about}>
        <View style={styles.aboutE}></View>
        <View style={styles.aboutB}>
          <View style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Notifications}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#AF0029' }}
                  thumbColor={isEnabled ? '#FEF3F6' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.PrivacyPolicy}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Terms}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => navigation.navigate('LanguageSettings')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Language}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Text style={styles.rightText}>{I18nManager.isRTL ? 'عربي' : 'English'}</Text>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Rateus')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Rateus}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutButtonLog}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftTextLog}>{SettingsPageStrings.Logout}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings
