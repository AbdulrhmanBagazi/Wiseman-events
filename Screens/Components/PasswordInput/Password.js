import React from 'react';
import {
  TouchableOpacity,
  Animated,
  View,
  TextInput,
  Text,
  I18nManager,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './Style';
import { LightText } from '../../../Config/ColorPalette';

const Icon = Animated.createAnimatedComponent(Feather);

function AnimatedIcon(props) {
  const [isHide, setHide] = React.useState(true);
  const [Match] = React.useState(new Animated.Value(0));
  //
  const [MatchLength] = React.useState(new Animated.Value(0));
  const [MatchUpper] = React.useState(new Animated.Value(0));
  const [MatchLower] = React.useState(new Animated.Value(0));
  const [MatchNumber] = React.useState(new Animated.Value(0));

  const MatchColor = Match.interpolate({
    inputRange: [0, 100],
    outputRange: ['#CCCCCC', '#25AC71'],
  });
  const MatchLengthColor = MatchLength.interpolate({
    inputRange: [0, 100],
    outputRange: ['#CCCCCC', '#25AC71'],
  });
  const MatchUpperColor = MatchUpper.interpolate({
    inputRange: [0, 100],
    outputRange: ['#CCCCCC', '#25AC71'],
  });
  const MatchLowerColor = MatchLower.interpolate({
    inputRange: [0, 100],
    outputRange: ['#CCCCCC', '#25AC71'],
  });
  const MatchNumberColor = MatchNumber.interpolate({
    inputRange: [0, 100],
    outputRange: ['#CCCCCC', '#25AC71'],
  });

  const toggleHide = async (value) => {
    setHide(value === false ? true : false);
  };

  React.useEffect(() => {
    if (props.PasswordValue.match(/[a-z]/g)) {
      Animated.timing(MatchLower, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(MatchLower, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (props.PasswordValue.match(/[A-Z]/g)) {
      Animated.timing(MatchUpper, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(MatchUpper, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (props.PasswordValue.match(/[0-9]/g)) {
      Animated.timing(MatchNumber, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(MatchNumber, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (props.PasswordValue.length >= 6) {
      Animated.timing(MatchLength, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(MatchLength, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (props.Check === 'Success') {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (props.Check === 'Error') {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [props.Check, props.PasswordValue]);

  return (
    <View>
      <View>
        <TextInput
          placeholder={props.placeholderpassword}
          style={props.passwordstyle}
          onChangeText={props.change}
          secureTextEntry={isHide}
        />
        <TouchableOpacity
          style={styles.HidePassword}
          onPress={() => toggleHide(isHide)}
        >
          <Icon
            name={isHide === false ? 'eye' : 'eye-off'}
            size={24}
            color={LightText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.CheckMatch}>
        {I18nManager.isRTL ? (
          <Text style={[styles.Resendmessage, { textAlign: 'left' }]}>
            <Text>يجب ان تتكون كلمة المرور من</Text>{' '}
            <Animated.Text
              style={{ color: MatchLengthColor, fontWeight: 'bold' }}
            >
              ٦ أحرف أو أكثر
            </Animated.Text>{' '}
            <Text> وتحتوي على آحرف</Text>{' '}
            <Animated.Text
              style={{ color: MatchUpperColor, fontWeight: 'bold' }}
            >
              كبيرة
            </Animated.Text>{' '}
            و
            <Animated.Text
              style={{ color: MatchLowerColor, fontWeight: 'bold' }}
            >
              صغيرة
            </Animated.Text>{' '}
            و{' '}
            <Animated.Text
              style={{ color: MatchNumberColor, fontWeight: 'bold' }}
            >
              رقم
            </Animated.Text>
            .
          </Text>
        ) : (
          <Text style={styles.Resendmessage}>
            Your password must be{' '}
            <Animated.Text
              style={{ color: MatchLengthColor, fontWeight: 'bold' }}
            >
              6 characters or more
            </Animated.Text>{' '}
            long, contain both{' '}
            <Animated.Text
              style={{ color: MatchUpperColor, fontWeight: 'bold' }}
            >
              uppercase
            </Animated.Text>{' '}
            and{' '}
            <Animated.Text
              style={{ color: MatchLowerColor, fontWeight: 'bold' }}
            >
              lowercase
            </Animated.Text>{' '}
            letter &{' '}
            <Animated.Text
              style={{ color: MatchNumberColor, fontWeight: 'bold' }}
            >
              number
            </Animated.Text>
            .
          </Text>
        )}
      </View>
      <View>
        <TextInput
          {...props}
          secureTextEntry={isHide}
          textContentType="password"
        />
        <TouchableOpacity
          style={styles.HidePassword}
          onPress={() => toggleHide(isHide)}
        >
          <Icon
            name={isHide === false ? 'eye' : 'eye-off'}
            size={24}
            color={LightText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.CheckMatch}>
        <Animated.Text style={{ color: MatchColor, fontWeight: 'bold' }}>
          {props.MatchString}
        </Animated.Text>
      </View>
    </View>
  );
}

export default AnimatedIcon;
