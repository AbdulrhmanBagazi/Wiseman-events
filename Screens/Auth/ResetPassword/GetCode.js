import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from 'react-native'
import styles from './Style'
import { ResetPasswordString } from '../../../Config/Strings'
import Inputpassowrd from './Password'
import { SecondaryText } from '../../../Config/ColorPalette'

function GetCode({ navigation }) {
  const [data, setData] = React.useState({
    Code: '',
    Password: '',
    RePassword: '',
  })
  const [isMatch, setMatch] = React.useState(false)
  const Match = new Animated.Value(0)
  const MatchColor = Match.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryText, '#25AC71'],
  })

  const CodeInput = (val) => {
    setData({
      ...data,
      Code: val,
    })
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
  }

  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
    if (data.Password === val) {
      setMatch(true)
    } else {
      setMatch(false)
    }
  }

  React.useEffect(() => {
    if (isMatch === false) {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
      }).start()
    } else {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
      }).start()
    }

    return
  }, [isMatch])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <Text style={styles.TitleCode}>{ResetPasswordString.CodeTitle}</Text>
            <Text style={styles.Slogan}>{ResetPasswordString.CodeSlogan}</Text>

            <TextInput
              placeholder={ResetPasswordString.OTP}
              style={styles.input}
              onChangeText={(text) => CodeInput(text)}
            />
            <View style={styles.ResendContainer}>
              <Text style={styles.Resendmessage}>{ResetPasswordString.Resendmessage + ' '}</Text>
              <TouchableOpacity>
                <Text style={styles.ResendText}>{ResetPasswordString.Resend}</Text>
              </TouchableOpacity>
            </View>

            <Inputpassowrd
              placeholderpassword={ResetPasswordString.Password}
              passwordstyle={styles.input}
              change={(text) => PasswordInput(text)}
              placeholder={ResetPasswordString.RePassword}
              style={styles.input}
              onChangeText={(text) => RePasswordInput(text)}
              passwordlength={ResetPasswordString.Length}
            />
            <View style={styles.CheckMatch}>
              <Animated.Text style={{ color: MatchColor }}>{ResetPasswordString.Match}</Animated.Text>
            </View>

            <TouchableOpacity style={styles.Button} onPress={() => navigation.push('ResetSuccess')}>
              <Text style={styles.ButtonText}>{ResetPasswordString.Resetbutton}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default GetCode
