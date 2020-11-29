import React from 'react'
import { View, ActivityIndicator, Image, Animated } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenGet, UserTokenRemove } from '../../../Config/AsyncStorage'
import { URL } from '../../../Config/Config'
import axios from 'axios'
import { height, width } from '../../../Config/Layout'

function Splash({ store }) {
  const { signOut, selectLanguage, Verify, Profile, signIn, Notification } = React.useContext(AuthContext)
  const [ImageLoad] = React.useState(new Animated.Value(0))

  const Start = async () => {
    Animated.timing(ImageLoad, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

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
                setTimeout(() => {
                  Verify()
                }, 1000)
                return
              } else if (!response.data.user.profile) {
                setTimeout(() => {
                  Profile()
                }, 1000)
                return
              } else if (!response.data.user.notification) {
                setTimeout(() => {
                  Notification()
                }, 1000)
                return
              } else {
                setTimeout(() => {
                  signIn()
                }, 1000)
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Animated.Image
        style={{
          width,
          resizeMode: 'contain',
          opacity: ImageLoad,
        }}
        onLoadEnd={() => Start()}
        source={require('../../../assets/LL.png')}
      />
    </View>
  )
}

export default inject('store')(observer(Splash))
