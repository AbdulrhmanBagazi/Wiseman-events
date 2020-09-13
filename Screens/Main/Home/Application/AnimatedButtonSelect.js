import React from 'react'
import { View, Animated, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import { PrimaryColor, SecondaryColor } from '../../../../Config/ColorPalette'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

function AnimatedButtonSelect(props) {
  const [First] = React.useState(new Animated.Value(0))
  const FirstColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const FirstDarkColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ccc', PrimaryColor],
  })

  React.useEffect(() => {
    Animated.timing(First, {
      toValue: props.Shift ? 100 : 0,
      duration: 500,
    }).start()
  }, [props.Shift])

  return (
    <View>
      {!props.Disabled ? (
        <AnimatedTouchableOpacity
          disabled={true}
          style={[styles.ShiftButton, { borderColor: '#cccccc', backgroundColor: '#cccccc' }]}>
          <Animated.Text style={[styles.shift, { color: '#666666' }]}>{props.FullText}</Animated.Text>
        </AnimatedTouchableOpacity>
      ) : (
        <AnimatedTouchableOpacity
          onPress={props.onPress}
          style={[styles.ShiftButton, { borderColor: FirstDarkColor, backgroundColor: FirstColor }]}>
          <Animated.Text style={[styles.shift, { color: FirstDarkColor }]}>{props.Value}</Animated.Text>
        </AnimatedTouchableOpacity>
      )}
    </View>
  )
}

export default AnimatedButtonSelect
