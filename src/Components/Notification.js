import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useImperativeHandle} from 'react';
import {
  BellAlertIcon,
  ShoppingBagIcon,
  HeartIcon,
} from 'react-native-heroicons/solid';
import {theme} from '../constants/theme';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {CurrencyDollarIcon} from 'react-native-heroicons/outline';

const Notification = React.forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const [showing, setShowing] = React.useState(false);
  const [toastType, setToastType] = React.useState('');
  const [toastText, setToastText] = React.useState('');
  const [toastImage, setToastImage] = React.useState('');
  const TOP_VALUE = 30;

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show, ref],
  );

  const show = React.useCallback(
    ({type, text, image}) => {
      setToastType(type);
      setToastText(text);
      setToastImage(image);
      setTimeout(() => {
        setShowing(true);
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            1000,
            withTiming(-100, null, finish => {
              if (finish) {
                runOnJS(setShowing)(false);
                runOnJS(setToastType)('');
                runOnJS(setToastText)('');
                runOnJS(setToastImage)('');
              }
            }),
          ),
        );
      }, 200);
    },
    [TOP_VALUE, toastTopAnimation, ref],
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  return (
    <Animated.View
      style={animatedTopStyles}
      className="self-center bg-white justify-between border-2 w-3/4 rounded-3xl p-4 border-primary flex-row items-center absolute z-50">
      <View className="justify-start flex-row flex items-center gap-3">
        {toastImage && (
          <Image
            source={
              toastType === 'coin'
                ? require('../../assets/logo.png')
                : {uri: toastImage}
            }
            style={{
              width: 45,
              height: 45,
              borderRadius: 10,
            }}
          />
        )}
        <Text className="   text-base text-black font-bold">{toastText}</Text>
      </View>
      {toastType === 'fav' && <HeartIcon size={'22'} color={'red'} />}
      {toastType === 'cart' && (
        <ShoppingBagIcon size={'22'} color={theme.primery} />
      )}
      {toastType === 'noti' && (
        <BellAlertIcon size={'22'} color={theme.primery} />
      )}
      {toastType === 'coin' && (
        <CurrencyDollarIcon size={'22'} color={'#FFD700'} />
      )}
    </Animated.View>
  );
});

export default Notification;
