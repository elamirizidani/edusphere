import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { fetchAllDataWF } from '@/context/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ReUsableButton from '@/components/reUsable/ReUsableButton'
import Loading from '@/components/reUsable/static/Loading'

interface Student {
    userName: string;
    schoolName: string;
    level: string;
    schoolId: string;
  }

const Student = () => {
    const router = useRouter()
    const [student,setStudent] = useState<Student[]>([])
    const {studentId,studentName,studentLevel,schoolName} = useLocalSearchParams()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        GetStudent()
    },[])

    const GetStudent = async () => {
        try {
          const data = await fetchAllDataWF(`/student/index.php?user=${studentId}`, {});
          setStudent(data.user)
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
                        {student.length > 0 ? (
                            <Text style={styles.activityCardTitle}>{student[0].userName}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>{studentName}</Text>
                        )}
                    </View>
                </View>
            </View>
            <TouchableOpacity
              onPress={()=>router.push({
                pathname:'/noneNavScreens/user/school',
                params:{
                  schoolId:student[0].schoolId,
                  schoolName:student[0].schoolName
                }
              })}
             style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="school-flag" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                        {student.length > 0 ? (
                            <Text style={styles.activityCardTitle}>{student[0].schoolName}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>{schoolName}</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="google-classroom" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                        {student.length > 0 ? (
                            <Text style={styles.activityCardTitle}>Level {student[0].level}</Text>
                        ) : (
                            <Text style={styles.activityCardTitle}>Level {studentLevel}</Text>
                        )}
                    </View>
                </View>
            </View>

            <TouchableOpacity
              onPress={()=>router.push({
                pathname:'noneNavScreens/user/academicReport',
                params:{
                  studentId:studentId,
                  studentNames:student[0].userName,
                  schoolName:student[0].schoolName
                }
              })} style={styles.activityCard}>
                <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="barschart" size={24} color="black" />
                    </View>
                    <View style={styles.activityCardContent}>
                            <Text style={styles.activityCardTitle}>View Academic Report</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'space-around'}}>
          <ReUsableButton 
            title={"Activities"} 
            onPress={()=>router.push({
              pathname:'/noneNavScreens/user/activities',
              params:{
                studentId:studentId
              }
            })}
            style={styles.reUsableBtn}>
            <FontAwesome6 name="people-group" size={24} color="white" />
          </ReUsableButton>
          <ReUsableButton 
            title={"AssignMents"} 
            onPress={()=>router.push({
              pathname:'/noneNavScreens/user/assignments',
              params:{
                studentId:studentId
              }
            })}
            style={styles.reUsableBtn}>
            <MaterialIcons name="assignment-add" size={24} color="white" />
          </ReUsableButton>
        </View>
    </View>
  )
}

export default Student
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