import React from 'react'
import { TouchableOpacity, Animated, View, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './Style'
import { LightText } from '../../../Config/ColorPalette'

const Icon = Animated.createAnimatedComponent(Feather)

function AnimatedIcon(props) {
  const [isHide, setHide] = React.useState(true)

  toggleHide = async (value) => {
    setHide(value === false ? true : false)
  }

  return (
    <View>
      <TextInput {...props} secureTextEntry={isHide} />

      <TouchableOpacity style={styles.HidePassword} onPress={() => toggleHide(isHide)}>
        <Icon name={isHide === false ? 'eye' : 'eye-off'} size={24} color={LightText} />
      </TouchableOpacity>
    </View>
  )
}

export default AnimatedIcon
