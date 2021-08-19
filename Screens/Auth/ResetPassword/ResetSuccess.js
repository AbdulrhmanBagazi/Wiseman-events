import React from 'react';
import * as Analytics from 'expo-firebase-analytics';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import { ResetPasswordString } from '../../../Config/Strings';

function ResetSuccess({ navigation }) {
  React.useEffect(() => {
    Analytics.logEvent('password_reset_success', {
      screen: 'ResetSuccess',
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/resetsuccessful.png')}
        />
      </View>
      <Text style={styles.Title}>{ResetPasswordString.ResetSuccessful}</Text>
      <Text style={styles.Slogan}>
        {ResetPasswordString.ResetSuccessfulSlogan}
      </Text>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.ButtonText}>{ResetPasswordString.Log}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ResetSuccess;
