import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ShopNavigation from './ShopNavigation'
import AuthStackNavigator from './AuthStack'
import { useSelector } from 'react-redux'

const MainNavigation = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
    {isLoggedIn ? <ShopNavigation /> : <AuthStackNavigator />}  
  </NavigationContainer>
  )
}

export default MainNavigation