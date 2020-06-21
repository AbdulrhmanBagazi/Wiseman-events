import * as React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { Provider } from 'mobx-react'
import Store from './Config/Mobx'
import 'mobx-react-lite/batchingForReactNative'

//Hooks
import { AuthContext } from './Hooks/Context'
import useCachedResources from './Hooks/useCachedResources'
//Config
import { HeaderTitles } from './Config/Strings'
//Screens
import LanguageChange from './Screens/Redirect/LanguageChange/LanguageChange'
import SignIn from './Screens/Auth/SignIn/SignInScreen'
import SignUp from './Screens/Auth/SignUp/SignUpScreen'
import Reset from './Screens/Auth/ResetPassword/Reset'
import GetCode from './Screens/Auth/ResetPassword/GetCode'
import ResetSuccess from './Screens/Auth/ResetPassword/ResetSuccess'
import OTP from './Screens/Auth/OTP/OTP'
import Notification from './Screens/Auth/Notification/Notification'
import NotificationSuccess from './Screens/Auth/Notification/NotificationSuccess'
import CreateProfile from './Screens/Auth/CreateProfile/CreateProfile'

//
import Home from './Screens/Main/Home/HomeScreen'
import Profile from './Screens/Main/Profile/ProfileScreen'
import Splash from './Screens/Redirect/Splash/Splash'

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
      <AuthStack.Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="SignIn"
        component={SignIn}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.SignUp,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="SignUp"
        component={SignUp}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.Reset,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="Reset"
        component={Reset}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.GetCode,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="GetCode"
        component={GetCode}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="ResetSuccess"
        component={ResetSuccess}
      />
    </AuthStack.Navigator>
  )
}

const CreateProfileStack = createStackNavigator()
const CreateProfileScreens = () => {
  return (
    <CreateProfileStack.Navigator>
      <CreateProfileStack.Screen
        options={{
          title: HeaderTitles.CreateProfile,
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="CreateProfile"
        component={CreateProfile}
      />
    </CreateProfileStack.Navigator>
  )
}

const VerifyStack = createStackNavigator()
const VerifyScreens = () => {
  return (
    <VerifyStack.Navigator>
      <VerifyStack.Screen
        options={{
          headerShown: true,
          title: HeaderTitles.OTP,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTintColor: 'black',
        }}
        name="OTP"
        component={OTP}
      />
    </VerifyStack.Navigator>
  )
}

const Root = createStackNavigator()
const RootScreens = ({ authenticated, selectLanguage, verify, profile }) => {
  return (
    <Root.Navigator headerMode="none">
      {authenticated ? (
        <Root.Screen
          name="Main"
          component={TabsScreens}
          options={{
            animationEnabled: false,
          }}
        />
      ) : selectLanguage ? (
        <Root.Screen
          name="LanguageChange"
          component={LanguageChange}
          options={{
            animationEnabled: false,
          }}
        />
      ) : verify ? (
        <Root.Screen
          name="Verify"
          component={VerifyScreens}
          options={{
            animationEnabled: false,
          }}
        />
      ) : profile ? (
        <Root.Screen
          name="profile"
          component={CreateProfileScreens}
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
  const [isAuth, setIsAuth] = React.useState(false)
  const [isNew, setNew] = React.useState(false)
  const [isVerify, setVerify] = React.useState(false)
  const [isProfile, setProfile] = React.useState(false)

  const auth = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false)
        setIsAuth(true)
        setVerify(false)
        setProfile(false)
      },
      signOut: () => {
        setIsLoading(false)
        setIsAuth(false)
      },
      selectLanguage: () => {
        setIsLoading(false)
        setIsAuth(false)
        setNew(true)
      },
      Verify: () => {
        setIsLoading(false)
        setIsAuth(false)
        setVerify(true)
      },
      Profile: () => {
        setIsLoading(false)
        setIsAuth(false)
        setVerify(false)
        setProfile(true)
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
          <NavigationContainer
            theme={{
              colors: {
                background: '#fff',
              },
            }}>
            <RootScreens
              authenticated={isAuth}
              selectLanguage={isNew}
              verify={isVerify}
              profile={isProfile}
            />
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    )
  }
}
