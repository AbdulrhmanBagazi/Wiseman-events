// import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    var loadResourcesAndDataAsync = async () => {
      try {
        // SplashScreen.preventAutoHideAsync()
        // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        // })
        // SplashScreen.hideAsync()
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // console.log(e)
      } finally {
        setLoadingComplete(true);
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
