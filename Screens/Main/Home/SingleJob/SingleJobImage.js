import React from 'react'
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native'
import styles from './Style'
import Icon from '../../../../Config/Icons'
import * as FileSystem from 'expo-file-system'
import shorthash from 'shorthash'

function SingleJobImage(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))
  const [isUrl, setUrl] = React.useState(null)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ensureDirExists()
  }, [])

  // Checks if gif directory exists. If not, creates it
  const ensureDirExists = async () => {
    const gifDir = FileSystem.cacheDirectory + 'eventsappimages/'
    const dirInfo = await FileSystem.getInfoAsync(gifDir)
    // await FileSystem.deleteAsync(gifDir)
    // return
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true })
      return Load()
    }

    return Load()
  }

  const Load = async () => {
    const { uri } = props.source
    const gifDir = FileSystem.cacheDirectory + 'eventsappimages/'

    const name = await shorthash.unique(uri)
    const path = gifDir + `${name}`
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 103 }}>
      {isLoading ? null : (
        <Animated.Image
          onLoadEnd={() => Start()}
          source={isUrl}
          style={[styles.AllSingleJobTitleView, { opacity: ImageLoad }]}
        />
      )}

      {/* <Image source={require('../../../../assets/L.png')} style={styles.smallogo} /> */}
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
