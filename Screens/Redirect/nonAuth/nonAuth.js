import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  I18nManager,
  Alert,
  RefreshControl,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { PrimaryColor } from '../../../Config/ColorPalette';
import { HomePageStrings } from '../../../Config/Strings';
import { URL } from '../../../Config/Config';
import styles from './Style';
import TopCard from '../../Main/Home/TopCard';
import JobCard from '../../Main/Home/JobCard';
import axios from 'axios';
import RefreshButton from '../../Components/RefreshButton/RefreshButton';
import Icon from '../../../Config/Icons';
//

function NonAuth({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(true);
  const [isSoon, setSoon] = React.useState(false);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isStatus, setStatus] = React.useState(false);
  //

  React.useEffect(() => {
    setLoading(true);
    setError(true);
    setSoon(false);
    const unsubscribe = navigation.addListener('focus', () => {
      if (store.data.status === null) {
        setStatus(true);
      } else {
        setStatus(false);
      }
      return;
    });

    axios
      .get(URL + '/user/mainPageJobsnonAuth')
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            if (response.data.data.length === 0) {
              setTimeout(() => {
                setError(false);
                setSoon(true);
                setLoading(false);
              }, 500);
            } else {
              await store.setfewevents(response.data.data);
              await store.setBanner(response.data.banner);
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }

            return;
          } else if (response.data.check === 'fail') {
            setError(false);
            return;
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(false);
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setError(false) }],
                {
                  cancelable: false,
                }
              );

              return;
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setError(false) }],
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
            [{ text: 'OK', onPress: () => setError(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });

    return unsubscribe;
  }, [isRefresh, navigation]);

  return (
    <View style={styles.nonAuthFlex}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => (isLoading ? null : setRefresh(!isRefresh))}
            tintColor={PrimaryColor}
          />
        }
      >
        <View style={styles.Container}>
          <TopCard Data={store.banner} />
          {isLoading ? (
            <View style={styles.nonAuthLoaidngView}>
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : !isError ? (
            <View style={styles.nonAuthLoaidngView}>
              {isSoon ? (
                <View>
                  <Text style={styles.soon}>{HomePageStrings.Soon}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.error}>{HomePageStrings.Error}</Text>
                  <RefreshButton onPress={() => setRefresh(!isRefresh)} />
                </View>
              )}
            </View>
          ) : (
            store.fewevents.map((data) => {
              return (
                <JobCard
                  click={navigation.navigate}
                  More={navigation.navigate}
                  ID={data.id}
                  key={data.id}
                  Title={data.Title}
                  TitleAr={data.TitleAr}
                  Total={data.Total}
                  data={data.events}
                  Loading={store.feweventsloading}
                  FadeIn={isLoading}
                />
              );
            })
          )}
        </View>
      </ScrollView>
      {isStatus ? (
        <View style={styles.Notify}>
          <View style={styles.nonAuthFlexFour}>
            <Text style={styles.NotifyText}>{HomePageStrings.Status}</Text>
          </View>

          <View style={styles.nonAuthFlex}>
            <TouchableOpacity
              style={styles.NotifyButton}
              onPress={() => navigation.navigate('Status')}
            >
              <Icon
                name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
                size={24}
                color={PrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default inject('store')(observer(NonAuth));
