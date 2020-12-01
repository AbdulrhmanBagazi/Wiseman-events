import React from 'react'
import { View, Text, Animated, I18nManager, Image } from 'react-native'
import styles from '../Style'
import * as FileSystem from 'expo-file-system'
import shorthash from 'shorthash'

function AnimatedCardImageLoad(props) {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 103 }}>
      {isLoading ? null : (
        <Animated.Image
          onLoadEnd={() => Start()}
          source={isUrl}
          style={[styles.AllSingleJobTitleView, { opacity: ImageLoad }]}
        />
      )}

      <Image source={require('../../../../assets/L.png')} style={styles.smallogo} />
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
