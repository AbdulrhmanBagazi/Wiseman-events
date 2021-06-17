import React from 'react';
import {
  View,
  FlatList,
  I18nManager,
  Alert,
  RefreshControl,
} from 'react-native';
import styles from './Style';
import { AuthContext } from '../../../../Hooks/Context';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { URL } from '../../../../Config/Config';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import Card from './Card';

function Earnings({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true);
  const { signOut } = React.useContext(AuthContext);
  const [isData, setData] = React.useState([]);
  const [isReload, setReload] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isLoading) {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        return;
      }

      return;
    });

    return unsubscribe;
  }, [navigation, isLoading]);

  React.useEffect(() => {
    axios
      .get(URL + '/user/Getuserpayment', {
        headers: {
          Authorization: store.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            setData(response.data.payments);
            setLoading(false);
            store.updEarningsBadgeage(0, false);

            // console.log(response.data.payments)
            return;
          } else if (response.data.check === 'fail') {
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
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
  }, [isReload]);

  return (
    <View style={styles.Container}>
      <FlatList
        data={isData}
        showsVerticalScrollIndicator={false}
        srtyle={styles.FlatListContainer}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => setReload(!isReload)}
            tintColor={PrimaryColor}
          />
        }
        contentContainerStyle={styles.PaddingContent}
        renderItem={({ item, index }) => <Card Data={item} />}
      />
    </View>
  );
}

export default inject('store')(observer(Earnings));
