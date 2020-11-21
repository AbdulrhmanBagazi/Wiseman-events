import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenGet, UserTokenRemove } from '../../../Config/AsyncStorage'
import { URL } from '../../../Config/Config'
import axios from 'axios'
import { PrimaryColor } from '../../../Config/ColorPalette'

function Splash({ store }) {
  const { signOut, selectLanguage, Verify, Profile, signIn, Notification } = React.useContext(AuthContext)

  React.useEffect(() => {
    CheckLanguage = async () => {
      await store.getLanguge()
      var Token = await UserTokenGet()
      if (store.Language === null) {
        selectLanguage()

        return
      } else if (Token) {
        axios
          .get(URL + '/user/authhenticate', {
            headers: {
              Authorization: Token,
              'Cache-Control': 'no-cache',
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response.status === 200) {
              await store.setData(response.data)
              await store.setToken(Token)
              // await UserTokenRemove()

              if (!response.data.user.verify) {
                Verify()
                return
              } else if (!response.data.user.profile) {
                Profile()
                return
              } else if (!response.data.user.notification) {
                Notification()
                return
              } else {
                signIn()
                return
              }
            }
          })
          .catch(async (error) => {
            // console.log(error)
            if (error.response) {
              if (error.response.status) {
                if (error.response.status === 401) {
                  await UserTokenRemove()
                  signOut()
                  return
                } else {
                  await UserTokenRemove()
                  signOut()
                  return
                }
              }
            } else {
              await UserTokenRemove()
              signOut()
              return
            }
          })

        return
      } else if (!Token) {
        await UserTokenRemove()
        signOut()
        return
      }
    }

    CheckLanguage()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={PrimaryColor} />
    </View>
  )
}

export default inject('store')(observer(Splash))
