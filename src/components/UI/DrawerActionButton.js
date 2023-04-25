
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react'
import colors from '../../constants/colors';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authAction from '../../store/actions/auth'

const DrawerActionButton = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          dispatch(authAction.logout());
        }}
        icon={({ focused, size, color }) => (
          <AntDesign
            name={Platform.OS === "android" ? "logout" : "ios-logout"}
            size={size}
            color={focused ? colors.primary : color}
          />
        )}
      />
    </DrawerContentScrollView>
  )
}

export default DrawerActionButton