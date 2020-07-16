import React from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, I18nManager, Image } from 'react-native'
import Icon from '../../../Config/Icons'
import styles from './Style'
import { Rating } from 'react-native-ratings'
import { Entypo } from '@expo/vector-icons'
import { ProfilePageStrings } from '../../../Config/Strings'
import { inject, observer } from 'mobx-react'

function Profile({ store, navigation }) {
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.safe}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Icon style={styles.icon} name="settings" size={25} color="black" />
          </TouchableOpacity>
          <View style={styles.Image}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>2</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {store.data.profile.name}
        </Text>
        <Text style={styles.balance}>
          {I18nManager.isRTL ? 'رصيد:' : 'Balance:'}{' '}
          <Text style={{ color: 'black' }}>
            2000<Text style={styles.balance}>sar</Text>
          </Text>
        </Text>
      </View>
      <View style={styles.rating}>
        <Rating type="star" ratingCount={5} startingValue={4.5} imageSize={16} />
        <Text style={styles.ratingText}>4.7</Text>
        <Text style={styles.ratingTextNumber}>(12)</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.about}>
          <View style={styles.aboutE}>
            <Text style={styles.aboutT}>{I18nManager.isRTL ? 'معلومات الشخصية' : 'Profile information'}</Text>
          </View>
          <View style={styles.aboutB}>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Status')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.status}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                {store.data.status === null ? (
                  <Text style={styles.rightTextNull}>{ProfilePageStrings.notspecifiedyet}</Text>
                ) : (
                  <Text style={styles.rightText}>2</Text>
                )}
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Earnings')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.Earnings}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Text style={styles.rightText}>2000/sar</Text>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Levels')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.Levels}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Text style={styles.rightText}>
                  2 <Text style={{ color: '#C6C9CD' }}>(10)</Text>
                </Text>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('IBAN')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.IBAN}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Invite')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.Invite}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Support')}>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.Support}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default inject('store')(observer(Profile))
