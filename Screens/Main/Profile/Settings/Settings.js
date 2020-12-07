import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, I18nManager, Alert, Linking } from 'react-native'
import styles from './Style'
import { SettingsPageStrings } from '../../../../Config/Strings'
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'
import { Entypo } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
// import * as StoreReview from 'expo-store-review'

function Settings({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext)

  // const Rate = async () => {
  //   // StoreReview.requestReview()
  //   var check = await StoreReview.isAvailableAsync()

  //   console.log(check)
  //   return
  // }

  const Logout = async () => {
    await UserTokenRemove()
    signOut()

    return
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.about}>
        {/* <View style={styles.aboutE}></View> */}
        <View style={styles.aboutB}>
          <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('UpdateProfile')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.UpdateProfile}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('ChangePassword')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.ChangePassword}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => navigation.navigate('NotificationSettings')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Notifications}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => Linking.openURL('https://wisemanksa.com/')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.PrivacyPolicy}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => Linking.openURL('https://wisemanksa.com/')}>
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
          {/* <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Rateus')}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{SettingsPageStrings.Rateus}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Entypo name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={18} color="#C6C9CD" />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.aboutButtonLog}
            onPress={() =>
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'هل أنت متأكد أنك تريد تسجيل الخروج؟'
                  : 'Are you sure you want to Logout?',
                [
                  {
                    text: I18nManager.isRTL ? 'لا' : 'No',
                    style: 'cancel',
                  },
                  { text: I18nManager.isRTL ? 'نعم' : 'Yes', onPress: () => Logout() },
                ],
                { cancelable: false }
              )
            }>
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

export default inject('store')(observer(Settings))
