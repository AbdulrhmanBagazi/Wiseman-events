import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Alert,
  I18nManager,
  Modal,
} from 'react-native';
import styles from './Style';
import { ResetPasswordString, ErrorsStrings } from '../../../../Config/Strings';
import Inputpassowrd from '../../../Components/PasswordInput/Password';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { URL } from '../../../../Config/Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AuthContext } from '../../../../Hooks/Context';
import { inject, observer } from 'mobx-react';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';

function ChangePassword({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    Password: '',
    RePassword: '',
  });
  const [isCheck, setCheck] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(' ');

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const PasswordInput = async (val) => {
    var Pss = await convertToArabicNumber(val);

    setData({
      ...data,
      Password: Pss,
    });
    if (val === '') {
      setCheck('');
    } else if (data.RePassword === Pss) {
      setCheck('Success');
    } else {
      setCheck('Error');
    }
  };

  const RePasswordInput = async (val) => {
    var RePss = await convertToArabicNumber(val);

    setData({
      ...data,
      RePassword: RePss,
    });
    if (val === '') {
      setCheck('');
    }
    if (data.Password === RePss) {
      setCheck('Success');
    } else {
      setCheck('Error');
    }
  };

  const ResetPassword = async (val) => {
    await Keyboard.dismiss();
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (
      val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/) &&
      isCheck === 'Success'
    ) {
      axios
        .post(
          URL + '/user/updatePassword',
          {
            password: val.Password,
          },
          {
            headers: { Authorization: store.token },
          }
        )
        .then((response) => {
          if (response.data === 'success') {
            Alert.alert(
              '',
              I18nManager.isRTL
                ? 'لقد تم تحديث كلمة المرور الخاصة بك'
                : 'Your password has been updated',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            );

            return;
          } else {
            setLoading(false);
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK' }],
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
    } else {
      setError(ErrorsStrings.Required);
      setLoading(false);
      return;
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isLoading) {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        return;
      }

      return;
    });

    return unsubscribe;
  }, [navigation, isLoading]);

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.error}>{isError}</Text>
        <Inputpassowrd
          placeholderpassword={ResetPasswordString.Password}
          passwordstyle={styles.input}
          change={(text) => PasswordInput(text)}
          placeholder={ResetPasswordString.RePassword}
          style={styles.input}
          onChangeText={(text) => RePasswordInput(text)}
          passwordlength={ResetPasswordString.Length}
          MatchString={ResetPasswordString.Match}
          Check={isCheck}
          PasswordValue={data.Password}
        />

        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(
            () => (!isLoading ? ResetPassword(data) : null),
            200
          )}
        >
          <Text style={styles.ButtonText}>{ResetPasswordString.Update}</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

export default inject('store')(observer(ChangePassword));
