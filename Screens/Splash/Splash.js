import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../Hooks/Context'

function Splash({ store }) {
  const { signOut } = React.useContext(AuthContext)
  React.useEffect(() => {
    async function CheckLanguage() {
      await store.ChangeLanguge()

      return setTimeout(() => {
        signOut()
      }, 1000)
    }

    CheckLanguage()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="orange" />
    </View>
  )
}

export default inject('store')(observer(Splash))
