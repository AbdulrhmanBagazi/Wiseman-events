import * as React from 'react'
import { Feather } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
import { View, Animated } from 'react-native'
import { PrimaryColor } from './ColorPalette'

function TabIcon(props) {
  const [ImageLoadE] = React.useState(new Animated.Value(0))
  const [ImageLoadN] = React.useState(new Animated.Value(0))
  const [ImageLoadH] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(ImageLoadE, {
        toValue: props.store.EarningsBadge ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ImageLoadN, {
        toValue: props.store.NotificationMain ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ImageLoadH, {
        toValue: props.store.HistoryBadge ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start()
  }, [props.store.EarningsBadge, props.store.NotificationMain, props.store.HistoryBadge])

  return (
    <View>
      <Feather name={props.name} size={props.size} color={props.color} style={props.style} />
      {props.name === 'home' ? null : props.name === 'user' ? (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: PrimaryColor,
            borderRadius: 10 / 2,
            width: 10,
            height: 10,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2,
            opacity: ImageLoadE,
          }}></Animated.View>
      ) : props.name === 'bell' ? (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: PrimaryColor,
            borderRadius: 10 / 2,
            width: 10,
            height: 10,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2,
            opacity: ImageLoadN,
          }}></Animated.View>
      ) : props.name === 'clipboard' ? (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: PrimaryColor,
            borderRadius: 10 / 2,
            width: 10,
            height: 10,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2,
            opacity: ImageLoadH,
          }}></Animated.View>
      ) : null}
    </View>
  )
}
export default inject('store')(observer(TabIcon))
