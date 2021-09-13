import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import styles from './Style';
import * as Analytics from 'expo-firebase-analytics';
import { inject, observer } from 'mobx-react';
import { OTPStrings, ErrorsStrings } from '../../../Config/Strings';
import { PrimaryColor } from '../../../Config/ColorPalette';
import { AuthContext } from '../../../Hooks/Context';
import axios from 'axios';
import { URL } from '../../../Config/Config';
import CountDown from 'react-native-countdown-component';
import debounce from 'lodash/debounce';
import { UserTokenRemove } from '../../../Config/AsyncStorage';

function OTP({ store }) {
  const { Profile, signOut } = React.useContext(AuthContext);
  const [isResend, setResend] = React.useState(false);
  const [isError, setError] = React.useState(' ');
  const [isLoading, setLoading] = React.useState(false);
  const [isShow, setShow] = React.useState(false);
  const [value, onChangeText] = React.useState('');

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const VeridyCode = async (code) => {
    var Code = await convertToArabicNumber(code);
    onChangeText(Code);

    if (Code.length < 4) {
      return;
    }

    await Keyboard.dismiss();
    if (isLoading) {
      return;
    }
    setLoading(true);
    axios
      .post(
        URL + '/user/VerifyOTP',
        {
          code: Code,
        },
        {
          headers: { Authorization: store.token },
        }
      )
      .then(async (response) => {
        if (response.data === 'success') {
          await Analytics.logEvent('phone_verified', {
            screen: 'OTP',
          });
          Profile();
          return;
        } else {
          setError(ErrorsStrings.WrongCode);
          setLoading(false);
          return;
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.WrongCodeCheck);
        setLoading(false);
        return;
      });
  };

  React.useEffect(() => {
    setError(' ');

    if (isLoading) {
      return;
    }
    if (isShow) {
      return;
    }

    axios
      .get(URL + '/user/SendOTP', {
        headers: {
          Authorization: store.token,
        },
      })
      .then((response) => {
        if (response.data === 'success') {
          setShow(true);
          return;
        } else if (response.data === 'sent') {
          setShow(true);
          return;
        } else {
          setError(ErrorsStrings.OTPCode);
          setShow(false);
          return;
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.OTPCode);
        setShow(true);
        return;
      });
    return;
  }, [isResend]);

  const ChangeState = async () => {
    setTimeout(() => {
      setShow(false);
    }, 500);

    return;
  };

  const Logout = async () => {
    await UserTokenRemove();
    await store.setResetData();
    signOut();

    return;
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 30}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <View style={styles.container}>
          <View style={styles.Logo} />
          <Text style={styles.Title}>{OTPStrings.Title}</Text>
          <Text style={styles.Slogan}>{OTPStrings.Slogan}</Text>

          <Text style={styles.error}>{isError}</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputContainer}
              keyboardType={'number-pad'}
              onChangeText={(text) => VeridyCode(text)}
              value={value}
              autoFocus={true}
              maxLength={4}
              editable={!isLoading}
            />
          </View>

          {isShow ? (
            isLoading ? (
              <ActivityIndicator size="small" color={PrimaryColor} />
            ) : (
              <View style={styles.ltrView}>
                <CountDown
                  until={1800}
                  digitStyle={styles.digittyle}
                  digitTxtStyle={styles.digittext}
                  onFinish={() => ChangeState()}
                  timeToShow={['M', 'S']}
                  timeLabels={{ s: '' }}
                  size={20}
                />
              </View>
            )
          ) : (
            <TouchableOpacity
              style={styles.Button}
              onPress={debounce(() => setResend(isResend ? false : true), 200)}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.ButtonText}>{OTPStrings.Resend}</Text>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.Button}
            disabled={isLoading}
            onPress={() => Logout()}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.ButtonText}>{OTPStrings.Logout}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default inject('store')(observer(OTP));
