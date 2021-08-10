import * as React from 'react';
import 'react-native-gesture-handler';
import * as Analytics from 'expo-firebase-analytics';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Provider } from 'mobx-react';
import Store from './Config/Mobx';
import TabIcon from './Config/TabIcon';
import { PrimaryColor, SecondaryText } from './Config/ColorPalette';
//Hooks
import { AuthContext } from './Hooks/Context';
import useCachedResources from './Hooks/useCachedResources';
//Config
import { HeaderTitles } from './Config/Strings';
//Screens
import LanguageChange from './Screens/Redirect/LanguageChange/LanguageChange';
import SignIn from './Screens/Auth/SignIn/SignInScreen';
import SignUp from './Screens/Auth/SignUp/SignUpScreen';
import Reset from './Screens/Auth/ResetPassword/Reset';
import GetCode from './Screens/Auth/ResetPassword/GetCode';
import ResetSuccess from './Screens/Auth/ResetPassword/ResetSuccess';
import OTP from './Screens/Auth/OTP/OTP';
import Notification from './Screens/Auth/Notification/Notification';
import CreateProfile from './Screens/Auth/CreateProfile/CreateProfile';
//
import Home from './Screens/Main/Home/HomeScreen';
import AllJobs from './Screens/Main/Home/AllJobs/AllJobs';
import History from './Screens/Main/History/History';
import WorkScheduleUser from './Screens/Main/History/WorkScheduleUser';
import NotificationMain from './Screens/Main/NotificationMain/NotificationMain';
import Profile from './Screens/Main/Profile/ProfileScreen';
import Splash from './Screens/Redirect/Splash/Splash';
import SingleJob from './Screens/Main/Home/SingleJob/SingleJob';
import WorkSchedule from './Screens/Main/Home/SingleJob/WorkSchedule';
import Application from './Screens/Main/Home/Application/Application';
//
import Status from './Screens/Main/Profile/Status/Status';
import Earnings from './Screens/Main/Profile/Earnings/Earnings';
import Levels from './Screens/Main/Profile/Levels/Levels';
import IBAN from './Screens/Main/Profile/IBAN/IBAN';
// import Invite from './Screens/Main/Profile/Invite/Invite'
import Support from './Screens/Main/Profile/Support/Support';
import Settings from './Screens/Main/Profile/Settings/Settings';
import Contact from './Screens/Main/Profile/Contact/Contact';
import UpdateProfile from './Screens/Main/Profile/Settings/Profileupdate/Updateprofile';
//
import LanguageSettings from './Screens/Main/Profile/Settings/LanguageSettings';
import Rateus from './Screens/Main/Profile/Settings/Rateus';
import NotificationSettings from './Screens/Main/Profile/Settings/NotificationSettings';
import CompleteDetails from './Screens/Main/History/CompleteDetails';
import ChangePassword from './Screens/Main/Profile/Settings/ChangePassword';
//
import Svg, { Defs, G, Path } from 'react-native-svg';
//
import NonAuth from './Screens/Redirect/nonAuth/nonAuth';
import goToLogin from './Screens/Redirect/nonAuth/goToLogin';
import noalert from './Screens/Redirect/nonAuth/noalert';
import noProfile from './Screens/Redirect/nonAuth/noProfile';
import AllJobsnonauth from './Screens/Main/Home/AllJobs/AllJobsnonauth';
import ApplicationnonAuth from './Screens/Main/Home/Application/ApplicationnonAuth';
import WorkSchedulenonAuth from './Screens/Main/Home/SingleJob/WorkSchedulenonAuth';
//
import { StatusBar } from 'expo-status-bar';

Sentry.init({
  dsn: 'https://5caff191c9cb4fd5be537ab3eeac1907@o489391.ingest.sentry.io/5551545',
  enableNative: false,
  debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  enableInExpoDevelopment: false,
});

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

