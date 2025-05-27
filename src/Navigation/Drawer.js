import {StyleSheet} from 'react-native'; // Import StatusBar
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import * as Outline from 'react-native-heroicons/outline';
import BottomNavigation from './BottomNavigation';
import CustomDrawer from '../Components/CustomDrawer';
import {hp, wp} from '../constants/Dimensions';
import {Favourite, Notification, OrderedProduct} from '../Screens';
import Settings from '../Screens/Settings';
import TasKCentre from '../Screens/TasKCentre';
import CreateDesign from '../Screens/CreateDesign';
import {
  ShoppingBagIcon,
  BellIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  RectangleStackIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';

const Drawer = () => {
  const _Drawer = createDrawerNavigator();

  const getDrawerIcon = route => {
    switch (route.name) {
      case 'Task Center':
        return RectangleStackIcon;
      case 'CreateDesign':
        return PaintBrushIcon;
      case 'Favourite':
        return HeartIcon;
      case 'Orders':
        return ShoppingBagIcon;
      case 'Notifications':
        return BellIcon;
      case 'Setting':
        return Cog6ToothIcon;
      default:
        return null;
    }
  };

  return (
    <_Drawer.Navigator
      initialRouteName="BottomTabs"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({route}) => ({
        initialRouteName: 'BottomTabs',
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          height: hp(90),
          top: hp(2.5),
          // left: wp(5),
          width: wp(65),
          borderRadius: 20,
          overflow: 'hidden',
        },
        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 15,
          backgroundColor: '#00000008',
          width: '100%',
        },
        drawerStatusBarAnimation: 'none',
        drawerLabelStyle: {
          color: '#000',
          fontSize: wp(3.2),
          textAlignVertical: 'center',
        },
        drawerIcon: ({color, size}) => {
          const Icon = getDrawerIcon(route);
          return Icon ? <Icon color={color} size={wp(6)} /> : null;
        },
      })}>
      <_Drawer.Screen
        name="BottomTabs"
        options={{drawerItemStyle: {display: 'none'}}}
        component={BottomNavigation}
      />
      <_Drawer.Screen name="Task Center" component={TasKCentre} />
      <_Drawer.Screen
        name="CreateDesign"
        component={CreateDesign}
        options={{title: 'Creator Center'}}
      />
      <_Drawer.Screen name="Favourite" component={Favourite} />
      <_Drawer.Screen name="Orders" component={OrderedProduct} />
      <_Drawer.Screen name="Notifications" component={Notification} />
      <_Drawer.Screen name="Setting" component={Settings} />
    </_Drawer.Navigator>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Image: {
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
  },
});
