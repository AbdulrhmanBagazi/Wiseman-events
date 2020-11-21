import React from 'react'
import { Animated } from 'react-native'
import * as FileSystem from 'expo-file-system'
import shorthash from 'shorthash'
import styles from './Style'

function TopCardImage(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))
  const [isUrl, setUrl] = React.useState(null)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Load()
  }, [])

  const Load = async () => {
    const { uri } = props.source
    const name = await shorthash.unique(uri)
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

  return isLoading ? null : (
    <Animated.Image
      onLoadEnd={() => Start()}
      source={isUrl}
      style={[styles.TopCardImage, { opacity: ImageLoad }]}
    />
  )
}

export default TopCardImage
