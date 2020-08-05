import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, I18nManager } from 'react-native'
import { inject, observer } from 'mobx-react'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { HomePageStrings } from '../../../Config/Strings'
import { URL } from '../../../Config/Config'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'
import axios from 'axios'
import RefreshButton from '../../Components/RefreshButton/RefreshButton'
import Icon from '../../../Config/Icons'

function Home({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(true)
  const [isSoon, setSoon] = React.useState(false)
  const [isRefresh, setRefresh] = React.useState(false)
  const [isStatus, setStatus] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    setError(true)
    setSoon(false)
    const unsubscribe = navigation.addListener('focus', () => {
      if (store.data.status === null) {
        setStatus(true)
      } else {
        setStatus(false)
      }
      return
    })

    axios
      .get(URL + '/user/mainPageJobs', {
        headers: {
          Authorization: store.token,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            if (response.data.data.length === 0) {
              setError(false)
              setSoon(true)
              setLoading(false)
            } else {
              await store.setfewevents(response.data.data)
              setLoading(false)
            }

            return
          } else if (response.data.check === 'fail') {
            setError(false)
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(false)

        return
      })

    return unsubscribe
  }, [isRefresh, navigation])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <TopCard Data={store.banner} />
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : !isError ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
              {isSoon ? (
                <View>
                  <Text style={styles.soon}>{HomePageStrings.Soon}</Text>
                  <RefreshButton onPress={() => setRefresh(!isRefresh)} />
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
              )
            })
          )}
        </View>
      </ScrollView>
      {isStatus ? (
        <View style={styles.Notify}>
          <View style={{ flex: 4 }}>
            <Text style={styles.NotifyText}>{HomePageStrings.Status}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.NotifyButton} onPress={() => navigation.navigate('Status')}>
              <Icon name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'} size={24} color={PrimaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default inject('store')(observer(Home))
