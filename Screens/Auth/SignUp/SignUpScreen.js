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
import { Register } from '../../../Config/Strings'
import Inputpassowrd from './Password'
import { AuthContext } from '../../../Hooks/Context'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isRegister, setRegister] = React.useState(false)
  const [Match] = React.useState(new Animated.Value(0))
  const MatchColor = Match.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })

  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
  })

  const PhoneInput = (val) => {
    setData({
      ...data,
      Phone: val,
    })
  }
  const Animate = async (val) => {
    if (val === false) {
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
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
    if (data.RePassword === val) {
      Animate(true)
    } else {
      Animate(false)
    }
  }

  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
    if (data.Password === val) {
      Animate(true)
    } else {
      Animate(false)
    }
  }

  React.useEffect(() => {
    if (isRegister) {
      Verify()

      return
    }

    return
  }, [isRegister])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo} />
            <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

            <TextInput
              placeholder={Register.Phone}
              style={styles.input}
              onChangeText={(text) => PhoneInput(text)}
            />

            <Inputpassowrd
              placeholderpassword={Register.Password}
              passwordstyle={styles.input}
              change={(text) => PasswordInput(text)}
              placeholder={Register.RePassword}
              style={styles.input}
              onChangeText={(text) => RePasswordInput(text)}
            />
            <View style={styles.CheckMatch}>
              <Animated.Text style={{ color: MatchColor }}>{Register.Match}</Animated.Text>
            </View>

            <TouchableOpacity style={styles.Button} onPress={() => setRegister(true)}>
              <Text style={styles.ButtonText}>{Register.Continue}</Text>
            </TouchableOpacity>

            <View style={styles.Register}>
              <Text style={styles.Member}>{Register.HaveAccount}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.RegisterText}>{Register.Log}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp
