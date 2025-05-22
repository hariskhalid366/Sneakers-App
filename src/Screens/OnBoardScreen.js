import {Dimensions, Image, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {theme} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
const OnBoardScreen = () => {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('Login');
  };
  return (
    <Onboarding
      onDone={handleDone}
      controlStatusBar={false}
      onSkip={handleDone}
      bottomBarColor={theme.backdrop}
      titleStyles={{
        fontSize: 34,
        letterSpacing: 1.16,
        textAlign: 'center',
        fontWeight: 'bold',
      }}
      subTitleStyles={{
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 10,
      }}
      pages={[
        {
          backgroundColor: theme.backdrop,
          image: (
            <View className="justify-center items-center">
              <Image
                source={require('../../assets/sketch1.png')}
                style={{
                  width: width,
                  height: width * 0.5,
                  tintColor: '#fff',
                  top: width * 0.438,
                  position: 'absolute',
                  transform: [{rotate: '180deg'}],
                }}
              />
              <Image
                source={require('../../assets/page1.png')}
                style={{
                  width: width / 1.1,
                  height: width / 1.1,
                  marginTop: 50,
                  marginRight: 40,
                  transform: [{rotate: '-70deg'}],
                }}
              />
            </View>
          ),
          title: 'Welcome to\nSneakers',
          subtitle: 'The Best Online Store For Your\nFavourite Shoes',
        },
        {
          backgroundColor: theme.backdrop,
          image: (
            <View className="justify-center items-center">
              <Image
                source={require('../../assets/page2.png')}
                style={{
                  width: width / 1.1,
                  height: width / 1.1,
                  marginTop: 50,
                  paddingBottom: 60,
                  transform: [{rotate: '-60deg'}],
                }}
              />
              <Image
                source={require('../../assets/sketch1.png')}
                style={{
                  width: width,
                  height: width * 0.5,
                  tintColor: '#fff',
                  top: width * 0.782,
                  position: 'absolute',
                  transform: [{rotate: '180deg'}],
                }}
              />
            </View>
          ),
          title: 'Let’s Start Journey With Sneakers',
          subtitle: 'Smart, Gorgeous & Fashionable\nCollection Explor Now',
        },
        {
          backgroundColor: theme.backdrop,
          image: (
            <View className="justify-center absolute -mt-16 items-center">
              <Image
                source={require('../../assets/page3.png')}
                style={{
                  width: width,
                  height: width,
                  position: 'absolute',
                }}
              />
              <Image
                source={require('../../assets/sketch1.png')}
                style={{
                  width: width,
                  height: width * 0.5,
                  tintColor: '#fff',
                  top: width * 0.85,
                  position: 'absolute',
                }}
              />
            </View>
          ),
          title: 'You Have the\nPower',
          subtitle:
            'There Are Many Beautiful And Attractive\nPlants To Your Room',
        },
      ]}
    />
  );
};

export default OnBoardScreen;
