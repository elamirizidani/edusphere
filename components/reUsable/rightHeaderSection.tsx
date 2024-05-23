import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const RightHeaderSection = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Pressable 
      onPress={()=>router.push('noneNavScreens/notifications')} style={styles.topIcon}>
            <MaterialIcons name="notifications-none" size={24} color="white" />
        </Pressable>
        {/* <Pressable style={styles.topIcon}>
            <MaterialIcons name="settings" size={24} color="white" />
        </Pressable> */}
    </View>
  )
}

export default RightHeaderSection

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:10,
        paddingRight:20
    },
    topIcon:{
        height:34,
        width:34,
        backgroundColor:'#1F4CC1',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    }
})