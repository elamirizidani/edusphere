import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShadowedSection = ({children,style}) => {
  return (
    <View style={[styles.container,style]}>
      {
        children
      }
    </View>
  )
}

export default ShadowedSection

const styles = StyleSheet.create({
    container:{
        padding:0,
        // overflow:'hidden',
        backgroundColor:'#fff',
        shadowColor: '#6A8137',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 1,
        elevation: 4,
        }
})