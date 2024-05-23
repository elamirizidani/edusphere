import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';
const CustomKeyBoardView = ({children}) => {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding':'height'}
        style={{flex:1}}
    >
        <ScrollView 
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        style={{
            flex:1
        }}
        showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyBoardView

const styles = StyleSheet.create({})