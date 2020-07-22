import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { HomePageStrings } from '../../../Config/Strings'
import { URL } from '../../../Config/Config'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'
import axios from 'axios'

function Home({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(true)
  const [isSoon, setSoon] = React.useState(false)

  React.useEffect(() => {
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
            }
            await store.setfewevents(response.data.data)
            setLoading(false)
            return
          } else if (response.data.check === 'fail') {
            setError(false)
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error.response)
        setError(false)

        return
      })

    return
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <TopCard Data={store.banner} />
        {!isError ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
            {isSoon ? (
              <Text style={styles.soon}>{HomePageStrings.Soon}</Text>
            ) : (
              <Text style={styles.error}>{HomePageStrings.Error}</Text>
            )}
          </View>
        ) : isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
            <ActivityIndicator size="small" color={PrimaryColor} />
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
  )
}

export default inject('store')(observer(Home))
