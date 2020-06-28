import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { inject, observer } from 'mobx-react'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { AuthContext } from '../../../Hooks/Context'

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight onPress={() => Logout()}>
        <Text>Home</Text>
      </TouchableHighlight>
    </View>
  )
}

export default inject('store')(observer(Home))
