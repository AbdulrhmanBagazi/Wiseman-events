import React from 'react'
import { View, Text, Animated, ImageBackground, Image } from 'react-native'
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
        source={{
          uri: 'https://i.ibb.co/72xDcxj/two.png',
        }}
        style={[styles.AllSingleJobTitleView, { opacity: ImageLoad }]}
      />
      <View style={styles.AllSingleJobLayer}>
        <Text style={styles.SingleTitle}>WWE Event</Text>
      </View>
    </View>
  )
}

export default AnimatedCardImageLoad
