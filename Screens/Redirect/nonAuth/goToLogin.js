import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { width, height } from '../../../Config/Layout'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { NonAuthStrings } from '../../../Config/Strings'

function goToLogin({ store, navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{ width, height: height / 5, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Image
          style={{ height: height / 6, resizeMode: 'contain' }}
          source={require('../../../assets/completedjobillustration.png')}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          width,
          borderRadius: 5,
          marginBottom: 12,
          height: 50,
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text style={{ color: PrimaryColor, fontWeight: 'bold', fontSize: 14 }}>{NonAuthStrings.Goto}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default inject('store')(observer(goToLogin))