function LogoTitle() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 300 300"
    >
      <Defs />

      <G transform="translate(-597.908 -352.154)">
        <Path
          fill="#AF0029"
          class="b"
          d="M851.006,472.22a17.413,17.413,0,0,0-20.842-26.9,99.834,99.834,0,0,0-182,52.312c-.067,1.465-.1,2.931-.1,4.411,0,1.443.03,2.886.1,4.313v17.44H632.547a14.421,14.421,0,0,0-14.4,14.4v7.476h39.941a99.914,99.914,0,0,0,179.721,0h21.925V488.225A19.042,19.042,0,0,0,851.006,472.22Zm-20.587-17.985a8.869,8.869,0,0,1,.665-.643,4.038,4.038,0,0,1,.4-.329,1.729,1.729,0,0,1,.239-.187c.194-.15.4-.291.613-.426.157-.1.313-.194.478-.284a.391.391,0,0,1,.119-.067,5.553,5.553,0,0,1,.516-.262c.082-.045.172-.082.262-.12.172-.074.344-.149.524-.209a9.851,9.851,0,0,1,3.431-.613,9.943,9.943,0,0,1,5.509,18.225,7.985,7.985,0,0,1-.688.418,8.473,8.473,0,0,1-.987.478c-.09.038-.179.075-.277.112a3.9,3.9,0,0,1-.448.158c-.187.067-.381.119-.576.172s-.4.1-.613.142c-.18.038-.359.068-.546.09a1.648,1.648,0,0,1-.209.03c-.12.015-.239.022-.366.03a6.966,6.966,0,0,1-.8.038,9.956,9.956,0,0,1-9.942-9.95c0-.172.007-.344.015-.509s.022-.343.037-.508a2.741,2.741,0,0,1,.045-.351,1.814,1.814,0,0,1,.03-.21,9.457,9.457,0,0,1,.478-1.839c.045-.127.09-.247.142-.366a7.875,7.875,0,0,1,.456-.949c.067-.135.142-.262.217-.389.1-.165.2-.322.306-.471a3.211,3.211,0,0,1,.246-.337,14.607,14.607,0,0,1,.725-.874Zm-86.788,9.09a9.6,9.6,0,0,1-.27-2.287,9.974,9.974,0,1,1,.27,2.287Zm27.965-2.287a9.956,9.956,0,1,1,4.2,8.118A9.95,9.95,0,0,1,771.6,461.037Zm28.235,0a9.955,9.955,0,1,1,4.2,8.118A9.949,9.949,0,0,1,799.83,461.037Zm-67.42,86.011c.082.1.172.21.246.322a9.453,9.453,0,0,1,1.226,2.153,4.342,4.342,0,0,1,.194.509,9.044,9.044,0,0,1,.314,1.1c.038.134.06.269.09.411.007.037.014.082.022.126q.044.258.067.516c.014.1.022.217.03.322a1.99,1.99,0,0,1,.022.3c.008.172.015.344.015.516a9.946,9.946,0,0,1-19.892,0c0-.172.007-.344.015-.516s.022-.336.038-.5a2.582,2.582,0,0,1,.045-.351c.007-.09.022-.18.037-.269.008-.052.015-.1.022-.142.03-.142.053-.277.09-.411.059-.277.134-.553.217-.822.045-.135.09-.277.142-.412s.112-.3.18-.448a9.362,9.362,0,0,1,1.2-2.079c.074-.112.165-.217.246-.322a10.32,10.32,0,0,1,1.361-1.375,9.937,9.937,0,0,1,1.623-1.1c.112-.067.231-.127.343-.18a8.89,8.89,0,0,1,.98-.418,4.778,4.778,0,0,1,.463-.157,9.773,9.773,0,0,1,1.936-.4c.165-.015.337-.03.509-.038s.336-.015.508-.015.344.007.509.015.344.022.508.038a9.772,9.772,0,0,1,1.936.4,4.784,4.784,0,0,1,.463.157,8.706,8.706,0,0,1,.972.418,3.066,3.066,0,0,1,.344.18,9.641,9.641,0,0,1,1.623,1.1A10.323,10.323,0,0,1,732.41,547.048Zm-29.266-1.091c.119.1.231.217.343.329s.225.225.33.344.209.239.313.366c.172.2.337.418.494.643a9.843,9.843,0,0,1,.994,1.809c.067.149.127.3.18.448s.1.277.142.412c.082.269.157.545.217.822.038.134.06.269.09.411.008.045.015.09.022.142.015.09.03.179.038.269a2.621,2.621,0,0,1,.045.351c.015.165.03.337.038.5s.015.344.015.516a9.946,9.946,0,0,1-19.892,0c0-.172.007-.344.015-.516a1.982,1.982,0,0,1,.022-.3c.007-.1.014-.217.03-.322q.023-.258.067-.516c.007-.045.015-.09.022-.126.03-.142.053-.277.09-.411a9.169,9.169,0,0,1,.314-1.1,4.1,4.1,0,0,1,.194-.509,9.4,9.4,0,0,1,1.226-2.153c.074-.112.164-.217.246-.322a10.276,10.276,0,0,1,1.361-1.375,9.6,9.6,0,0,1,1.622-1.1,3.2,3.2,0,0,1,.344-.18,10.006,10.006,0,0,1,2.691-.874c.112-.022.224-.038.336-.052a2.511,2.511,0,0,1,.352-.045c.164-.015.336-.03.5-.038s.344-.015.516-.015.344.007.508.015.344.022.509.038a9.667,9.667,0,0,1,1.936.4,4.773,4.773,0,0,1,.463.157,8.824,8.824,0,0,1,.979.418,3.842,3.842,0,0,1,.344.18,4.246,4.246,0,0,1,.449.262,3.382,3.382,0,0,1,.351.224,9.456,9.456,0,0,1,.823.613C702.935,545.762,703.039,545.859,703.144,545.957Zm149.11-7.76H625.617a6.93,6.93,0,0,1,6.93-6.93h23.091V488.225a11.59,11.59,0,0,1,11.594-11.594h27.031a11.591,11.591,0,0,1,11.594,11.6v43.035h7.67v-63.42a11.6,11.6,0,0,1,11.594-11.595h14.816l-2.713,3.013a10.322,10.322,0,0,0-1.338,1.876v.007a10.065,10.065,0,0,0-1.248,4.859v65.268h8.686v-44.89a10.076,10.076,0,0,0-2.587-6.742l-2.713-3.012h14.824a11.585,11.585,0,0,1,11.594,11.594v43.051H772.6v-44.89a10.08,10.08,0,0,0-2.587-6.742l-2.714-3.012h14.816a11.61,11.61,0,0,1,11.6,11.594v43.051h8.156v-44.89a10.076,10.076,0,0,0-2.587-6.742l-2.713-3.012h14.816a11.388,11.388,0,0,1,4.261.814,11.579,11.579,0,0,1,7.341,10.78v43.051h8.156v-44.89a10.08,10.08,0,0,0-2.587-6.742l-2.714-3.012H840.66c.254,0,.509.007.763.03a3.927,3.927,0,0,1,.418.03c.2.022.389.045.583.075.165.022.322.052.478.082.113.022.225.045.329.074a8.406,8.406,0,0,1,.874.232.418.418,0,0,1,.09.03c.15.045.3.1.449.15.038.015.074.022.1.038a11.6,11.6,0,0,1,7.505,10.854Z"
        />
        <Path
          fill="#AF0029"
          class="b"
          d="M691.417,509.685v41.085h7.992v-51.2A10.413,10.413,0,0,0,691.417,509.685Z"
          transform="translate(-14.669 -19.502)"
        />
      </G>
    </Svg>
  );
}

