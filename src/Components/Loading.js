import {Dimensions, StatusBar, View} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';
import {ActivityIndicator} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const Loading = () => {
  return (
    <View
      style={{
        backgroundColor: '#00000044',
        height: height + 100,
        position: 'absolute',
        width: width,
        alignSelf: 'center',
        top: '0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
      }}>
      <StatusBar backgroundColor={'#00000044'} />
      <ActivityIndicator animating={true} color={theme.primery} size={50} />
    </View>
  );
};

export default React.memo(Loading);
