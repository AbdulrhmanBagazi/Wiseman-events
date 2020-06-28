import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { AuthContext } from '../../../Hooks/Context'
import styles from './Style'
import TopCard from './TopCard'

function Home({ store }) {
  const { signOut } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log(store.data)
  })

  const Logout = async () => {
    await UserTokenRemove()
    signOut()

    return
  }

  return (
    <ScrollView>
      <View style={styles.Container}>
        <TopCard />
      </View>
      <TouchableHighlight onPress={() => Logout()}>
        <Text>Home</Text>
      </TouchableHighlight>
    </ScrollView>
  )
}

export default inject('store')(observer(Home))