const HomeStack = createStackNavigator();
const HomeScreens = () => {
  return (
    <HomeStack.Navigator screenOptions={TransitionScreenOptions}>
      <HomeStack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
        name="Home"
        component={Home}
      />
      <HomeStack.Screen
        options={{
          title: HeaderTitles.AllJobs,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
        name="AllJobs"
        component={AllJobs}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileScreens = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const NotificationMaintack = createStackNavigator();
const NotificationMainScreens = () => {
  return (
    <NotificationMaintack.Navigator>
      <NotificationMaintack.Screen
        options={{ title: HeaderTitles.Notifications }}
        name="NotificationMain"
        component={NotificationMain}
      />
    </NotificationMaintack.Navigator>
  );
};

const HistoryStack = createStackNavigator();
const HistoryScreens = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        options={{ title: HeaderTitles.History }}
        name="History"
        component={History}
      />
    </HistoryStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const MainScreens = () => {
  return (
    <MainStack.Navigator screenOptions={TransitionScreenOptions}>
      <MainStack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        name="TabsScreens"
        component={TabsScreens}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.SingleJobs,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="SingleJob"
        component={SingleJob}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.WorkSchedule,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="WorkSchedule"
        component={WorkSchedule}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.WorkScheduleUser,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="WorkScheduleUser"
        component={WorkScheduleUser}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.Application,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="ApplyToJob"
        component={Application}
      />
      <MainStack.Screen
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="LanguageChange"
        component={LanguageChange}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.status,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Status"
        component={Status}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.CompleteDetails,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="CompleteDetails"
        component={CompleteDetails}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.Earnings,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Earnings"
        component={Earnings}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.UpdateProfile,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="UpdateProfile"
        component={UpdateProfile}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.Levels,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Levels"
        component={Levels}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.IBAN,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="IBAN"
        component={IBAN}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.Support,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Support"
        component={Support}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.Contact,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Contact"
        component={Contact}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.Settings,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Settings"
        component={Settings}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.LanguageSettings,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="LanguageSettings"
        component={LanguageSettings}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.NotificationSettings,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="NotificationSettings"
        component={NotificationSettings}
      />
      <MainStack.Screen
        options={{
          title: HeaderTitles.ChangePassword,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="ChangePassword"
        component={ChangePassword}
      />

      <MainStack.Screen
        options={{
          title: HeaderTitles.Rateus,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Rateus"
        component={Rateus}
      />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const TabsScreens = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color;

          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'History') {
            iconName = 'clipboard';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'NotificationMain') {
            iconName = 'bell';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            color = focused ? PrimaryColor : SecondaryText;
          }

          // You can return any component that you like here!
          return <TabIcon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: PrimaryColor,
        inactiveTintColor: SecondaryText,
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.5,
          shadowRadius: 16.0,
          elevation: 12,
          borderColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }} //title: HeaderTitles.Home,
        name="Home"
        component={HomeScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }} //title: HeaderTitles.History,
        name="History"
        component={HistoryScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }} //title: HeaderTitles.Notifications,
        name="NotificationMain"
        component={NotificationMainScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }} //title: HeaderTitles.Profile,
        name="Profile"
        component={ProfileScreens}
      />
    </Tabs.Navigator>
  );
};

const HomenonAuthStack = createStackNavigator();
const HomenonAuthScreens = () => {
  return (
    <HomenonAuthStack.Navigator screenOptions={TransitionScreenOptions}>
      <HomenonAuthStack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
        name="Home"
        component={NonAuth}
      />
      <HomenonAuthStack.Screen
        options={{
          title: HeaderTitles.AllJobs,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
        name="AllJobs"
        component={AllJobsnonauth}
      />
    </HomenonAuthStack.Navigator>
  );
};

const ProfilenonAuthStack = createStackNavigator();
const ProfilenonAuthScreens = () => {
  return (
    <ProfilenonAuthStack.Navigator>
      <ProfilenonAuthStack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={noProfile}
      />
    </ProfilenonAuthStack.Navigator>
  );
};

const NotificationnonAuthMaintack = createStackNavigator();
const NotificationnonAuthMainScreens = () => {
  return (
    <NotificationnonAuthMaintack.Navigator>
      <NotificationnonAuthMaintack.Screen
        options={{ title: HeaderTitles.Notifications }}
        name="NotificationMain"
        component={noalert}
      />
    </NotificationnonAuthMaintack.Navigator>
  );
};

const HistorynonAuthStack = createStackNavigator();
const HistorynonAuthScreens = () => {
  return (
    <HistorynonAuthStack.Navigator>
      <HistorynonAuthStack.Screen
        options={{ title: HeaderTitles.History }}
        name="History"
        component={goToLogin}
      />
    </HistorynonAuthStack.Navigator>
  );
};

const TabsnonAuth = createBottomTabNavigator();
const TabsnonAuthScreens = () => {
  return (
    <TabsnonAuth.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color;

          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'History') {
            iconName = 'clipboard';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'NotificationMain') {
            iconName = 'bell';
            color = focused ? PrimaryColor : SecondaryText;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            color = focused ? PrimaryColor : SecondaryText;
          }

          // You can return any component that you like here!
          return <TabIcon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: PrimaryColor,
        inactiveTintColor: SecondaryText,
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.5,
          shadowRadius: 16.0,
          elevation: 12,
          borderColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }}
        name="Home"
        component={HomenonAuthScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }}
        name="History"
        component={HistorynonAuthScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false }}
        name="NotificationMain"
        component={NotificationnonAuthMainScreens}
      />
      <Tabs.Screen
        options={{ headerBackTitleVisible: false, headerShown: false }}
        name="Profile"
        component={ProfilenonAuthScreens}
      />
    </TabsnonAuth.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator screenOptions={TransitionScreenOptions}>
      {/* new non auth routs */}
      <AuthStack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        name="nonAuth"
        component={TabsnonAuthScreens}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.SingleJobs,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="SingleJob"
        component={SingleJob}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.WorkSchedule,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="WorkSchedule"
        component={WorkSchedulenonAuth}
      />
      {/* <AuthStack.Screen
        options={{
          title: HeaderTitles.AllJobs,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
        name="AllJobs"
        component={AllJobsnonauth}
      /> */}
      <AuthStack.Screen
        options={{
          title: HeaderTitles.Application,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="ApplyToJob"
        component={ApplicationnonAuth}
      />
      {/* new non auth routs */}
      <AuthStack.Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
        name="SignIn"
        component={SignIn}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.SignUp,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="SignUp"
        component={SignUp}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.Reset,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="Reset"
        component={Reset}
      />
      <AuthStack.Screen
        options={{
          title: HeaderTitles.GetCode,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="GetCode"
        component={GetCode}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerLeft: null,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="ResetSuccess"
        component={ResetSuccess}
      />
    </AuthStack.Navigator>
  );
};

const CreateProfileStack = createStackNavigator();
const CreateProfileScreens = () => {
  return (
    <CreateProfileStack.Navigator>
      <CreateProfileStack.Screen
        options={{
          title: HeaderTitles.CreateProfile,
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="CreateProfile"
        component={CreateProfile}
      />
    </CreateProfileStack.Navigator>
  );
};

const VerifyStack = createStackNavigator();
const VerifyScreens = () => {
  return (
    <VerifyStack.Navigator>
      <VerifyStack.Screen
        options={{
          headerShown: true,
          title: HeaderTitles.OTP,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="OTP"
        component={OTP}
      />
    </VerifyStack.Navigator>
  );
};

const LanguageChangeStack = createStackNavigator();
const LanguageChangeScreens = () => {
  return (
    <LanguageChangeStack.Navigator>
      <LanguageChangeStack.Screen
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="LanguageChange"
        component={LanguageChange}
      />
    </LanguageChangeStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();
const NotificationScreens = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'black',
        }}
        name="Notification"
        component={Notification}
      />
    </NotificationStack.Navigator>
  );
};

const LoadingStack = createStackNavigator();
const LoadingScreens = () => {
  return (
    <LoadingStack.Navigator>
      <LoadingStack.Screen
        options={{
          headerShown: false,
        }}
        name="Loading"
        component={Splash}
      />
    </LoadingStack.Navigator>
  );
};

const Root = createStackNavigator();
const RootScreens = ({
  authenticated,
  selectLanguage,
  verify,
  profile,
  notification,
  loading,
}) => {
  return (
    <Root.Navigator headerMode="none" screenOptions={TransitionScreenOptions}>
      {loading ? (
        <Root.Screen
          name="Loading"
          component={LoadingScreens}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : authenticated ? (
        <Root.Screen
          name="Main"
          component={MainScreens} //TabsScreens
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : selectLanguage ? (
        <Root.Screen
          name="LanguageChange"
          component={LanguageChangeScreens}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : verify ? (
        <Root.Screen
          name="Verify"
          component={VerifyScreens}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : profile ? (
        <Root.Screen
          name="profile"
          component={CreateProfileScreens}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : notification ? (
        <Root.Screen
          name="notification"
          component={NotificationScreens}
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      ) : (
        <Root.Screen
          name="Auth"
          component={AuthScreens} //AuthScreens NotificationScreens
          options={
            {
              // animationEnabled: false,
            }
          }
        />
      )}
    </Root.Navigator>
  );
};

export default () => {
  const isLoadingComplete = useCachedResources();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isNew, setNew] = React.useState(false);
  const [isVerify, setVerify] = React.useState(false);
  const [isProfile, setProfile] = React.useState(false);
  const [isNotification, setNotification] = React.useState(false);
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const auth = React.useMemo(() => {
    return {
      signIn: () => {
        setIsAuth(true);
        setIsLoading(false);
        setVerify(false);
        setProfile(false);
        setNotification(false);
      },
      signOut: () => {
        setIsAuth(false);
        setIsLoading(false);
        setVerify(false);
        setProfile(false);
        setNotification(false);
      },
      selectLanguage: () => {
        setNew(true);
        setIsAuth(false);
        setIsLoading(false);
        setVerify(false);
        setProfile(false);
        setNotification(false);
      },
      Verify: () => {
        setVerify(true);
        setIsLoading(false);
        setIsAuth(false);
      },
      Profile: () => {
        setProfile(true);
        setIsLoading(false);
        setIsAuth(false);
        setVerify(false);
      },
      Notification: () => {
        setNotification(true);
        setIsLoading(false);
        setIsAuth(false);
        setVerify(false);
        setProfile(false);
      },
      Load: () => {
        setIsLoading(true);
        setNew(false);
        setIsAuth(false);
        setVerify(false);
        setProfile(false);
        setNotification(false);
      },
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={Store}>
        <StatusBar style="dark" />
        <AuthContext.Provider value={auth}>
          <NavigationContainer
            theme={{
              colors: {
                background: '#fff',
              },
            }}
            ref={navigationRef}
            onReady={() =>
              (routeNameRef.current =
                navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={() => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                // console.log(currentRouteName, currentRouteName)
                // The line below uses the expo-firebase-analytics tracker
                // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
                // Change this line to use another Mobile analytics SDK
                Analytics.setCurrentScreen(currentRouteName, currentRouteName);
              }

              // Save the current route name for later comparision
              routeNameRef.current = currentRouteName;
            }}
          >
            <RootScreens
              authenticated={isAuth}
              selectLanguage={isNew}
              verify={isVerify}
              profile={isProfile}
              notification={isNotification}
              loading={isLoading}
            />
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    );
  }
};
