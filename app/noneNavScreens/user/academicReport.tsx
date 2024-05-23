import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import React, {useLayoutEffect,useEffect, useState} from 'react'
import ReUsableButton from '@/components/reUsable/ReUsableButton'
import { useNavigation, useRouter,useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons,Entypo } from "@expo/vector-icons";
import { fetchAllDataWF } from '@/context/api'
import Loading from '@/components/reUsable/static/Loading'
import SelectDropdown from 'react-native-select-dropdown'


const AcademicReport = () => {
    const navigation = useNavigation();
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(true)
    const [reportsSemesters,setReportSemesters] = useState([])
    const [academicYears,setAcademicYear] = useState([])
    const {studentId,studentNames,schoolName} = useLocalSearchParams()
    const [selecterContents,setSelectedContents] = useState([])

    const [lastYear,setLastYear] = useState([])
    const handleSelected =(year)=>{
        setLastYear(year)
    }

    useEffect(()=>{
        setSelectedContents(reportsSemesters.filter(report => report.academicYear === lastYear))
    },[lastYear])

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

    useEffect(()=>{
        GetAcademiYear()
    },[])
   

  const GetAcademiYear = async () => {
    try {
      const data = await fetchAllDataWF(`/details/academicYear.php?user=${studentId}`, {});
      setAcademicYear(data.report)
      setReportSemesters(data.reportContents)
      const itemLength = data.report.length
      setLastYear(data.report[itemLength - 1].academicYear)
      setIsLoading(false)
      return data; 
    } catch (e) {
      console.error('Fetch error:', e);
      throw e;
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.topSectionText}>{schoolName}</Text>
      </View>

      <View style={styles.mainBody}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.sectionTitle}>Academic Year</Text>
    
        <View style={{bottom:20,gap:30,}}>

        <SelectDropdown
            data={academicYears}
            onSelect={(years, index) => {
              handleSelected(years.academicYear)
            }}
            renderButton={(selectedItem, isOpened) => {
            return (
                <View style={styles.dropdownButtonStyle}>

                <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.academicYear) || lastYear} 
                </Text>
                <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle}  />
                </View>
            );
            }}
            renderItem={(item, index, isSelected) => {
            return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Text style={styles.dropdownItemTxtStyle}>{item.academicYear}</Text>
                </View>
            );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
        </View>
        </View>


        {
            isLoading && <Loading size={100}/>
        }
        
                <View style={styles.btnSection}>{
            !isLoading && 
            selecterContents.map((item,index)=>(
                <ReUsableButton style={styles.reUsableBtn} onPress={
                    ()=>router.push({
                        pathname:'noneNavScreens/user/reportDetails',
                        params:{
                            contents:item.content,
                            studentNames:studentNames,
                            schoolName:schoolName,
                            term:item.term
                        }
                    })
                } title={item.term} children={undefined}/>
            ))
        }
        </View>
            
        
      </View>
    </View>
  )
}

export default AcademicReport
const {width,height} = Dimensions.get('screen')
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




      dropdownButtonStyle: {
        width: '100%',
        backgroundColor: '#D9D9D933',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomWidth:2,
        borderColor:'#064E89',
        paddingBottom:20,
        paddingTop:10
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonFlagStyle: {
        marginRight: 8,
        width:36,
        height:24,
        borderRadius:50
      },
      dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemFlagStyle: {
        marginRight: 8,
        width:36,
        height:24,
        borderRadius:50
      },

})