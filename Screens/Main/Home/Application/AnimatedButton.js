import React from 'react'
import { Animated, TouchableOpacity, I18nManager } from 'react-native'
import styles from './Style'
import { PrimaryColor, SecondaryColor } from '../../../../Config/ColorPalette'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const EnglishNumbers = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Nine',
  'Tenth',
]
const ArabicNumbers = [
  'الأولى',
  'الثانية',
  'الثالثة',
  'الرابعة',
  'الخامسة',
  'السادسة',
  'السابعة',
  'الثامنة',
  'التاسعة',
  'العاشرة',
]

function AnimatedButton(props) {
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
      toValue: props.itemIndex === props.Shift ? 100 : 0,
      duration: 500,
    }).start()
  }, [props.Shift])

  return (
    <AnimatedTouchableOpacity
      onPress={props.onPress}
      style={[styles.ShiftButton, { borderColor: FirstDarkColor, backgroundColor: FirstColor }]}>
      <Animated.Text style={[styles.shift, { color: FirstDarkColor }]}>
        {I18nManager.isRTL ? 'الوردية' + ' ' : null}
        {I18nManager.isRTL ? ArabicNumbers[props.itemIndex] : EnglishNumbers[props.itemIndex]}
        {I18nManager.isRTL ? null : ' ' + 'Shift'}
      </Animated.Text>
    </AnimatedTouchableOpacity>
  )
}

export default AnimatedButton
