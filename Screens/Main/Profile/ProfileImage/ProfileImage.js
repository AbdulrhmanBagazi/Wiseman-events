import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import styles from './Style';
import { AuthContext } from '../../../../Hooks/Context';
import axios from 'axios';
import { URL } from '../../../../Config/Config';
import Icon from '../../../../Config/Icons';
import * as ImagePicker from 'expo-image-picker';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';
import { inject, observer } from 'mobx-react';
import { ProfileImageStrings } from '../../../../Config/Strings';
// import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

function ProfileImage(props) {
  const { signOut } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [isEnd, setEnd] = React.useState(false);

  React.useEffect(() => {
    setImage(null);
    setLoading(false);
    setEnd(false);
  }, [props.close]);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        '',
        I18nManager.isRTL
          ? 'إذن للوصول إلى ألبوم الكاميرا مطلوب!'
          : 'Permission to access camera roll is required!',
        [{ text: 'OK' }],
        {
          cancelable: false,
        }
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.25,
    });

    if (!pickerResult.cancelled) {
      let manipResult = await ImageManipulator.manipulateAsync(
        pickerResult.uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      // console.log(manipResult);
      setImage(manipResult);

      // const dirInfo = await FileSystem.getInfoAsync(manipResult.uri);
      // console.log(dirInfo);
    }
  };

  const updateImage = async (name) => {
    axios
      .post(
        URL + '/user/addNewProfileImage',
        {
          filename: name,
        },
        {
          headers: {
            Authorization: props.token,
            'Cache-Control': 'no-cache',
          },
        }
      )
      .then(async (response) => {
        if (response.data === 'success') {
          props.store.updateimage(name);
          setLoading(false);
          setEnd(true);

          return;
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove();
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              );

              return;
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              );
              return;
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
          );
          return;
        }
      });
  };

  const UploadImage = async (url, name, imageuri) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Successfully uploaded the file.
          updateImage(name);
          return;
        } else {
          // The file could not be uploaded.
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
        }
      }
    };
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'image/jpeg');
    xhr.send({ uri: imageuri, type: 'image/jpeg', name: name });
  };

  const Uploade = async () => {
    setLoading(true);
    axios
      .get(URL + '/user/PresignedURLPut', {
        headers: {
          Authorization: props.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.data.check === 'success') {
          return UploadImage(response.data.url, response.data.name, image.uri);
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove();
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              );

              return;
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              );
              return;
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
          );
          return;
        }
      });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.open}>
      <View style={styles.modal}>
        <View style={styles.Container}>
          <View style={styles.Body}>
            <TouchableOpacity
              style={styles.Image}
              onPress={() => openImagePickerAsync()}
              disabled={isLoading || isEnd}
            >
              {image ? (
                <Image
                  style={styles.tinyLogo}
                  resizeMode="cover"
                  source={{ uri: image.uri }}
                />
              ) : (
                <Icon name="image" size={50} color="#fff" />
              )}
            </TouchableOpacity>

            {isEnd ? (
              <TouchableOpacity
                onPress={props.close}
                style={styles.Button}
                disabled={isLoading}
              >
                <Icon name="check" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => Uploade()}
                style={
                  image || isLoading ? styles.Button : styles.ButtonDisable
                }
                disabled={image || isLoading ? false : true}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.ButtonText}>
                    {ProfileImageStrings.Upload}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={props.close}
              style={styles.closebutton}
              disabled={isLoading}
            >
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
  );
}

export default inject('store')(observer(ProfileImage));
