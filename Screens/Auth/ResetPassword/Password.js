import React from 'react'
import { TouchableOpacity, Animated, View, TextInput, Text } from 'react-native'
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
        <Text style={styles.Resendmessage}>{props.passwordlength}</Text>
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
