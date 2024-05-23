import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ReUsableButton = ({title,onPress,style,children}) => {
  return (
    <TouchableOpacity 
        style={[styles.sendBtn,style]}
        onPress={onPress}
        >
          {children}
        <Text style={style.TextStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ReUsableButton

const styles = StyleSheet.create({
    sendBtn:{
        padding:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        marginVertical:10,
        flexDirection:'row',
        gap:20,
        
    }
})