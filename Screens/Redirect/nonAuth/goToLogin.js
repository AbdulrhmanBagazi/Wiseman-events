import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { width, height } from '../../../Config/Layout';
import { PrimaryColor } from '../../../Config/ColorPalette';
import { NonAuthStrings } from '../../../Config/Strings';

function goToLogin({ navigation }) {
  return (
    <View style={styles.Container}>
      <View style={styles.MainView}>
        <Image
          style={styles.Image}
          source={require('../../../assets/completedjobillustration.png')}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        style={styles.Button}
      >
        <Text style={styles.ButtonText}>{NonAuthStrings.Goto}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default inject('store')(observer(goToLogin));

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MainView: {
    width,
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  Button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width,
    borderRadius: 5,
    height: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  ButtonText: { color: PrimaryColor, fontWeight: 'bold', fontSize: 14 },
  Image: { height: height / 6, resizeMode: 'contain' },
});
