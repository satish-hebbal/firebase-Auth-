import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = ()=>{
        signOut(auth).then(()=>{
            navigation.replace('Login')
        }).catch(error => alert(error.message))
    }

  return (
    <View className='flex gap-4 justify-center items-center h-full'>
      <Text>Logged in as {auth.currentUser?.email} </Text>
      <TouchableOpacity onPress={handleSignOut} className='py-3 w-[80%] justify-center items-center border-sky-100 border bg-slate-300 rounded-lg'>
        <Text>sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})