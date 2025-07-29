import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import Animated from 'react-native-reanimated';
import {hp, wp} from '../constants/Dimensions';

const ProfileMintCard = ({item}) => {
  console.log(item);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{height: hp(32)}}
      key={item?.id}
      onPress={() => {
        navigation.navigate('Product', {
          id: item?._id || item.id,
          minted: true,
        });
      }}
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
      </View>
      <View className="py-3 px-2 flex-row items-center gap-2 justify-between">
        <View className="flex-row items-center justify-center gap-2 flex-1 ">
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

export default React.memo(ProfileMintCard);
