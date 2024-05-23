import { createContext, useContext, useEffect, useState,useRef } from "react";
import { fetchAllDataWF,getData, storeData,registerForPushNotificationsAsync } from "./api";

import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef<any>(null)
  const responseListener = useRef<any>(null);



    useEffect(()=>{
      registerForPushNotificationsAsync().then(token => {
        console.log(token)
        setExpoPushToken(token);
        sendTokenToServer(token);
      });
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //   setNotification(notification);
      console.log('Received notification:', notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // console.log(response);
        redirect(response.notification)
      });
      // setIsNotificationEnabled(previousState => !previousState)
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    },[])
  
  
    function redirect(notification:Notifications.Notification){
      const post = notification.request.content.data?.newsId
      if(post){
        // router.push({ pathname: `/NotePost`, params: { postNewsId:post } });
      }
    }
  
  
    const sendTokenToServer = async (token:any) => {
      try {
        // const response = await axios.post('https://tokens.igihe.com/saveToken.php', { token });
        // const response = await axios.post('http://192.168.1.171:8888/igiheApiTest/notification.php', { token });
        console.log('Token sent to server:', token);
      } catch (error) {
        console.error('Error sending token to server:', error);
      }
    };


    // useEffect(()=>{
    //     console.log(locale)
    // },[locale])

    useEffect(()=>{
      getLoggedUser()
    },[])
    useEffect(()=>{
        setTimeout(()=>{
            // setIsAuthenticated(false)
            getLoggedUser()
        },3000)
    },[user])

    const getLoggedUser = async () =>{
      const userNumber = await getData("userPhoneNumber");
      // console.log(userNumber)
      if(userNumber)
        {
          setUser(userNumber)
          setIsAuthenticated(true)
        }
        else{
          setIsAuthenticated(false)
        }
    }



    const login = async (email, password) => {
        try {
          const logins = {
            username: email,
            password: password,
          };
          // console.log('Login payload:', logins);
      
          const data = await fetchAllDataWF(`/users/login.php`, {
            method: 'POST',
            body: JSON.stringify(logins),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
          });
      
        //   console.log('Response data:', data);
          return data; // Return the response data if needed
        } catch (e) {
          console.error('Login error:', e);
          throw e;
        }
      };
      

    const logOut = async () =>{
        try {
          setIsAuthenticated(false)
          await storeData('userPhoneNumber', '')
        } catch (e) {
            throw e
        }
    }

    const registration = async (email,password,username,profileUrl) =>{
        try {
            
        } catch (e) {
            
        }
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,login,logOut,getLoggedUser,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if(!value){
        throw new Error("useAuth must be wrapped inside Authantication provider ");
    }

    return value
}