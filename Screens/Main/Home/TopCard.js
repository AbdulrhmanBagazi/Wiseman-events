import React from 'react'
import { View, Animated, Text, ImageBackground, I18nManager } from 'react-native'
import styles from './Style'

function TopCard({ props }) {
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
    <View style={styles.TopCard}>
      <Animated.Image
        onLoadEnd={() => Start()}
        source={{
          uri: 'https://i.ibb.co/q5KBD4N/one.png',
        }}
        style={[styles.TopCardImage, { opacity: ImageLoad }]}
      />
      <View style={styles.TopCardLayer}>
        <Text style={styles.TopCardTitle}>
          {I18nManager.isRTL ? 'موسم الرياض مستمر' : 'Riyadh Season Ongoing'}
        </Text>
        <Text style={styles.TopCardTime}>23 November to 6 March</Text>
      </View>
    </View>
  )
}

export default TopCard
