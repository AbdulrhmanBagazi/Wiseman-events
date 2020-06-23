import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../../Hooks/Context'

function Splash({ store }) {
  const { signOut, selectLanguage } = React.useContext(AuthContext)

  React.useEffect(() => {
    CheckLanguage = async () => {
      await store.getLanguge()

      if (store.Language === null) {
        setTimeout(() => {
          selectLanguage()
        }, 1000)

        return
      } else {
        setTimeout(() => {
          signOut()
        }, 1000)
        return
      }
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
