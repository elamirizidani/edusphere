import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import { AntDesign, Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons'

const Assignments = () => {
    const sampleData = [1,2,3,4]
    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
        // headerShown:false,
        headerShadowVisible: false,
        headerLeft: () => <Text style={styles.headerTitle}>Hi Amir</Text>,
        })
    },[])
  return (
    <ScrollView bounces={false}>
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 18,fontWeight:'400',}}>Recent Assignments</Text>
          </View>
        
          {
            sampleData.map((item,index)=>(
              <View style={styles.activityCard} key={index.toString()}>
              <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text-outline" size={24} color="black" />
                </View>
                <View style={styles.activityCardContent}>
                  <Text style={styles.activityCardTitle}>Parent Meeting </Text>
                  <Text style={styles.activityCardDate}>04/08/2024</Text>
                </View>
              </View>
              <AntDesign name="download" size={24} color="black" />
            </View>
            ))
          }

        </View>

        {/* <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={{fontSize: 18,fontWeight:'400',}}>Past Assignment</Text>
          </View>
        
          {
            sampleData.map((item,index)=>(
              <View style={styles.activityCard} key={index.toString()}>
              <View style={{flexDirection:'row',gap:15,alignItems:'center',backgroundColor:'transparent'}}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text-outline" size={24} color="black" />
                </View>
                <View style={styles.activityCardContent}>
                  <Text style={styles.activityCardTitle}>Parent Meeting </Text>
                  <Text style={styles.activityCardDate}>04/08/2024</Text>
                </View>
              </View>
              <AntDesign name="download" size={24} color="black" />
            </View>
            ))
          }

        </View> */}
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