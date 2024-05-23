

import { Text, View,Dimensions, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import React,{ useEffect, useLayoutEffect, useState } from 'react';
import { Entypo, FontAwesome6,Ionicons } from '@expo/vector-icons';
import { fetchAllDataWF } from '@/context/api';
import { useAuth } from '@/context/authContext';
import Loading from '@/components/reUsable/static/Loading';
import moment from 'moment';

const Assignments = () => {
    const navigation = useNavigation()
    const router = useRouter()

  const [notifications, setNotifications] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const { user, getLoggedUser } = useAuth();

    useEffect(() => {
        if (user) {
            GetNotifications();
        }
      }, [user]);
    
      useEffect(() => {
        getLoggedUser();
      }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
        // headerShown:false,
        headerShadowVisible: false,
        headerLeft: () => <TouchableOpacity onPress={()=>router.back()} style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.headerTitle}>Notifications</Text>
        </TouchableOpacity>,
        })
    },[])

    const GetNotifications = async () => {
        try {
            // console.log(user)
          const data = await fetchAllDataWF(`/details/notifications.php?user=${user}`, {});
          setNotifications(data.notification)
          setIsLoading(false)
        //   console.log(data)
        } catch (e) {
          console.error('Error fetching activities:', e);
        }
      };
      
  return (
    <ScrollView style={{backgroundColor:'#fff0f0'}} bounces={false}>
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 18,fontWeight:'400',}}>Recent Notifications</Text>
          </View>
          {isLoading && <Loading size={100}/>}
        {
            !isLoading && notifications.length === 0 && <Text>No Notifications Found</Text>
        }
        
          {
            notifications.map((item,index)=>(
              <View style={styles.activityCard} key={index.toString()}>
                <View style={styles.activityCardContent}>
                  <Text style={styles.activityCardTitle}>{item.studentNames}</Text>
                  <Text style={styles.activityCardDate}>{item.attendanceStatus}</Text>
                  <Text style={{fontSize:14}}>From: {item.teacher}</Text>
                </View>
                <View>
                    <Text>{
                        moment(item.createdAt, 'YYYY-MM-DD HH:mm').fromNow()
                        }</Text>
                    {/* <Text>09:35</Text> */}
                </View>
            </View>
            ))
          }

        </View>

    </ScrollView>
  )
}

export default Assignments
const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      headerTitle:{
        fontSize:28,
        color:'#fff',
        fontWeight:'600',
        // marginLeft:20
      },
      activitiesSection:{
        paddingHorizontal:20,
        gap:15,
        paddingVertical:30
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
        backgroundColor:'#fff',
        padding:15,
        borderRadius:6,
        alignItems:'center',
      },
      activityCardContent:{
        backgroundColor:'transparent'
      },
      activityCardTitle:{
        color:'#000',
        fontSize:18,
        fontWeight:'600'
      },
      activityCardDate:{
        color:'#000',
        fontSize:12,
        fontWeight:'400'
      }
})