import React from 'react'
import { View, Animated, Text, TouchableOpacity } from 'react-native'
import {
  PrimaryColor,
  SecondaryColor,
  GrayColor,
  SecondaryText,
  PrimaryBorder,
  PrimaryText,
} from '../../../Config/ColorPalette'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { ProfileStrings } from '../../../Config/Strings'

AnimatedButton = ({ store }) => {
  const [M] = React.useState(new Animated.Value(0))
  const [F] = React.useState(new Animated.Value(0))
  const [isChanged, setChanged] = React.useState('')

  const MColor = M.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const FColor = F.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const MBorder = M.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryText, PrimaryBorder],
  })
  const FBorder = F.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryText, PrimaryBorder],
  })

  const MText = M.interpolate({
    inputRange: [0, 100],
    outputRange: [PrimaryText, PrimaryColor],
  })
  const FText = F.interpolate({
    inputRange: [0, 100],
    outputRange: [PrimaryText, PrimaryColor],
  })

  const MShadow = M.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  })
  const FShadow = F.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  })

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(M, {
        toValue: isChanged === 'male' ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(F, {
        toValue: isChanged === 'female' ? 100 : 0,
        duration: 500,
      }),
    ]).start()

    store.setGender(isChanged)
  }, [isChanged])

  return (
    <View style={styles.Gender}>
      <TouchableOpacity onPress={() => setChanged('male')} style={styles.TouchableOpacityContainer}>
        <Animated.View
          style={[
            styles.TouchableOpacityFirst,
            {
              backgroundColor: MColor,
              borderColor: MBorder,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: MShadow,
              elevation: MShadow,
            },
          ]}>
          <Animated.Text style={{ color: MText }}>{ProfileStrings.Male}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setChanged('female')} style={styles.TouchableOpacityContainer}>
        <Animated.View
          style={[
            styles.TouchableOpacity,
            {
              backgroundColor: FColor,
              borderColor: FBorder,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: FShadow,
              elevation: FShadow,
            },
          ]}>
          <Animated.Text style={{ color: FText }}>{ProfileStrings.Female}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(AnimatedButton))
