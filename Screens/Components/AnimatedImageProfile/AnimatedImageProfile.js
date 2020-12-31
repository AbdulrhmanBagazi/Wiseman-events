import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styles from './Style'
import * as FileSystem from 'expo-file-system'
import shorthash from 'shorthash'
import Icon from '../../../Config/Icons'

function AnimatedImageProfile(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))
  const [isUrl, setUrl] = React.useState(null)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Load()
  }, [])

  const Load = async () => {
    const { uri } = props.source
    const filename = props.filename
    const name = await shorthash.unique(filename)
    const path = `${FileSystem.cacheDirectory}${name}`
    const image = await FileSystem.getInfoAsync(path)

    if (image.exists) {
      setUrl({
        uri: image.uri,
      })
      setLoading(false)
      return
    } else {
      const newImage = await FileSystem.downloadAsync(uri, path)

      setUrl({
        uri: newImage.uri,
      })
      setLoading(false)
      return
    }
  }

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
    <TouchableOpacity style={styles.Image} onPress={props.onPress}>
      {isLoading ? (
        <Icon name="upload" size={25} color="#fff" />
      ) : (
        <Animated.Image
          onLoadEnd={() => Start()}
          style={[styles.tinyLogo, { opacity: ImageLoad }]}
          resizeMode="cover"
          source={isUrl}
        />
      )}
    </TouchableOpacity>
  )
}

export default AnimatedImageProfile
