import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome, FontAwesome6, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { useAuth } from '@/context/authContext'

const Profile = () => {
    const {logOut} = useAuth()
  return (
    <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{width:width*25/100,borderRadius:10,overflow:'hidden'}}>
                <ImageBackground 
                    style={{width:'100%',aspectRatio:1,justifyContent:'flex-end',alignItems:'flex-end'}}
                    source={require('@/assets/images/profile111.jpg')}
                    resizeMode='cover'>
                    <TouchableOpacity style={{backgroundColor:'#6A8137',width:34,height:34,justifyContent:'center',alignItems:'center',borderTopLeftRadius:6}}>
                        <AntDesign name="camerao" size={24} color="white" />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
      <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 24,fontWeight:'400',}}>Personal Info</Text>
          </View>
            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <Feather name="user" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                    <Text style={styles.activityCardTitle}>Full Names</Text>
                    </View>
                </View>
                {/* <AntDesign name="download" size={24} color="black" /> */}
                {/* <TouchableOpacity style={styles.editBtnSection}>
                    <FontAwesome6 name="edit" size={16} color="black" />
                </TouchableOpacity> */}
            </View>
            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="envelope-o" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                    <Text style={styles.activityCardTitle}>Email@email.com</Text>
                    </View>
                </View>
            </View>
            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <Feather name="smartphone" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                    <Text style={styles.activityCardTitle}>Phone Number</Text>
                    </View>
                </View>
            </View>


            
        </View>
        <TouchableOpacity
            onPress={logOut}
            style={[styles.activityCard,{marginTop:'auto',marginLeft:20}]}>
            <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                <View style={styles.iconContainer}>
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </View>
                <View style={styles.activityCardContent}>
                <Text style={styles.activityCardTitle}>Logout</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default Profile
const {width,height} = Dimensions.get('screen')
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingVertical:30
    },
    headerTitle:{
        fontSize:28,
        color:'#fff',
        fontWeight:'600',
        marginLeft:20
      },
      activitiesSection:{
        paddingHorizontal:20,
        gap:15,
        paddingVertical:30,
        marginTop:30
      },
      sectionTitle:{
        fontSize: 18,
        fontWeight:'600',
        paddingLeft:20
      },
      cardTitle:{
        fontSize:16,
        color:'#6A8137',
        fontWeight:'600'
      },
      cardDesc:{
        fontSize:14,
        color:'#6A8137',
        fontWeight:'400'
      },
      sectionHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
      },
      seeMoreLink:{
        fontSize:16,
        color:'#6A8137',
        fontWeight:'400'
      },
      activityCard:{
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'#D9D9D980',
        paddingTop:10,
        borderRadius:6,
        alignItems:'center',
      },
      iconContainer:{
        backgroundColor:'#D9D9D980',
        height:44,
        width:44,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
      },
      activityCardContent:{
        backgroundColor:'transparent'
      },
      activityCardTitle:{
        color:'#000',
        fontSize:18,
        fontWeight:'400'
      },
      activityCardDate:{
        color:'#000',
        fontSize:12,
        fontWeight:'400'
      },
      editBtnSection:{
        backgroundColor:'#F4F4F4',
        height:32,
        width:32,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
      }
})