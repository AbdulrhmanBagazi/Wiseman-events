import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  I18nManager,
  Alert,
  ActivityIndicator,
} from 'react-native'
import styles from './Style'
import { AuthContext } from '../../../../Hooks/Context'
import axios from 'axios'
import { URL } from '../../../../Config/Config'
import Icon from '../../../../Config/Icons'
import * as ImagePicker from 'expo-image-picker'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'

function ProfileImage(props) {
  const { signOut } = React.useContext(AuthContext)
  const [image, setImage] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [isEnd, setEnd] = React.useState(false)

  React.useEffect(() => {
    setImage(null)
    setLoading(false)
    setEnd(false)
  }, [props.close])

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    })

    if (!pickerResult.cancelled) {
      setImage(pickerResult)
      // console.log(pickerResult)
    }
  }

  const UploadImage = async (URL, name, imageuri) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Successfully uploaded the file.
          setLoading(false)
          setEnd(true)
          return
        } else {
          // The file could not be uploaded.
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          )
        }
      }
    }
    xhr.open('PUT', URL)
    xhr.setRequestHeader('Content-Type', 'image/jpeg')
    xhr.send({ uri: imageuri, type: 'image/jpeg', name: name })
  }

  const Uploade = async () => {
    setLoading(true)
    axios
      .get(URL + '/user/PresignedURLPut', {
        headers: {
          Authorization: props.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.data.check === 'success') {
          return UploadImage(response.data.url, response.data.name, image.uri)
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
  }

  return (
    <Modal animationType="fade" transparent={true} visible={props.open}>
      <View style={styles.modal}>
        <View style={styles.Container}>
          <View style={styles.Body}>
            <TouchableOpacity
              style={styles.Image}
              onPress={() => openImagePickerAsync()}
              disabled={isLoading}>
              {image ? (
                <Image style={styles.tinyLogo} resizeMode="cover" source={{ uri: image.uri }} />
              ) : (
                <Icon name="image" size={50} color="#fff" />
              )}
            </TouchableOpacity>

            {isEnd ? (
              <TouchableOpacity onPress={props.close} style={styles.Button} disabled={isLoading}>
                <Text style={styles.ButtonText}>Done</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => Uploade()}
                style={image || isLoading ? styles.Button : styles.ButtonDisable}
                disabled={image || isLoading ? false : true}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.ButtonText}>Uploade</Text>
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={props.close} style={styles.closebutton} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Icon name="x" size={25} color="#000" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ProfileImage
