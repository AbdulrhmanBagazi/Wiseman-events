import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  I18nManager,
  Share,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from '../../../Config/Icons';
import styles from './Style';
// import { Rating } from 'react-native-ratings'
import { Entypo } from '@expo/vector-icons';
import { ProfilePageStrings } from '../../../Config/Strings';
import { inject, observer } from 'mobx-react';
import ProfileImage from './ProfileImage/ProfileImage';
import AnimatedProfileImage from '../../Components/AnimatedImageProfile/AnimatedImageProfile';
import { PrimaryColor } from '../../../Config/ColorPalette';

function Profile({ store, navigation }) {
  const [Data, setDataValue] = React.useState(null);
  const [isModal, setModal] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setValue();
    });

    return unsubscribe;
  }, [navigation]);

  const setValue = async () => {
    if (store.data.status !== null) {
      setDataValue(store.data.status.status);
    }

    return;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'www.google.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(
        '',
        I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
        [{ text: 'OK' }],
        {
          cancelable: false,
        }
      );
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.safe}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon style={styles.icon} name="settings" size={25} color="black" />
          </TouchableOpacity>
          <AnimatedProfileImage
            onPress={() => setModal(!isModal)}
            filename={store.profileImage}
            token={store.token}
          />
          <ProfileImage
            open={isModal}
            close={() => setModal(!isModal)}
            token={store.token}
          />
        </SafeAreaView>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {store.data.profile.first_name + ' ' + store.data.profile.last_name}
        </Text>
        <Text style={styles.rating} numberOfLines={2}>
          {store.data.nID + ' (' + store.data.phone + ')'}
        </Text>
        {/* <Text style={styles.balance}>
          {I18nManager.isRTL ? 'رصيد:' : 'Balance:'}
          <Text style={{ color: 'black' }}>
            2000<Text style={styles.balance}>sar</Text>
          </Text>
        </Text> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.about}>
          <View style={styles.aboutE}>
            <Text style={styles.aboutT}>
              {I18nManager.isRTL
                ? 'معلومات الملف الشخصي'
                : 'Profile information'}
            </Text>
          </View>
          <View style={styles.aboutB}>
            {/* <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Contact')}>
              <View
                style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.leftText}>{ProfilePageStrings.Contact}</Text>
              </View>
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => navigation.navigate('Status')}
            >
              <View style={stylesmain.ViewStart}>
                <Text style={styles.leftText}>{ProfilePageStrings.status}</Text>
              </View>
              <View style={stylesmain.ViewEnd}>
                {I18nManager.isRTL ? (
                  <Text
                    style={
                      Data === null ? styles.rightTextNull : styles.rightText
                    }
                  >
                    {Data === null
                      ? ProfilePageStrings.notspecifiedyet
                      : Data === 'Full-Time'
                      ? 'متفرغ'
                      : Data === 'Student'
                      ? 'طالب'
                      : 'موظف'}
                  </Text>
                ) : (
                  <Text
                    style={
                      Data === null ? styles.rightTextNull : styles.rightText
                    }
                  >
                    {Data === null ? ProfilePageStrings.notspecifiedyet : Data}
                  </Text>
                )}
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => navigation.navigate('Earnings')}
            >
              <View style={stylesmain.ViewStart}>
                <Text style={styles.leftText}>
                  {ProfilePageStrings.Earnings}
                </Text>
              </View>
              <View style={stylesmain.ViewEnd}>
                {/* <Text style={styles.rightText}>2000/sar</Text> */}
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
                {store.EarningsBadge ? <View style={stylesmain.Badge} /> : null}
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Levels')}>
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
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => navigation.navigate('IBAN')}
            >
              <View style={stylesmain.ViewStart}>
                <Text style={styles.leftText}>{ProfilePageStrings.IBAN}</Text>
              </View>
              <View style={stylesmain.ViewEnd}>
                <Entypo
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={18}
                  color="#C6C9CD"
                />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => onShare()}
            >
              <View style={stylesmain.ViewStart}>
                <Text style={styles.leftText}>{ProfilePageStrings.Invite}</Text>
              </View>
              <View style={stylesmain.ViewEnd}>
                <Icon name="share-2" size={18} color="#C6C9CD" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={() => navigation.navigate('Support')}
            >
              <View style={stylesmain.ViewStart}>
                <Text style={styles.leftText}>
                  {ProfilePageStrings.Support}
                </Text>
              </View>
              <View style={stylesmain.ViewEnd}>
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
  );
}

export default inject('store')(observer(Profile));

const stylesmain = StyleSheet.create({
  ViewStart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  ViewEnd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  Badge: {
    position: 'absolute',
    backgroundColor: PrimaryColor,
    borderRadius: 10 / 2,
    width: 10,
    height: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    right: 20,
  },
});
