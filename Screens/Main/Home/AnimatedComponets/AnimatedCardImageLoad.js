import React from 'react'
import { View, Text, Animated, ImageBackground, Image, I18nManager } from 'react-native'
import styles from '../Style'

function AnimatedCardImageLoad(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))

  const Start = async () => {
    setTimeout(() => {
      Animated.timing(ImageLoad, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, 1000)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 103 }}>
      <Animated.Image
        onLoadEnd={() => Start()}
        source={props.source}
        style={[styles.AllSingleJobTitleView, { opacity: ImageLoad }]}
      />
      <View style={styles.AllSingleJobLayer}>
        <Text style={styles.SingleTitle}>{props.Name}</Text>

        <View
          style={[
            styles.StatusTextView,
            { backgroundColor: props.EventStatus === 'active' ? '#11865B' : '#D31340' },
          ]}>
          {I18nManager.isRTL ? (
            <Text style={styles.StatusText}>{props.EventStatus === 'active' ? 'نشط' : 'انتهى'}</Text>
          ) : (
            <Text style={styles.StatusText}>{props.EventStatus === 'active' ? 'Active' : 'Ended'}</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default AnimatedCardImageLoad
