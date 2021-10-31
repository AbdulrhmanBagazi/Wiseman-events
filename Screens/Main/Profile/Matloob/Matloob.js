import React from 'react';
import {
  View,
  Modal,
  Text,
  I18nManager,
  Keyboard,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import styles from './Style';
import { MatloobStrings } from '../../../../Config/Strings';
import { inject, observer } from 'mobx-react';
import { LightText } from '../../../../Config/ColorPalette';
import axios from 'axios';
import DisabledButton from '../../../Components/DisabledButton/DisabledButton';
import { AuthContext } from '../../../../Hooks/Context';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';
import { URL } from '../../../../Config/Config';
import { width } from '../../../../Config/Layout';

function Matloob(props) {
  const { signOut } = React.useContext(AuthContext);
  const [isMatloobNumberCheck, setMatloobNumberCheck] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState('');

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const HandleUpdate = async () => {
    await Keyboard.dismiss();
    setLoading(true);
    axios
      .post(
        URL + '/user/updateMatloop',
        {
          request_number: data,
        },
        {
          headers: { Authorization: props.store.token },
        }
      )
      .then(async (response) => {
        if (response.data === 'success') {
          var matloob_request_number = data;

          await props.store.setMatloop(
            props.store.data,
            matloob_request_number
          );
          setMatloobNumberCheck('');
          setData('');
          setLoading(false);
          Alert.alert(
            '',
            I18nManager.isRTL
              ? 'تم تحديث رقم الطلب'
              : 'Request number has been updated',
            [{ text: 'OK', onPress: props.onPressClose }],
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

  const MatloobNumberInput = async (val) => {
    var MatloobNumber = await convertToArabicNumber(val);
    setData(MatloobNumber);
    if (MatloobNumber === '') {
      setMatloobNumberCheck(false);
      return;
    }
    if (MatloobNumber.length > 0) {
      setMatloobNumberCheck(true);
      return;
    }

    return;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.OpenModal}
      onRequestClose={isLoading ? null : props.onPressClose}
    >
      <View style={styles.modal}>
        <View style={styles.Container}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>{MatloobStrings.Matloob}</Text>
          </View>
          <View style={styles.Col}>
            <Text style={styles.title}>{MatloobStrings.RequestNumber}</Text>
            <View style={stylesmain.ViewStyle}>
              <TextInput
                placeholder={props.store.data.profile.matloob_request_number}
                style={styles.input}
                onChangeText={(text) => MatloobNumberInput(text)}
                keyboardType={'number-pad'}
                editable={!isLoading}
                placeholderTextColor={LightText}
                value={data}
              />
            </View>
          </View>

          <View style={styles.Row}>
            <DisabledButton
              TextValue={I18nManager.isRTL ? 'تحديث' : 'Update'}
              Contact={true}
              Check={
                isLoading
                  ? false
                  : isMatloobNumberCheck === false
                  ? false
                  : isMatloobNumberCheck === true
                  ? true
                  : false
              }
              Loading={isLoading}
              onPress={() => HandleUpdate()}
            />
            <DisabledButton
              TextValue={I18nManager.isRTL ? 'إلغاء' : 'Cancel'}
              Contact={true}
              Check={isLoading ? false : true}
              Cancel={true}
              onPress={props.onPressClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default inject('store')(observer(Matloob));

const stylesmain = StyleSheet.create({
  ViewStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    height: 45,
    marginBottom: 10,
    justifyContent: 'center',
    width: width - 40,
  },
});
