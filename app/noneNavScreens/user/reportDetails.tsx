import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native'
import React, {useLayoutEffect,useEffect, useState} from 'react'
import ReUsableButton from '@/components/reUsable/ReUsableButton'
import { useNavigation, useRouter,useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fetchAllDataWF } from '@/context/api'
import Loading from '@/components/reUsable/static/Loading'

const ReportDetails = () => {
    const navigation = useNavigation();
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(true)
    const [reportsSemesters,setReportSemesters] = useState([])
    const {studentId,studentNames,schoolName,term,contents} = useLocalSearchParams()

    const [reportData, setReportData] = useState([]);

    useEffect(()=>{
        setReportData(Object.entries(JSON.parse(contents)))
        setIsLoading(false)
    },[])
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={()=>router.back()} style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.headerTitle}>{studentNames}</Text>
            </TouchableOpacity>
          ),
        });
      }, []);

// console.log(reportData[3][1])
  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.topSectionText}>{term}</Text>
      </View>

        {
            isLoading && <Loading size={100}/>
        }
        {
            !isLoading &&

            <View style={styles.mainBody}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.sectionTitle}>Academic Year </Text>
                <Text style={{fontSize:18}}>{reportData[3][1]}</Text>
                </View>
                        <View style={styles.btnSection}>
                        <View>

                            {
                                reportData.map((item, index) => {
                                    if (item[0] === "studentID" || item[0] ==="academicYear" || item[0] === "teacherID" || item[0] === "term")
                                        return
                                    return(
                                    <View key={index} style={styles.reportRow}> 
                                        <Text style={styles.objectName}>{item[0]}:</Text>
                                        <Text style={styles.objectValue}>{item[1]}</Text> 
                                    </View>
                                    )
                                }
                                )                    
                            }
                        </View>
                </View>
            </View>
        }
      
    </ScrollView>
  )
}

export default ReportDetails

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    topSection:{
        backgroundColor:'#6A8137',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingHorizontal:20,
        paddingTop:15,
        paddingBottom:20
    },
    topSectionText:{
        color:'#FFFFFF80',
        fontSize:20,
        fontWeight:'300'
    },
    reUsableBtn:{
        backgroundColor: '#6A8137',
        TextStyle: { 
            color: '#fff', 
            fontSize: 16, 
            fontWeight: '700'
        }
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        // marginLeft: 20,
      },
      mainBody:{
        paddingHorizontal:20,
        paddingVertical:30
      },
      sectionTitle:{
        fontSize:20,
        fontWeight:'600',
        color:'#000'
      },
      btnSection:{
        padding:30,
        backgroundColor:'#D9D9D980',
        borderRadius:10,
        marginTop:20,
      },
      reportRow:{
        flexDirection:'row',
        alignItems:'flex-end',
        // gap:5,
        // marginBottom:8
    },
      objectName:{
        fontSize:20,
        color:'#000',
        fontWeight:'600',
        borderWidth:.3,
        borderColor:'#000',
        height:'100%',
        padding:5,
        flex:3
      },
      objectValue:{
        fontSize:14,
        fontWeight:'400',
        color:'#000',
        borderWidth:.3,
        borderColor:'#000',
        height:'100%',
        padding:5,
        flex:1,
        textAlign:'center'
      }
})