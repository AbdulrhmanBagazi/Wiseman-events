import React from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import styles from './Style'
import Icon from '../../../../Config/Icons'

function SingleJobImage(props) {
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
      </View>
      <TouchableOpacity style={styles.WorkS} onPress={props.onPressWork}>
        <Icon name="calendar" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default SingleJobImage
