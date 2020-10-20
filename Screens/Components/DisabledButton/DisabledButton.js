import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styles from './Style'
import { PrimaryColor } from '../../../Config/ColorPalette'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

function DisabledButton(props) {
  const [isDisabled, setDisabled] = React.useState(true)
  const [ButtonColor] = React.useState(new Animated.Value(0))
  const Background = ButtonColor.interpolate({
    inputRange: [0, 100],
    outputRange: ['#cccccc', PrimaryColor],
  })
  const TextColor = ButtonColor.interpolate({
    inputRange: [0, 100],
    outputRange: ['#666666', '#fff'],
  })

  React.useEffect(() => {
    Animated.timing(ButtonColor, {
      toValue: props.Check === true ? 100 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
    setDisabled(props.Check === true ? false : true)
  }, [props.Check])

  return (
    <AnimatedTouchableOpacity
      style={[styles.Button, { backgroundColor: Background }]}
      onPress={props.onPress}
      disabled={isDisabled}>
      <Animated.Text style={[styles.ButtonText, { color: TextColor }]}>{props.TextValue}</Animated.Text>
    </AnimatedTouchableOpacity>
  )
}

export default DisabledButton

//onPress={() => setShow(true)} disabled={true}
