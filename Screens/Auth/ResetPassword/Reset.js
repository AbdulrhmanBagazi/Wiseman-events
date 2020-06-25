import React from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'
import InputPhone from '../../Components/PhoneInput/Phone'

function Reset({ navigation }) {
  const [data, setData] = React.useState({
    Phone: '',
  })
  const [isPhoneCheck, setPhoneCheck] = React.useState('')

  const PhoneInput = (val) => {
    setData({
      ...data,
      Phone: val,
    })
    if (val === '') {
      setPhoneCheck('')
      return
    }
    if (isNaN(val) === true && val.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (val.length > 10 || val.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (isNaN(val) === false && val.length === 10) {
      setPhoneCheck('Success')
      return
    }
    return
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 30}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo}>
              <Image style={styles.tinyLogo} source={require('../../../assets/lock.png')} />
            </View>
            <Text style={styles.Title}>{ResetPasswordString.title}</Text>
            <Text style={styles.Slogan}>{ResetPasswordString.ResetSlogan}</Text>

            <InputPhone
              placeholder={ResetPasswordString.Phone}
              style={styles.PhoneInput}
              onChangeText={(text) => PhoneInput(text)}
              keyboardType={'number-pad'}
              CheckPhone={isPhoneCheck}
            />

            <TouchableOpacity style={styles.Button} onPress={() => navigation.push('GetCode')}>
              <Text style={styles.ButtonText}>{ResetPasswordString.Continue}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Reset
