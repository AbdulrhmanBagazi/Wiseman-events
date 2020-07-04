import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { AuthContext } from '../../../Hooks/Context'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'

function Home({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext)

  // React.useEffect(() => {
  //   // const x = 'hi;hey'
  //   // var arr = x.split(';')
  //   // console.log(arr)
  //   // console.log(store.section)
  // })

  // const Logout = async () => {
  //   await UserTokenRemove()
  //   signOut()

  //   return
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <TopCard Data={store.banner} />

        {/* <View style={styles.Loading}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View> */}

        {store.section.map((data) => {
          return (
            <JobCard
              PushJob={() => navigation.navigate('SingleJob')}
              More={() => navigation.navigate('AllJobs')}
              key={data.id}
              Title={data.Title}
              TitleAr={data.TitleAr}
              fewdata={store.fewdata}
            />
          )
        })}
      </View>

      {/* <TouchableOpacity onPress={() => Logout()}>
        <Text>LogoutLogoutLogoutLogoutLogoutLogout</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}

export default inject('store')(observer(Home))
