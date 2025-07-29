import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HeaderComp = ({
  title,
  apppend,
  containerStyles,
  prepend,
  onPress,
  touchableStyle,
  inlineStyles,
}) => {
  const navigation = useNavigation();
  return (
    <View
      className="justify-between mb-4 pt-11 items-center flex-row"
      style={{...containerStyles}}>
      <TouchableOpacity
        style={touchableStyle}
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            navigation.goBack();
          }
        }}>
        {prepend}
      </TouchableOpacity>
      <Text
        style={{...inlineStyles}}
        className="text-2xl text-center font-bold tracking-wide  ">
        {title}
      </Text>
      {apppend}
    </View>
  );
};

export default HeaderComp;
