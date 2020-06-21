import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'

function Reset({ navigation }) {
  const [data, setData] = React.useState({
    Phone: '',
  })

  const PhoneInput = (val) => {
    setData({
      ...data,
      Phone: val,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Title}>{ResetPasswordString.title}</Text>
      <Text style={styles.Slogan}>{ResetPasswordString.ResetSlogan}</Text>

      <TextInput
        placeholder={ResetPasswordString.Phone}
        style={styles.input}
        onChangeText={(text) => PhoneInput(text)}
      />

      <TouchableOpacity style={styles.Button} onPress={() => navigation.push('GetCode')}>
        <Text style={styles.ButtonText}>{ResetPasswordString.Continue}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Reset
