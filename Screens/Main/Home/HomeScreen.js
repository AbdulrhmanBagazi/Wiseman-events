import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { AuthContext } from '../../../Hooks/Context'
import styles from './Style'
import TopCard from './TopCard'
import JobCard from './JobCard'

function Home({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext)

  // React.useEffect(() => {
  //   console.log(store.data)
  // })

  const Logout = async () => {
    await UserTokenRemove()
    signOut()

    return
  }

  return (
    <ScrollView>
      <View style={styles.Container}>
        <TopCard />
        <JobCard More={() => navigation.push('AllJobs')} />
        <JobCard />
      </View>
    </ScrollView>
  )
}

export default inject('store')(observer(Home))
