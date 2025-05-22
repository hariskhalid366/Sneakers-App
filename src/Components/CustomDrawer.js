import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {hp, wp} from '..//constants/Dimensions';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {theme} from '../constants/theme';
import {AppKitButton} from '@reown/appkit-wagmi-react-native';
// import {DbContext, UserSchema} from '../../databases';

const CustomDrawer = props => {
  // const {useObject} = DbContext;
  // const dbUser = useObject(UserSchema, 1);
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      contentContainerStyle={[
        styles.container,
        // {height: dbUser?.role === 'user' ? hp(90.5) : hp(100)},
      ]}
      showsVerticalScrollIndicator={false}
      {...props}>
      <View style={[styles.headerContent]}>
        <View style={styles.ImagContainer}>
          <Image
            style={styles.userImage}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.userName}>Haris</Text>
          <Text style={styles.userEmail}>hariskhalid366@gmail.com</Text>
        </View>
      </View>
      <AppKitButton />
      <View style={styles.divider} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  back: {
    color: '#000',
    fontSize: wp(4),
  },
  backContainer: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  ImagContainer: {
    width: wp(28),
    height: wp(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  userImage: {
    width: wp(24),
    height: wp(24),
    borderRadius: 45, // Adjusted to maintain a perfect circle
  },
  userName: {
    fontSize: wp(4.5),
    color: '#000',
  },
  userEmail: {
    fontSize: wp(3),
    color: '#000',
  },
  divider: {
    width: '100%',
    marginTop: 15,
    height: 0.6,
  },
});
