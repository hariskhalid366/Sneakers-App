import {Dimensions, View} from 'react-native';
import React from 'react';
import {wp} from '../constants/Dimensions';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('window');

const Loading = () => {
  return (
    <View
      style={{
        backgroundColor: '#00000066',
        height: height + 100,
        position: 'absolute',
        width: width,
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
      }}>
      <LottieView
        source={require('../../assets/lottieAnimation/animation.json')}
        style={{width: wp(10), height: wp(10)}}
        autoPlay
        loop
      />
      {/* <ActivityIndicator animating={true} color={theme.primery} size={wp(10)} /> */}
    </View>
  );
};

export default React.memo(Loading);
