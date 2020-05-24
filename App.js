import * as React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'mobx-react'
import Store from './Config/Mobx'
import useCachedResources from './Hooks/useCachedResources'
import 'mobx-react-lite/batchingForReactNative'

//Hooks
import { AuthContext } from './Hooks/Context'
//Screens
import SignIn from './Screens/Auth/SignIn/SignInScreen'
import SignUp from './Screens/Auth/SignUp/SignUpScreen'
import Home from './Screens/Main/Home/HomeScreen'
import Profile from './Screens/Main/Profile/ProfileScreen'
import Splash from './Screens/Splash/Splash'

const HomeStack = createStackNavigator()
const HomeScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()
const ProfileScreens = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator()
const TabsScreens = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreens} />
      <Tabs.Screen name="Profile" component={ProfileScreens} />
    </Tabs.Navigator>
  )
}

const AuthStack = createStackNavigator()
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  )
}

const Root = createStackNavigator()
const RootScreens = ({ userToken }) => {
  return (
    <Root.Navigator headerMode="none">
      {userToken ? (
        <Root.Screen
          name="Main"
          component={TabsScreens}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <Root.Screen
          name="Auth"
          component={AuthScreens}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </Root.Navigator>
  )
}

export default () => {
  const isLoadingComplete = useCachedResources()

  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  const auth = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false)
        setUserToken('Token')
      },
      signOut: () => {
        setIsLoading(false)
        setUserToken(null)
      },
    }
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    if (isLoading) {
      return (
        <Provider store={Store}>
          <AuthContext.Provider value={auth}>
            <Splash />
          </AuthContext.Provider>
        </Provider>
      )
    }

    return (
      <Provider store={Store}>
        <AuthContext.Provider value={auth}>
          <NavigationContainer>
            <RootScreens userToken={userToken} />
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    )
  }
}
