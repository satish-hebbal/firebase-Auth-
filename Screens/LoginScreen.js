import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
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

        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
