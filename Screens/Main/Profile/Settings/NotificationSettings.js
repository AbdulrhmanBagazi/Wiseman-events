import React from 'react'
import { View, Text, ScrollView, Switch, Modal, I18nManager, ActivityIndicator, Alert } from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { URL } from '../../../../Config/Config'
import { PrimaryColor } from '../../../../Config/ColorPalette'

function NotificationSettings({ store }) {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [isEnabledTwo, setIsEnabledTwo] = React.useState(false)
  const [isShow, setShow] = React.useState(false)
  const toggleSwitch = async () => {
    await setIsEnabled((previousState) => !previousState)
    setShow(true)
    axios
      .post(
        URL + '/user/updatenotifications',
        {
          allow: !isEnabled,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        // console.log(response.data)
        if (response.status === 200) {
          if (response.data === 'success') {
            if (store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            } else if (!store.data.notification.allow) {
              store.data.notification.allow = !isEnabled
            }
            setTimeout(() => {
              setShow(false)
            }, 2000)
            return
          } else if (response.data === 'fail') {
            setIsEnabled((previousState) => !previousState)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          } else {
            setIsEnabled((previousState) => !previousState)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setIsEnabled((previousState) => !previousState)

        Alert.alert(
          '',
          I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
          [{ text: 'OK', onPress: () => setShow(false) }],
          {
            cancelable: false,
          }
        )
        return
      })
  }

  const toggleSwitchTwo = async () => {
    await setIsEnabledTwo((previousState) => !previousState)
    setShow(true)
    axios
      .post(
        URL + '/user/updatenotificationsAlert',
        {
          alerts: !isEnabledTwo,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        // console.log(response.data)
        if (response.status === 200) {
          if (response.data === 'success') {
            if (store.data.notification.alerts) {
              store.data.notification.alerts = !isEnabledTwo
            } else if (!store.data.notification.alerts) {
              store.data.notification.alerts = !isEnabledTwo
            }
            setTimeout(() => {
              setShow(false)
            }, 2000)
            return
          } else if (response.data === 'fail') {
            setIsEnabledTwo((previousState) => !previousState)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          } else {
            setIsEnabledTwo((previousState) => !previousState)

            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setShow(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setIsEnabledTwo((previousState) => !previousState)

        Alert.alert(
          '',
          I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
          [{ text: 'OK', onPress: () => setShow(false) }],
          {
            cancelable: false,
          }
        )
        return
      })
  }

  React.useEffect(() => {
    if (store.data.notification) {
      setIsEnabled(store.data.notification.allow)
      setIsEnabledTwo(store.data.notification.alerts)
    }
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.about}>
        <View style={styles.aboutE}></View>
        <View style={styles.aboutB}>
          <View style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{I18nManager.isRTL ? 'إشعارات' : 'Notification'}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Switch
                trackColor={{ false: '#767577', true: '#AF0029' }}
                thumbColor={isEnabled ? '#FEF3F6' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.aboutButton}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={styles.leftText}>{I18nManager.isRTL ? 'التنبيهات' : 'Alerts'}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Switch
                trackColor={{ false: '#767577', true: '#AF0029' }}
                thumbColor={isEnabledTwo ? '#FEF3F6' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchTwo}
                value={isEnabledTwo}
              />
            </View>
          </View>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default inject('store')(observer(NotificationSettings))
