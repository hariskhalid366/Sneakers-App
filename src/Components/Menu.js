import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  CurrencyDollarIcon,
  FireIcon,
  LanguageIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const touchable = {
  alignItems: 'center',
  paddingVertical: 2,
  flexDirection: 'row',
  gap: 2,
};

const Menu = React.forwardRef(({onClose}, ref) => {
  const menuTranslateX = useSharedValue(300);

  const showMenu = () => {
    menuTranslateX.value = withTiming(0, {duration: 300});
  };

  const hideMenu = () => {
    menuTranslateX.value = withTiming(300, {duration: 300}, () => {
      onClose();
    });
  };

  const animatedMenuStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: menuTranslateX.value}],
    };
  });

  React.useImperativeHandle(
    ref,
    () => ({
      show: showMenu,
      hide: hideMenu,
    }),
    [],
  );

  return (
    <Animated.View
      style={[
        animatedMenuStyle,
        {
          padding: 15,
          borderWidth: 0.5,
          borderColor: theme.primery,
          position: 'absolute',
          top: '15%',
          borderRadius: 10,
          backgroundColor: 'white',
          width: '40%',
          height: '25%',
          alignSelf: 'flex-end',
          zIndex: 300,
        },
      ]}>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 2,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        Filter
      </Text>
      <Pressable
        style={touchable}
        onPress={() => {
          // Handle press
        }}>
        <LanguageIcon color={theme.primery} size={20} />
        <Text>Name</Text>
      </Pressable>
      <Pressable
        style={touchable}
        onPress={() => {
          // Handle press
        }}>
        <CurrencyDollarIcon color={'green'} size={20} />
        <Text>Price</Text>
      </Pressable>
      <Pressable
        style={touchable}
        onPress={() => {
          // Handle press
        }}>
        <FireIcon color={'red'} size={20} />
        <Text>Popular</Text>
      </Pressable>
    </Animated.View>
  );
});

export default Menu;
