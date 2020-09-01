import React from 'react'
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  I18nManager,
  Image,
  ActivityIndicator,
} from 'react-native'
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
//
import Activejob from './Activejob'

function History({ store, navigation }) {
  const Scroll = React.useRef(null)
  const [isSelected, setSelected] = React.useState(0)
  const [refreshing, setrefreshing] = React.useState(false)
  const [Firstrefreshing, setFirstrefreshing] = React.useState(true)

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
    const unsubscribe = navigation.addListener('focus', () => {})

    RefreshMiddle()

    return unsubscribe
  }, [navigation])

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

            if (Firstrefreshing) {
              setFirstrefreshing(false)
            }

            return
          } else if (response.data.check === 'fail') {
            setrefreshing(false)
            if (Firstrefreshing) {
              setFirstrefreshing(false)
            }
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
          if (Firstrefreshing) {
            setFirstrefreshing(false)
          }
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
        if (Firstrefreshing) {
          setFirstrefreshing(false)
        }
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
      {Firstrefreshing ? (
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : null}
      <ScrollView
        pagingEnabled={true}
        scrollEventThrottle={16}
        horizontal={true}
        onScroll={(e) => check(e)}
        ref={Scroll}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.Container}>
          <Activejob
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={RefreshMiddle} tintColor={PrimaryColor} />
            }
            Data={store.history}
          />
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
          <View style={styles.Logo}>
            <Image style={styles.tinyLogo} source={require('../../../assets/completedjobillustration.png')} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default inject('store')(observer(History))

//completedjobillustration.png
//appliedjobillustration.png
//activejobillustrations.png
