import {Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import Animated from 'react-native-reanimated';
import {hp, wp} from '../constants/Dimensions';

const CreatorCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{height: hp(32)}}
      key={item?.id}
      className="flex-1 p-2 bg-white elevation-md m-3 rounded-2xl">
      <View>
        {/* {item?.image || item?.imageURL ? ( */}
        <Animated.Image
          sharedTransitionTag="image"
          style={{
            width: '100%',
            height: hp(22),
            backgroundColor: '#EBEEF0',
            borderRadius: 10,
            resizeMode: 'cover',
          }}
          // source={{uri: item?.image || item?.imageURL}}
          source={{uri: item?.image}}
        />
        {/* ) : null} */}
        {/* <View
              style={{transform: [{rotateX: '83deg'}], opacity: 0.3}}
              className="bg-zinc-300 w-16 h-5 rounded-full relative -rotate-12 left-2 bottom-0"
            /> */}
      </View>
      <View className="py-3 px-2 flex-row items-center gap-2 justify-between">
        <View className="flex-row items-center justify-center gap-2 flex-1 ">
          <Image
            source={{uri: item?.creator?.avatar}}
            style={{
              width: wp(10),
              height: wp(10),
              borderRadius: wp(100),
              backgroundColor: '#00000029',
            }}
          />
          <View className="flex-1 gap-1">
            <View style={{width: '100%'}} className="flex-row justify-between">
              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: '600',
                  maxWidth: '70%',
                }}
                className="text-primary  font-medium">
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{fontSize: wp(3), fontWeight: '400'}}
                className="text-black font-normal tracking-wide">
                {/* {item?.name} */}
                12/03/2025
              </Text>
            </View>

            <Text
              numberOfLines={2}
              style={{fontSize: wp(3), fontWeight: '400'}}
              className="text-black font-normal tracking-wide">
              {item?.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CreatorCard);
