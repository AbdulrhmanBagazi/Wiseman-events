import React from 'react'
import { Animated, TouchableOpacity, View, I18nManager } from 'react-native'
import styles from './Style'
import { PrimaryColor, SecondaryColor } from '../../../Config/ColorPalette'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

function DisabledButton(props) {
  const [First] = React.useState(new Animated.Value(100))
  const [Second] = React.useState(new Animated.Value(100))
  const [Third] = React.useState(new Animated.Value(100))

  const FirstBorder = First.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryColor, PrimaryColor],
  })
  const FirstTextColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#868991', PrimaryColor],
  })

  const SecondBorder = Second.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryColor, PrimaryColor],
  })
  const SecondTextColor = Second.interpolate({
    inputRange: [0, 100],
    outputRange: ['#868991', PrimaryColor],
  })

  const ThirdBorder = Third.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryColor, PrimaryColor],
  })
  const ThirdTextColor = Third.interpolate({
    inputRange: [0, 100],
    outputRange: ['#868991', PrimaryColor],
  })

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(First, {
        toValue: props.Value === 0 ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(Second, {
        toValue: props.Value === 1 ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(Third, {
        toValue: props.Value === 2 ? 100 : 0,
        duration: 500,
      }),
    ]).start()
  }, [props.Value])

  return (
    <View style={styles.ButtonsView}>
      <AnimatedTouchableOpacity
        onPress={props.onPressOne}
        style={[styles.TouchableOpacityButton, { borderColor: FirstBorder }]}>
        <Animated.Text style={[styles.TouchableOpacityText, { color: FirstTextColor }]}>
          {I18nManager.isRTL ? 'نشطة' : 'Active'}
        </Animated.Text>
      </AnimatedTouchableOpacity>
      <AnimatedTouchableOpacity
        onPress={props.onPressTwo}
        style={[styles.TouchableOpacityButton, { borderColor: SecondBorder }]}>
        <Animated.Text style={[styles.TouchableOpacityText, { color: SecondTextColor }]}>
          {I18nManager.isRTL ? 'قيد الإنتظار' : 'Pending'}
        </Animated.Text>
      </AnimatedTouchableOpacity>
      <AnimatedTouchableOpacity
        onPress={props.onPressThird}
        style={[styles.TouchableOpacityButton, { borderColor: ThirdBorder }]}>
        <Animated.Text style={[styles.TouchableOpacityText, { color: ThirdTextColor }]}>
          {I18nManager.isRTL ? 'مكتملة' : 'Completed'}
        </Animated.Text>
      </AnimatedTouchableOpacity>
    </View>
  )
}

export default DisabledButton

//onPress={() => setShow(true)} disabled={true}
