import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from './Style';
import { ResetPasswordString, ErrorsStrings } from '../../../Config/Strings';
import InputPhone from '../../Components/PhoneInput/Phone';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { URL } from '../../../Config/Config';
import { UserPhoneOTP } from '../../../Config/AsyncStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

function Reset({ navigation }) {
  const [data, setData] = React.useState({
    Phone: '',
  });
  const [isPhoneCheck, setPhoneCheck] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(' ');

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const PhoneInput = async (val) => {
    var phone = await convertToArabicNumber(val);
    setData({
      ...data,
      Phone: phone,
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

  const SendOTP = async () => {
    await Keyboard.dismiss();

    setLoading(true);
    setError(' ');

    if (isLoading) {
      return;
    }

    if (isPhoneCheck !== 'Success') {
      setError(ErrorsStrings.Required);
      setLoading(false);
      return;
    }
    await UserPhoneOTP(data.Phone);
    axios
      .post(URL + '/user/changePasswordOTP', {
        phone: data.Phone,
      })
      .then((response) => {
        if (response.data === 'notexists') {
          setError(ErrorsStrings.MobileNotFound);
          setLoading(false);

          return;
        } else if (response.data === 'success') {
          navigation.navigate('GetCode');
          setLoading(false);
          return;
        } else if (response.data === '24') {
          setError(ErrorsStrings.cantReset);
          setLoading(false);

          return;
        } else {
          setError(ErrorsStrings.OTPCode);
          setLoading(false);

          return;
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setError(ErrorsStrings.OTPCode);
          setLoading(false);
        }, 500);

        return;
      });
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={styles.Logo}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../assets/lock.png')}
          />
        </View>
        <Text style={styles.Title}>{ResetPasswordString.title}</Text>
        <Text style={styles.Slogan}>{ResetPasswordString.ResetSlogan}</Text>
        <Text style={styles.error}>{isError}</Text>

        <InputPhone
          placeholder={ResetPasswordString.Phone}
          style={styles.PhoneInput}
          onChangeText={(text) => PhoneInput(text)}
          keyboardType={'number-pad'}
          CheckPhone={isPhoneCheck}
        />

        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(() => (!isLoading ? SendOTP() : null), 200)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>
              {ResetPasswordString.Continue}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.getCode}>
          <Text style={styles.gotTheCode}>
            {ResetPasswordString.GotTheCodeMe}
          </Text>
          <TouchableOpacity
            onPress={() => (!isLoading ? navigation.navigate('GetCode') : null)}
          >
            <Text style={styles.getCodeText}>
              {ResetPasswordString.GotTheCode}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Reset;
