import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { AuthContextProvider, useAuth } from '@/context/authContext';


export const MainLayout = () =>{
  const {isAuthenticated} = useAuth()
  const segments = useSegments()
  const router = useRouter()

  console.log(isAuthenticated)
  // router.replace('noneNavScreens/signIn')
  useEffect(()=>{
    if( typeof isAuthenticated == undefined) return;
    const inApp = segments[0] =='(tabs)';

    if(isAuthenticated && inApp)
      {
        //redirect to home
        router.replace('(tabs)')
      }
    else if(isAuthenticated == false)
      {
        // redirect to signin
        router.replace('noneNavScreens/signIn')
      }

  },[isAuthenticated])
  return (
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="noneNavScreens" options={{ headerShown: false }} />
        {/* <Stack.Screen name="claims/unsubmitted" options={{ 
          presentation: 'fullScreenModal',
          title:"",
          headerLeft:() =>(
            <TouchableOpacity
              onPress={()=>router.back()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />       
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={()=>router.back()}>
            <AntDesign name="closecircleo" size={24} color="black"/>
          </TouchableOpacity>
          ),
          }} />




        <Stack.Screen name="noneNavScreens/settings/contactUs" options={{ 
          // presentation: 'fullScreenModal',
          headerStyle:{
            backgroundColor:'#064E89'
          },
          title:"",
          headerLeft:() =>(
            <BackBtn screenName={"Contact us"}/>
          ),
          headerRight: () => (
            <MaterialIcons name="notifications-active" size={25} color={"#fff"}/>
          ),
          }} />


        <Stack.Screen name="noneNavScreens/billing" options={{ 
          headerShown:false
          }} />
          <Stack.Screen name="noneNavScreens/claims" options={{ 
          headerShown:false
          }} />
          



        <Stack.Screen name="claims/processing" options={{ 
          // presentation: 'fullScreenModal',
          headerStyle:{
            backgroundColor:'#064E89'
          },
          title:"",
          headerLeft:() =>(
            <BackBtn screenName={"Claim"}/>
          ),
          headerRight: () => (
            <MaterialIcons name="notifications-active" size={25} color={"#fff"}/>
          ),
          }} />

        <Stack.Screen name="claims/thirdPartyDocuments" options={{ 
          presentation: 'fullScreenModal',
          headerStyle:{
            backgroundColor:'#064E89'
          },
          title:"",
          headerLeft:() =>(
            <BackBtn screenName={"Third Party Documents"}/>
          ),
          headerRight: () => (
            <MaterialIcons name="notifications-active" size={25} color={"#fff"}/>
          ),
          }} /> */}

      </Stack>
)
}




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthContextProvider>
      <MainLayout/>
    </AuthContextProvider>
  );

  // return (
  //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
  //     </Stack>
  //   </ThemeProvider>
  // );
}
