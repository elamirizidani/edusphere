import { Dimensions, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { fetchAllDataWF } from '@/context/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ReUsableButton from '@/components/reUsable/ReUsableButton'
import Loading from '@/components/reUsable/static/Loading'

interface School {
    schoolName: string;
    schoolContact: string;
    address: string;
  }

const SchoolScreen = () => {
    const router = useRouter()
    const [school,setSchool] = useState<School[]>([])
    const [schoolPhone,setSchoolPhone] = useState('')
    const {schoolId,schoolName} = useLocalSearchParams()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        GetSchool()
    },[])

    const callNumber = phone => {
      console.log(phone)
        // Linking.openURL(`tel:${phone}`)

        let phoneNumberURL = '';

      if (Platform.OS === 'android') {
        phoneNumberURL = `tel:${phone}`;
      } else {
        phoneNumberURL = `telprompt:${phone}`;
      }

      Linking.openURL(phoneNumberURL).catch(err => {
        console.error('Error opening dialer', err);
      });
      };

      


    const GetSchool = async () => {
        try {
          const data = await fetchAllDataWF(`/student/school.php?school=${schoolId}`, {});
          setSchool(data.school)
        //   console.log(data)
          setSchoolPhone(data.school[0].schoolContact)
          setIsLoading(false)
          return data; // Return the response data if needed
        } catch (e) {
          console.error('Login error:', e);
          throw e;
        }
      };

      if(isLoading)
        return <Loading size={100}/>
      
  return (
    <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{width:width*25/100,borderRadius:10,overflow:'hidden'}}>
                <ImageBackground 
                    style={{width:'100%',aspectRatio:1,justifyContent:'flex-end',alignItems:'flex-end'}}
                    source={require('@/assets/images/profile111.jpg')}
                    resizeMode='cover'>
                </ImageBackground>
            </View>
        </View>
      <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 24,fontWeight:'400',}}>School Info</Text>
          </View>
            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="school-flag" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                        {school.length > 0 ? (
                            <Text style={styles.activityCardTitle}>{school[0].schoolName}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>{schoolName}</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <Entypo name="address" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                        {school.length > 0 ? (
                            <Text style={styles.activityCardTitle}>{school[0].address}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>{schoolName}</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="contacts" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                        {school.length > 0 ? (
                            <Text style={styles.activityCardTitle}>{school[0].schoolContact}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>{schoolName}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>

        <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between'}}>
            
            <ReUsableButton 
                title={"Call School"} 
                onPress={()=>callNumber('0788665601')}
                style={styles.reUsableBtn}>
                <Feather name="phone" size={24} color="white" />
            </ReUsableButton>
          
        </View>
    </View>
  )
}

export default SchoolScreen
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
      },
      reUsableBtn:{
        backgroundColor: '#6A8137',
        gap:15,
        paddingHorizontal:20,
        TextStyle: { color: '#fff', fontSize: 16, fontWeight: '700' }
    }
})