import React from 'react';
import { View, ActivityIndicator, Alert, I18nManager } from 'react-native';
import { inject, observer } from 'mobx-react';
import Card from './Card';
import styles from '../Style';
import axios from 'axios';
import { URL } from '../../../../Config/Config';
import RefreshButton from '../../../Components/RefreshButton/RefreshButton';
//
import { AuthContext } from '../../../../Hooks/Context';
import { UserTokenRemove } from '../../../../Config/AsyncStorage';

function AllJobs({ route, store, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [isData, setData] = React.useState([]);
  const [isError, setError] = React.useState(false);
  const [isRefresh, setRefresh] = React.useState(false);
  //
  const { signOut } = React.useContext(AuthContext);

  const { id } = route.params;

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
    setLoading(true);
    axios
      .get(URL + '/user/getJobs/' + id, {
        headers: {
          Authorization: store.token,
          'Cache-Control': 'no-cache',
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            await setData(response.data.data);
            setTimeout(() => {
              setLoading(false);
            }, 500);
            return;
          } else if (response.data.check === 'fail') {
            setError(true);
            setLoading(false);

            return;
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(true);
        setLoading(false);
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

    return;
  }, [isRefresh]);

  return (
    <View style={styles.AllJobsContainer}>
      {/* <Card /> */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#AF0029"
          style={styles.alignSelfLoading}
        />
      ) : isError ? (
        <View>
          <RefreshButton onPress={() => setRefresh(!isRefresh)} />
        </View>
      ) : (
        <Card
          Data={isData}
          PushJob={() => navigation.navigate('SingleJob')}
          click={navigation.navigate}
        />
      )}
    </View>
  );
}

export default inject('store')(observer(AllJobs));
