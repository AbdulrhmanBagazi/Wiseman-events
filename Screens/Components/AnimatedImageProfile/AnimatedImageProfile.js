import React from 'react'
import { Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './Style'
import * as FileSystem from 'expo-file-system'
import shorthash from 'shorthash'
import Icon from '../../../Config/Icons'
import axios from 'axios'
import { URL } from '../../../Config/Config'

function AnimatedImageProfile(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))
  const [isUrl, setUrl] = React.useState(null)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Load()
  }, [props.filename])

  const Load = async () => {
    const filename = props.filename

    if (filename) {
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
        axios
          .post(
            URL + '/user/PresignedURL',
            {
              filename: filename,
            },
            {
              headers: {
                Authorization: props.token,
                'Cache-Control': 'no-cache',
              },
            }
          )
          .then(async (response) => {
            if (response.data.check === 'success') {
              const newImage = await FileSystem.downloadAsync(response.data.url, path)

              setUrl({
                uri: newImage.uri,
              })
              setLoading(false)

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              )
              return
            }
          })
          .catch(async (error) => {
            if (error.response) {
              if (error.response.status) {
                if (error.response.status === 401) {
                  await UserTokenRemove()
                  Alert.alert(
                    '',
                    I18nManager.isRTL
                      ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                      : 'the session ended, please re-login',
                    [{ text: 'OK', onPress: () => signOut() }],
                    {
                      cancelable: false,
                    }
                  )

                  return
                } else {
                  Alert.alert(
                    '',
                    I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                    [{ text: 'OK', onPress: () => setLoading(false) }],
                    {
                      cancelable: false,
                    }
                  )
                  return
                }
              }
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              )
              return
            }
          })

        return
      }
    }
  }

  const Start = async () => {
    Animated.timing(ImageLoad, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableOpacity style={styles.Image} onPress={props.onPress}>
      {isLoading && !props.filename ? (
        <Icon name="upload" size={25} color="#fff" />
      ) : isLoading && props.filename ? (
        <ActivityIndicator size="small" color="#fff" />
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
