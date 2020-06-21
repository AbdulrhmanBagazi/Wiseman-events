import React from 'react'
import { View, Animated, Text, TouchableOpacity } from 'react-native'
import {
  PrimaryColor,
  SecondaryColor,
  GrayColor,
  LightBorder,
  PrimaryBorder,
} from '../../../Config/ColorPalette'
import styles from './Style'
import { inject, observer } from 'mobx-react'

AnimatedButton = ({ store }) => {
  const AR = new Animated.Value(0)
  const EN = new Animated.Value(0)
  const [isChanged, setChanged] = React.useState('')

  const ArColor = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, SecondaryColor],
  })
  const EnColor = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, SecondaryColor],
  })
  const ArBorder = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [LightBorder, PrimaryBorder],
  })
  const EnBorder = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [LightBorder, PrimaryBorder],
  })

  const ArCircle = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, PrimaryColor],
  })
  const EnCircle = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, PrimaryColor],
  })

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(AR, {
        toValue: isChanged === 'ar' ? 100 : 0,
        duration: 1000,
      }),
      Animated.timing(EN, {
        toValue: isChanged === 'en' ? 100 : 0,
        duration: 1000,
      }),
    ]).start()

    store.setLanguge(isChanged)
  }, [isChanged])

  return (
    <View>
      <TouchableOpacity onPress={() => setChanged('ar')} style={styles.TouchableOpacityContainer}>
        <Animated.View
          style={[
            styles.TouchableOpacity,
            {
              backgroundColor: ArColor,
              borderColor: ArBorder,
              shadowOpacity: 0.25,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}>
          <Text style={styles.TouchableOpacityText}>عربي</Text>
          <Animated.View style={[styles.Circle, { backgroundColor: ArCircle }]} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setChanged('en')} style={styles.TouchableOpacityContainer}>
        <Animated.View
          style={[
            styles.TouchableOpacity,
            {
              backgroundColor: EnColor,
              borderColor: EnBorder,
              shadowOpacity: 0.25,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}>
          <Text style={styles.TouchableOpacityText}>English</Text>
          <Animated.View style={[styles.Circle, { backgroundColor: EnCircle }]} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(AnimatedButton))
