import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession()
// 985046036157-e5v7unlc60ibhmmjm6ub96efn350qpim.apps.googleusercontent.com

const webClientID = '985046036157-uo17ceul9i435g98m9dtdb746l7i47bo.apps.googleusercontent.com';
const androidClientID = '985046036157-e5v7unlc60ibhmmjm6ub96efn350qpim.apps.googleusercontent.com';
const iosClientID = '985046036157-5953e9u4kp4b634734qaks2014kqee11.apps.googleusercontent.com';


const LoginScreen = () => {
  

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Platform.select({
            android: androidClientID,
            ios: iosClientID,
            web: webClientID,
        }),
        redirectUri: Platform.select({
            android: 'com.anonymous.mandir:/oauth2redirect/google',
            ios: 'com.anonymous.mandir:/oauth2redirect/google',
            web: 'https://auth.expo.io/@satishyo/mandir',
        }),
    });

    const handleToken = () =>{
        if(response?.type === 'success'){
            const {authentication} = response;
            const token = authentication?.accessToken;
            console.log("accessToken", token);
        }
    }

    useEffect(()=>{
        handleToken();
    },[response])

    useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          console.log("Full response:", JSON.stringify(response, null, 2));
          // ... rest of your code ...
        } else if (response?.type === 'error') {
          console.error("Auth error:", response.error);
        }
      }, [response]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigation.replace('Home'); 
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    const handleSign = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("registered as "+user.email);
            })
            .catch(error => alert(error.message));
    };

    const handlelogin = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("logged in as "+user.email);
        })
        .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView 
            className='flex gap-4 justify-center items-center h-screen'
            behavior='padding'>
            <View className='flex gap-y-4 w-[80%]'>
                <TextInput 
                    placeholder='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    className='bg-white px-4 py-2 rounded-md border border-gray-300'/>
                <TextInput 
                    placeholder='password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    className='bg-white px-4 py-2 rounded-md border border-gray-300'
                    secureTextEntry />
            </View>

                <TouchableOpacity className='py-3 w-[80%] justify-center items-center border-sky-100 border bg-slate-300 rounded-lg' onPress={handlelogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity className='py-3 w-[80%] justify-center items-center border-sky-100 border bg-slate-300 rounded-lg' onPress={handleSign}>
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity className='py-3 w-[80%] justify-center items-center border-sky-100 border bg-sky-300 rounded-lg' onPress={()=>{promptAsync()}}>
                    <Text>Sign in by google</Text>
                </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

export default LoginScreen;