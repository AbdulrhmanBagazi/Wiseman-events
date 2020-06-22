import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Style'
import { OTPStrings } from '../../../Config/Strings'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { width } from '../../../Config/Layout'
import { AuthContext } from '../../../Hooks/Context'

function OTP() {
  const { Profile } = React.useContext(AuthContext)
  const [isVerify, setVerify] = React.useState(false)

  React.useEffect(() => {
    if (isVerify) {
      Profile()
      return
    }

    return
  }, [isVerify])

  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Title}>{OTPStrings.Title}</Text>
      <Text style={styles.Slogan}>{OTPStrings.Slogan}</Text>

      <View>
        <OTPInputView
          pinCount={4}
          style={{ width: width / 1.5, height: 100 }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          autoFocusOnLoad={false}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => setVerify(true)}>
        <Text style={styles.ButtonText}>{OTPStrings.Verify}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OTP
