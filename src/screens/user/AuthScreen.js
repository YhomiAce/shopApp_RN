import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Button, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import colors from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient'
import { useDispatch } from 'react-redux';
import * as authAction from '../../store/actions/auth'
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
    const dispatch = useDispatch();
    const {navigate} = useNavigation();
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const {email, password} = formValue;

    const switchMode = () => {
        setIsLogin(!isLogin)
    }

    const onInputChange = (key, value) => {
        setFormValue({
            ...formValue,
            [key]: value
        })
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            setError(null)
            if (!email || !password) {
                Alert.alert('Invalid Input', "Please fill all fields", [{text: 'Okay'}]);
                setLoading(false)
                return;
            }else if (password.length < 6) {
                Alert.alert('Invalid Input', "Password should be at least 6 characters", [{text: 'Okay'}]);
                setLoading(false)
                return;
            }
            if (isLogin) {
                await dispatch(authAction.login({email, password}));
            }else{
                await dispatch(authAction.signup({email, password}));
            }        
            setLoading(false);
            navigate('Products')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{text: 'Okay'}])
        }
    }, [error])

  return (
    <KeyboardAvoidingView 
    behavior='padding' 
    keyboardVerticalOffset={5}
    style={styles.screen}
    >
        <LinearGradient 
            colors={['#ffedff', '#ffe3ff']} 
            style={styles.gradient}
        >
        <Card  style={styles.authContainer}>
            {/* <ScrollView> */}
                <Input 
                    id="email" 
                    label="E-Mail" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onInputChange={onInputChange}
                />
                <Input 
                    id="password" 
                    label="Password" 
                    keyboardType="default"
                    secureTextEntry={true}
                    onInputChange={onInputChange}
                />
                <View style={styles.btnContainer}>
                    {
                        loading ? <ActivityIndicator size="large" color={colors.primary} /> :
                        <Button title={isLogin ? 'Login' : 'Signup'} color={colors.primary} onPress={onSubmit} /> 
                    }
                </View>
                <View style={styles.btnContainer}>
                <Button 
                title={`Switch To ${isLogin ? 'Signup' : 'Login'}`} 
                color={colors.accent} 
                onPress={switchMode} />
                </View>
            {/* </ScrollView> */}
        </Card>
        </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        padding: 20,
        maxHeight: 400,
    },
    btnContainer:{
        marginTop: 10,
    }
})