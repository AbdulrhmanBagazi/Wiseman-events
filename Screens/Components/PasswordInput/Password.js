import React from 'react'
import { TouchableOpacity, Animated, View, Keyboard, TextInput, Text, I18nManager } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './Style'
import { LightText } from '../../../Config/ColorPalette'

const Icon = Animated.createAnimatedComponent(Feather)

function AnimatedIcon(props) {
  const [isHide, setHide] = React.useState(true)
  const [isHideRe, setHideRe] = React.useState(true)
  const [Match] = React.useState(new Animated.Value(0))
  //
  const [MatchLength] = React.useState(new Animated.Value(0))
  const [MatchUpper] = React.useState(new Animated.Value(0))
  const [MatchLower] = React.useState(new Animated.Value(0))
  const [MatchNumber] = React.useState(new Animated.Value(0))

  const MatchColor = Match.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })
  const MatchLengthColor = MatchLength.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })
  const MatchUpperColor = MatchUpper.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })
  const MatchLowerColor = MatchLower.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })
  const MatchNumberColor = MatchNumber.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })

  const toggleHide = async (value) => {
    setHide(value === false ? true : false)
  }

  const toggleHideRe = async (value) => {
    setHideRe(value === false ? true : false)
  }

  React.useEffect(() => {
    if (props.PasswordValue.match(/[a-z]/g)) {
      Animated.timing(MatchLower, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(MatchLower, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (props.PasswordValue.match(/[A-Z]/g)) {
      Animated.timing(MatchUpper, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(MatchUpper, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (props.PasswordValue.match(/[0-9]/g)) {
      Animated.timing(MatchNumber, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(MatchNumber, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (props.PasswordValue.length >= 6) {
      Animated.timing(MatchLength, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(MatchLength, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (props.Check === 'Success') {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
      }).start()
    } else if (props.Check === 'Error') {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
      }).start()
    }
  }, [props.Check, props.PasswordValue])

  return (
    <View>
      <View>
        <TextInput
          placeholder={props.placeholderpassword}
          style={props.passwordstyle}
          onChangeText={props.change}
          secureTextEntry={isHide}
        />
        <TouchableOpacity style={styles.HidePassword} onPress={() => toggleHide(isHide)}>
          <Icon name={isHide === false ? 'eye' : 'eye-off'} size={24} color={LightText} />
        </TouchableOpacity>
      </View>
      <View style={styles.CheckMatch}>
        {I18nManager.isRTL ? (
          <Text style={[styles.Resendmessage, { textAlign: 'left' }]}>
            <Text>يجب ان تتكون كلمة المرور من</Text>{' '}
            <Animated.Text style={{ color: MatchLengthColor }}>٦ آحرف آو آكثر</Animated.Text>{' '}
            <Text> وتحتوي على آحرف</Text>{' '}
            <Animated.Text style={{ color: MatchUpperColor }}>كبيرة</Animated.Text> و
            <Animated.Text style={{ color: MatchLowerColor }}>صغيرة</Animated.Text> و{' '}
            <Animated.Text style={{ color: MatchNumberColor }}>رقم</Animated.Text>.
          </Text>
        ) : (
          <Text style={styles.Resendmessage}>
            Your password must be{' '}
            <Animated.Text style={{ color: MatchLengthColor }}>6 or more characters</Animated.Text> long,
            contain both <Animated.Text style={{ color: MatchUpperColor }}>uppercase</Animated.Text> and{' '}
            <Animated.Text style={{ color: MatchLowerColor }}>lowercase</Animated.Text> letter &{' '}
            <Animated.Text style={{ color: MatchNumberColor }}>number</Animated.Text>.
          </Text>
        )}
      </View>
      <View>
        <TextInput {...props} secureTextEntry={isHideRe} textContentType="password" />
        <TouchableOpacity style={styles.HidePassword} onPress={() => toggleHideRe(isHideRe)}>
          <Icon name={isHideRe === false ? 'eye' : 'eye-off'} size={24} color={LightText} />
        </TouchableOpacity>
      </View>
      <View style={styles.CheckMatch}>
        <Animated.Text style={{ color: MatchColor }}>{props.MatchString}</Animated.Text>
      </View>
    </View>
  )
}

export default AnimatedIcon
