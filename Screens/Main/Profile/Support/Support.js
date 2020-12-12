import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  I18nManager,
  Alert,
  ActivityIndicator,
} from 'react-native'
import styles from './Style'
import { SupportPageStrings, ErrorsStrings } from '../../../../Config/Strings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import RNPickerSelect from 'react-native-picker-select'
import { width } from '../../../../Config/Layout'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { AuthContext } from '../../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import { URL } from '../../../../Config/Config'

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: width - 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4C4F56',
    padding: 15,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '#000',
    backgroundColor: '#fff',
  },
  viewContainer: {
    width: width - 20,
    borderColor: '#000',
    // borderWidth: 1,
    // padding: 15,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    justifyContent: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
  inputAndroid: {
    color: '#000',
  },
})

function Support({ store }) {
  const { signOut } = React.useContext(AuthContext)
  const [isText, setText] = React.useState('')
  const [isShow, setShow] = React.useState(false)
  const [istype, settype] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const TPicker = I18nManager.isRTL
    ? [
        { label: 'الدفع', value: 'Pyament' },
        { label: 'الملف الشخصي', value: 'Profile' },
        { label: 'فني', value: 'Technical' },
        { label: 'آخرى', value: 'Other' },
      ]
    : [
        { label: 'Pyament', value: 'Pyament' },
        { label: 'Profile', value: 'Profile' },
        { label: 'Technical', value: 'Technical' },
        { label: 'Other', value: 'Other' },
      ]

  const RequestSupport = async () => {
    setLoading(true)
    if (istype.length < 1 || isText.length < 1) {
      Alert.alert('', ErrorsStrings.Required, [{ text: 'OK', onPress: () => setLoading(false) }], {
        cancelable: false,
      })
      return
    } else {
      axios
        .post(
          URL + '/user/SupportTicket',
          {
            Type: istype,
            MSG: isText,
          },
          {
            headers: { Authorization: store.token },
          }
        )
        .then((response) => {
          if (response.data.check === 'success') {
            setLoading(false)

            setTimeout(() => {
              setShow(true)
            }, 500)

            return
          } else {
            setLoading(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        })
        .catch(async (error) => {
          if (error.response) {
            if (error.response.status) {
              if (error.response.status === 401) {
                await UserTokenRemove()

                Alert.alert(
                  '',
                  I18nManager.isRTL
                    ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                    : 'the session ended, please re-login',
                  [{ text: 'OK', onPress: () => signOut() }],
                  {
                    cancelable: false,
                  }
                )

                return
              } else {
                Alert.alert(
                  '',
                  I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                  [{ text: 'OK', onPress: () => setLoading(false) }],
                  {
                    cancelable: false,
                  }
                )
                return
              }
            }
          } else {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        })
    }
  }

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <Text style={styles.Title}>{SupportPageStrings.Title}</Text>
        {/* <Text style={styles.About}>{SupportPageStrings.About}</Text> */}

        <RNPickerSelect
          onValueChange={(text) => settype(text)}
          style={{
            ...pickerSelectStyles,
          }}
          placeholder={{
            label: I18nManager.isRTL ? 'المشكلة' : 'issue',
            value: '',
          }}
          items={TPicker}
          Icon={() => null}
          value={istype}
        />

        <Text style={styles.Message}>{SupportPageStrings.Message}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={200}
          editable
          style={styles.TextInput}
          placeholder={SupportPageStrings.PlaceHolder}
          onChangeText={(text) => setText(text)}
          value={isText}
        />
        <TouchableOpacity style={styles.Button} onPress={() => RequestSupport(true)}>
          <Text style={styles.ButtonText}>{SupportPageStrings.Send}</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={isShow}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.Logo}>
              <Image style={styles.tinyLogo} source={require('../../../../assets/supportIcon.png')} />
            </View>
            <Text style={styles.Slogan}>{SupportPageStrings.ModalAbout}</Text>

            <TouchableOpacity style={styles.ModalButton} onPress={() => setShow(false)}>
              <Text style={styles.ButtonText}>{SupportPageStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  )
}

export default inject('store')(observer(Support))
