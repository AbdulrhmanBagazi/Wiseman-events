import React from 'react'
import { View, Text, ScrollView, RefreshControl, Alert, I18nManager } from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { width } from '../../../Config/Layout'
import AnimatedTopTab from './AnimatedTopTab'
import Card from './Card'
import { PrimaryColor } from '../../../Config/ColorPalette'
import axios from 'axios'
import { URL } from '../../../Config/Config'
//
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenRemove } from '../../../Config/AsyncStorage'

function History({ store }) {
  const Scroll = React.useRef(null)
  const [isSelected, setSelected] = React.useState(null)
  const [refreshing, setrefreshing] = React.useState(false)
  //
  const { signOut } = React.useContext(AuthContext)

  const check = async (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10
    const currentPage = await Math.floor(xOffset / width)

    if (currentPage === -1) {
      return
    }
    if (currentPage !== isSelected) {
      setSelected(currentPage)
      return
    }

    return
  }

  const ScrollTo = async (val) => {
    const currentPage = await Math.floor(val * (width + 20))
    const xOffset = currentPage
    const currentPagetwo = await Math.floor(xOffset / width)

    if (currentPagetwo === -1) {
      return
    }
    if (currentPagetwo !== isSelected) {
      // console.log(currentPagetwo)
      Scroll.current.scrollTo({ x: currentPage })
      return
    }

    return
  }
  React.useEffect(() => {
    ScrollTo(1)
  }, [])

  //getApplication
  const RefreshMiddle = async () => {
    setrefreshing(true)
    axios
      .get(URL + '/user/getApplication', {
        headers: {
          Authorization: store.token,
        },
      })
      .then(async (response) => {
        // console.log(response)
        if (response.status === 200) {
          if (response.data.check === 'success') {
            await store.setHistoryData(response.data.application)
            setrefreshing(false)
            return
          } else if (response.data.check === 'fail') {
            setrefreshing(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setrefreshing(false) }],
              {
                cancelable: false,
              }
            )
            return
          }
        } else {
          setrefreshing(false)
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setrefreshing(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setrefreshing(false)
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove()
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              )

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setrefreshing(false) }],
                {
                  cancelable: false,
                }
              )
              return
            }
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setrefreshing(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <AnimatedTopTab
        Value={isSelected}
        onPressOne={() => ScrollTo(0)}
        onPressTwo={() => ScrollTo(1)}
        onPressThird={() => ScrollTo(2)}
      />
      <ScrollView
        pagingEnabled={true}
        scrollEventThrottle={16}
        horizontal={true}
        onScroll={(e) => check(e)}
        ref={Scroll}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text>1</Text>
        </View>
        <View style={styles.Container}>
          <Card
            Data={store.history}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={RefreshMiddle} tintColor={PrimaryColor} />
            }
          />
        </View>
        <View style={styles.Container}>
          <Text>3</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default inject('store')(observer(History))
