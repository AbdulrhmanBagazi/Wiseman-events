import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
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
        <JobCard
          PushJob={() => navigation.navigate('SingleJob')}
          More={() => navigation.navigate('AllJobs')}
        />
      </View>
      <TouchableOpacity onPress={() => Logout()}>
        <Text>x</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default inject('store')(observer(Home))
