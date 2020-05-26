import * as React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'mobx-react'
import Store from './Config/Mobx'
import 'mobx-react-lite/batchingForReactNative'

//Hooks
import { AuthContext } from './Hooks/Context'
import useCachedResources from './Hooks/useCachedResources'
//Config
import { HeaderTitles } from './Config/Strings'
//Screens
import SignIn from './Screens/Auth/SignIn/SignInScreen'
import SignUp from './Screens/Auth/SignUp/SignUpScreen'
import Home from './Screens/Main/Home/HomeScreen'
import Profile from './Screens/Main/Profile/ProfileScreen'
import Splash from './Screens/Splash/Splash'
import LanguageChange from './Screens/LanguageChange/LanguageChange'

const HomeStack = createStackNavigator()
const HomeScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ title: HeaderTitles.Home }} name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()
const ProfileScreens = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen options={{ title: HeaderTitles.Profile }} name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator()
const TabsScreens = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen options={{ title: HeaderTitles.Home }} name="Home" component={HomeScreens} />
      <Tabs.Screen options={{ title: HeaderTitles.Profile }} name="Profile" component={ProfileScreens} />
    </Tabs.Navigator>
  )
}

const AuthStack = createStackNavigator()
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{ title: HeaderTitles.SignIn }} name="SignIn" component={SignIn} />
      <AuthStack.Screen options={{ title: HeaderTitles.SignUp }} name="SignUp" component={SignUp} />
      <AuthStack.Screen
        options={{ title: HeaderTitles.Language }}
        name="Language"
        component={LanguageChange}
      />
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
