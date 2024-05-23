import { Dimensions, ImageBackground,Image, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { createRef, useRef, useState } from 'react'
import { Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import ReUsableButton from '@/components/reUsable/ReUsableButton'
import { useRouter } from 'expo-router'
import Loading from '@/components/reUsable/static/Loading'
import CustomKeyBoardView from '@/components/reUsable/static/CustomKeyBoardView'
import { StatusBar as StBar } from 'expo-status-bar'
import { useAuth } from '@/context/authContext'
import ShadowedSection from '@/components/reUsable/shadowedSection'
import { storeData } from '@/context/api'

const LoginScreen = () => {
    const router = useRouter()
    const [errorSms,setErrorSms] = useState('')
    const ref = useRef()
    const passwordInputRef = createRef();
    const {login,getLoggedUser,setUser} = useAuth()

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [userName,setUserName] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
    


  const storeDataSequentially = async (key: string, value: any) => {
    try {
      await storeData(key, value);
    } catch (error) {
      throw error; // Propagate the error to stop further processing
    }
  };

  const handleLogin = async () =>{
    setLoading(true)
    if(!emailRef.current || !passwordRef.current)
        {
            Alert.alert('Sign In',"Please fill All Fields");
            return;
        }
        try {
            const data = await login(emailRef.current, passwordRef.current);
            setLoading(false)
            if(data.message?.status === 200)
                {
                    await storeDataSequentially('userPhoneNumber', emailRef.current);
                    await storeDataSequentially('userId', data?.user.userID);
                    setUser(emailRef.current)
                    // await storeDataSequentially('UserName', data?.message?.user.userID);
                    router.replace('/(tabs)')
                }
            else
                setErrorSms(data?.message?.message)
            // console.log('Login successful:', data);
            
          } catch (error) {
            setLoading(false)
            console.error('Login failed:', error);
          }

        

    // router.push('/(tabs)')
  }


  return (
    <>
    <StBar style='dark'/>
      <SafeAreaView style={{
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,backgroundColor:'#fff'
      }}
      />
  <CustomKeyBoardView>
       
            <View style={styles.mainSection}>
            <Image 
        source={require('@/assets/images/logo.png')}
        style={{
            // width:'20%',
            height:140,
            aspectRatio:1,
            objectFit:'contain',
            marginBottom:20
        }}
        />
    <Text style={{
        fontSize:22,
        fontWeight:'700'
    }}
    >Log into Edusphere</Text>
                <View style={styles.loginForm}>
                    
                        <ShadowedSection style={styles.shadowInput}>
                            <View style={styles.formFieldSection}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Phone Number"
                                    placeholderTextColor={"#787878"}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    blurOnSubmit={false}
                                    onChangeText={value=> emailRef.current=value}
                                    returnKeyLabel='Done'
                                    returnKeyType={'done'}
                                />
                                </View>
                        </ShadowedSection>
                    
                        <ShadowedSection style={styles.shadowInput}>
                            <View style={styles.formFieldSection}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor={"#787878"}
                                    blurOnSubmit={false}
                                    secureTextEntry={!showPassword}
                                    onChangeText={value=> passwordRef.current=value}
                                />
                                {/* <Feather name="eye" size={24} color="black" /> */}
                                <TouchableOpacity onPress={toggleShowPassword}>
                                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </ShadowedSection>


                </View>
                    <View style={{width:width*90/100,}}>
                        <Text style={styles.loginError}>{errorSms}</Text>
                        {
                            loading?(
                                <View style={{alignItems:'center'}}>
                                    <Loading size={60}/>
                                </View>
                                
                            ):(
                                <ReUsableButton 
                                  title="Login"
                                  onPress={() => handleLogin()}
                                  style={{
                                      backgroundColor: '#6A8137',
                                      TextStyle: { color: '#fff', fontSize: 16, fontWeight: '700' }
                                  }} children={undefined}/>
                            )
                            
                        }
                    
                </View>
                <View style={styles.haveAnAccount}>
                    <Pressable
                    //   onPress={()=>router.push('/signIn')}
                    >
                      <Text style={{color:'#6A8137',fontSize:16,fontWeight:'600',marginLeft:2}}>Forgot Password</Text>
                    </Pressable>
                </View>
                <View>{errortext != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errortext}
                      </Text>
                    ) : null}</View>
            </View>
        </CustomKeyBoardView>
        <View style={styles.bottomSection}>
                    <Text style={{color:'#000000', fontSize:16,fontWeight:'400'}}>Having difficulties? </Text> 
                    <Pressable
                    >
                      <Text style={{color:'#6A8137', fontSize:16,fontWeight:'300',marginLeft:2}}>Contact Us</Text>
                    </Pressable>
                </View>
    </>
  )
}

export default LoginScreen
const {width,height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
    },
    mainSection:{
        width:width,
        height:height *92/100,
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    loginForm:{
        width:width*90/100,
        marginVertical:20,
    },
    formFieldSection:{
        flexDirection:'row',
        width:'100%',
        padding:10,
        // marginVertical:5,
        backgroundColor:'#D9D9D933',
        borderRadius:8,
        height:60,
        paddingHorizontal:15,
    },
    inputText:{
        marginHorizontal:10,
        flex:2,
    },
    bottomSection:{
        width:width,
        borderTopColor:'#D9D9D9',
        borderTopWidth:1,
        paddingVertical:15,
        bottom:20,
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#fff'
        // marginTop:'auto'
    },
    errorTextStyle: {
          color: 'red',
          textAlign: 'center',
          fontSize: 14,
        },
        haveAnAccount:{
            width:width*90/100,
            borderTopColor:'#D9D9D9',
            paddingVertical:15,
            justifyContent:'center',
            flexDirection:'row',
        },

        shadowInput:{
        width:'100%',
        marginVertical:5,
        backgroundColor:'#fff',
        borderRadius:8,
        height:60,
        },
        loginError:{
            color:'red',
            textAlign:'center',
            fontSize:12,

        }
})