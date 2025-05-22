import {Dimensions, Image, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const DiscountBanners = ({}) => {
  const AImage = Animated.createAnimatedComponent(Image);

  const offset = useSharedValue(10);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(withTiming(-2, {duration: 1500}), -1, true);
  }, []);

  return (
    <View
      style={{elevation: 5}}
      className="bg-white h-28 rounded-2xl my-3 p-4 justify-between items-center flex-row">
      <View className=" flex-1">
        <Text className="   text-xs font-normal text-black tracking-wide">
          Winter Sale
        </Text>
        <Text className="   text-4xl font-extrabold tracking-widest text-parcent py-2">
          15% OFF
        </Text>
      </View>
      <Image
        source={require('../../assets/sketch1.png')}
        style={{
          tintColor: theme.primery + 31,
          width: 250,
          height: 100,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <View className="-rotate-12">
        <AImage
          source={require('../../assets/page1.png')}
          style={[
            {
              height: 125,
              position: 'absolute',
              right: -10,
              bottom: -15,
              width: 170,
            },
            animatedStyles,
          ]}
          resizeMode="cover"
        />
      </View>
      <Image
        source={require('../../assets/stars.png')}
        style={{
          tintColor: theme.starTint + 33,
          width: 50,
          height: 50,
          position: 'absolute',
          bottom: 15,
          right: 5,
        }}
      />
      <Image
        source={require('../../assets/stars.png')}
        style={{
          tintColor: theme.starTint + 66,
          width: 50,
          height: 50,
          position: 'absolute',
          bottom: 1,
          left: 1,
        }}
      />
      <Image
        source={require('../../assets/star.png')}
        style={{
          tintColor: theme.primery + 33,
          width: 50,
          height: 50,
          position: 'absolute',
          top: 0,
          left: width * 0.45,
        }}
      />
    </View>
  );
};

export default React.memo(DiscountBanners);
