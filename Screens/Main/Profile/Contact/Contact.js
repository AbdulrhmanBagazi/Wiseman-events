import React from 'react';
import { View, Modal, Text, I18nManager, Keyboard, Alert } from 'react-native';
import styles from './Style';
import InputPhone from './Phone';
import { ContactStrings } from '../../../../Config/Strings';
import { inject, observer } from 'mobx-react';
import { LightText } from '../../../../Config/ColorPalette';
import axios from 'axios';
import DisabledButton from '../../../Components/DisabledButton/DisabledButton';
import { AuthContext } from '../../../../Hooks/Context';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';
import { URL } from '../../../../Config/Config';

function Contact(props) {
  const { signOut } = React.useContext(AuthContext);
  const [isPhoneCheck, setPhoneCheck] = React.useState('');
  const [isWhatsappCheck, setWhatsappCheck] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    call: '',
    whatsapp: '',
  });

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };
  const PhoneInput = async (val) => {
    var phone = await convertToArabicNumber(val);
    setData({
      ...data,
      call: phone.trim(),
    });
    if (phone === '') {
      setPhoneCheck('');
      return;
    }
    if (isNaN(phone) === true && phone.length < 10) {
      setPhoneCheck('Error');
      return;
    }
    if (phone.length > 10 || phone.length < 10) {
      setPhoneCheck('Error');
      return;
    }
    if (isNaN(phone) === false && phone.length === 10) {
      setPhoneCheck('Success');
      return;
    }
    return;
  };

  const WhatsappInput = async (val) => {
    var phone = await convertToArabicNumber(val);
    setData({
      ...data,
      whatsapp: phone.trim(),
    });
    if (phone === '') {
      setWhatsappCheck('');
      return;
    }
    if (isNaN(phone) === true && phone.length < 10) {
      setWhatsappCheck('Error');
      return;
    }
    if (phone.length > 10 || phone.length < 10) {
      setWhatsappCheck('Error');
      return;
    }
    if (isNaN(phone) === false && phone.length === 10) {
      setWhatsappCheck('Success');
      return;
    }
    return;
  };

  const HandleUpdate = async () => {
    await Keyboard.dismiss();

    setLoading(true);
    axios
      .post(
        URL + '/user/updatecontacts',
        {
          call: data.call.length > 1 ? data.call : props.store.data.call,
          whatsapp:
            data.whatsapp.length > 1
              ? data.whatsapp
              : props.store.data.whatsapp,
        },
        {
          headers: { Authorization: props.store.token },
        }
      )
      .then(async (response) => {
        if (response.data === 'success') {
          var contacts = {
            call: data.call.length > 1 ? data.call : props.store.data.call,
            whatsapp:
              data.whatsapp.length > 1
                ? data.whatsapp
                : props.store.data.whatsapp,
          };

          await props.store.setContacts(props.store.data, contacts);
          setPhoneCheck('');
          setWhatsappCheck('');
          setData({
            call: '',
            whatsapp: '',
          });
          setLoading(false);
          Alert.alert(
            '',
            I18nManager.isRTL
              ? 'تم تحديث بيانات التواصل'
              : 'Contact information has been updated',
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

  return (
    <Modal animationType="fade" transparent={true} visible={props.OpenModal}>
      <View style={styles.modal}>
        <View style={styles.Container}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>{ContactStrings.Contact}</Text>
          </View>
          <View style={styles.Col}>
            <Text style={styles.title}>{ContactStrings.call}</Text>
            <InputPhone
              placeholder={props.store.data.call}
              style={styles.input}
              onChangeText={(text) => PhoneInput(text)}
              keyboardType={'number-pad'}
              CheckPhone={isPhoneCheck}
              editable={!isLoading}
              placeholderTextColor={LightText}
              value={data.call}
            />
          </View>

          <View style={styles.Col}>
            <Text style={styles.title}>{ContactStrings.whatsapp}</Text>
            <InputPhone
              placeholder={props.store.data.whatsapp}
              style={styles.input}
              onChangeText={(text) => WhatsappInput(text)}
              keyboardType={'number-pad'}
              CheckPhone={isWhatsappCheck}
              editable={!isLoading}
              placeholderTextColor={LightText}
              value={data.whatsapp}
            />
          </View>

          <View style={styles.Row}>
            <DisabledButton
              TextValue={I18nManager.isRTL ? 'تحديث' : 'Update'}
              Contact={true}
              Check={
                isLoading
                  ? false
                  : isPhoneCheck === 'Success' && isWhatsappCheck === 'Success'
                  ? true
                  : isPhoneCheck === 'Success' && isWhatsappCheck === ''
                  ? true
                  : isPhoneCheck === '' && isWhatsappCheck === 'Success'
                  ? true
                  : false
              }
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

export default inject('store')(observer(Contact));
