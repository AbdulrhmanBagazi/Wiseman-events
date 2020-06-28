import React from 'react'
import { TouchableOpacity, Animated, View, TextInput, Text, I18nManager } from 'react-native'
import { width } from '../../../Config/Layout'

function AnimatedPhone(props) {
  const [Match] = React.useState(new Animated.Value(0))
  const PhoneCheck = Match.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#4C4F56', '#E8505B', '#25AC71'],
  })

  React.useEffect(() => {
    if (props.CheckPhone === 'Success') {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
      }).start()
    } else if (props.CheckPhone === 'Error') {
      Animated.timing(Match, {
        toValue: 50,
        duration: 500,
      }).start()
    } else {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
      }).start()
    }
  }, [props.CheckPhone])

  return (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        height: 45,
        width,
        borderColor: PhoneCheck,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        justifyContent: 'center',
      }}>
      <TextInput {...props} />
    </Animated.View>
  )
}

export default AnimatedPhone
