import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenGet, UserTokenRemove } from '../../../Config/AsyncStorage'
import { URL } from '../../../Config/Config'
import axios from 'axios'

function Splash({ store }) {
  const { signOut, selectLanguage, Verify, Profile, signIn } = React.useContext(AuthContext)

  React.useEffect(() => {
    CheckLanguage = async () => {
      await store.getLanguge()
      var Token = await UserTokenGet()

      if (store.Language === null) {
        setTimeout(() => {
          selectLanguage()
        }, 1000)

        return
      } else if (Token) {
        axios
          .get(URL + '/user/authhenticate', {
            headers: {
              Authorization: Token,
            },
          })
          .then(async (response) => {
            if (response.status === 200) {
              await store.setData(response.data.user)
              await store.setToken(Token)
              if (!response.data.user.verify) {
                Verify()
              } else if (!response.data.user.profile) {
                Profile()
              } else {
                signIn()
              }
              return
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              signOut()
              return
            } else {
              signOut()
              console.log(error)
            }
          })

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
