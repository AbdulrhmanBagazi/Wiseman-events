import React from 'react'
import { TouchableOpacity, Animated, View, TextInput, Text, I18nManager } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import styles from './Style'
import { LightText } from '../../../Config/ColorPalette'

const Icon = Animated.createAnimatedComponent(Entypo)

function AnimatedIcon(props) {
  const [isHide, setHide] = React.useState(true)
  const [isHideRe, setHideRe] = React.useState(true)

  const toggleHide = async (value) => {
    setHide(value === false ? true : false)
  }

  const toggleHideRe = async (value) => {
    setHideRe(value === false ? true : false)
  }

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
          <Icon name={isHide === false ? 'eye' : 'eye-with-line'} size={24} color={LightText} />
        </TouchableOpacity>
      </View>
      <View style={styles.CheckMatch}>
        {I18nManager.isRTL ? (
          <Text style={[styles.Resendmessage, { textAlign: 'left' }]}>
            <Text>يجب ان تتكون كلمة المرور من</Text> <Text style={{ color: '#25AC71' }}>٨ آحرف آو آكثر</Text>{' '}
            <Text>وتحتوي على</Text> <Text style={{ color: '#25AC71' }}>آحرف كبيرة و صغيرة</Text>{' '}
            <Text style={{ color: '#E8505B' }}>ورقم</Text>.
          </Text>
        ) : (
          <Text style={styles.Resendmessage}>
            Your password must be <Text style={{ color: '#25AC71' }}>8 or more characters</Text> long, contain
            both <Text style={{ color: '#25AC71' }}>uppercase</Text> and{' '}
            <Text style={{ color: '#E8505B' }}>lowercase</Text> letter &{' '}
            <Text style={{ color: '#E8505B' }}>number</Text>.
          </Text>
        )}
      </View>

      <View>
        <TextInput {...props} secureTextEntry={isHideRe} />
        <TouchableOpacity style={styles.HidePassword} onPress={() => toggleHideRe(isHideRe)}>
          <Icon name={isHideRe === false ? 'eye' : 'eye-with-line'} size={24} color={LightText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AnimatedIcon
