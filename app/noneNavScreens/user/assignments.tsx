import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { AntDesign, Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { fetchAllDataWF } from '@/context/api'
import Loading from '@/components/reUsable/static/Loading'

const Assignments = () => {
    const [assignments,setAssignments] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const router = useRouter()
    const {studentId} = useLocalSearchParams()
    useEffect(()=>{
        GetAssignments()
    },[])

    const GetAssignments = async () => {
        try {
        const data = await fetchAllDataWF(`/student/assignments.php?user=${studentId}`, {});
        setAssignments(data.assignment)
        setIsLoading(false)
        return data; // Return the response data if needed
        } catch (e) {
        console.error('Login error:', e);
        throw e;
        }
    };
  return (
    <ScrollView bounces={false}>
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 18,fontWeight:'400',}}>Recent Assignments</Text>
          </View>
        {isLoading && <Loading size={100}/>}
        {
            !isLoading && assignments.length === 0 && <Text>No New Assignments</Text>
        }
          {
            assignments.map((item,index)=>(
              <View style={styles.activityCard} key={index.toString()}>
              <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text-outline" size={24} color="black" />
                </View>
                <View style={styles.activityCardContent}>
                  <Text style={styles.activityCardTitle}>{item.title}</Text>
                  <Text style={styles.activityCardDate}>{item.dueDate}</Text>
                </View>
              </View>
              <AntDesign name="download" size={24} color="black" />
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
        // flex: 1,
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
        backgroundColor:'#D9D9D980',
        padding:15,
        borderRadius:6,
        alignItems:'center',
      },
      iconContainer:{
        backgroundColor:'#B5DBF2',
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
        fontWeight:'600'
      },
      activityCardDate:{
        color:'#000',
        fontSize:12,
        fontWeight:'400'
      }
})