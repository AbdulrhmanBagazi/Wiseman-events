import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { URL } from '../../../Config/Config'
import { AuthContext } from '../../../Hooks/Context'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'
import axios from 'axios'

function Home({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(URL + '/user/mainPageJobs', {
          headers: {
            Authorization: store.token,
          },
        })
        .then(async (response) => {
          // console.log(response)
          if (response.status === 200) {
            if (response.data.check === 'success') {
              await store.setfewevents(response.data.data)
              setTimeout(() => {
                setLoading(false)
              }, 2000)
              return
            } else if (response.data.check === 'fail') {
              return
            }
          }
        })
        .catch(async (error) => {
          console.log(error)
        })
    }
    return
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <TopCard Data={store.banner} />

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 177 }}>
            <ActivityIndicator size="small" color={PrimaryColor} />
          </View>
        ) : (
          store.section.map((data) => {
            return (
              <JobCard
                click={navigation.navigate}
                More={() => navigation.navigate('AllJobs')}
                key={data.id}
                Title={data.Title}
                TitleAr={data.TitleAr}
                fewdata={store.fewdata}
                Loading={store.feweventsloading}
                data={store.fewevents}
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
