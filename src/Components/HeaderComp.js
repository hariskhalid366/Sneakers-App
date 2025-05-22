import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HeaderComp = ({
  title,
  apppend,
  containerStyles,
  prepend,
  onPress,
  inlineStyles,
}) => {
  const navigation = useNavigation();
  return (
    <View
      className="justify-between mb-4 items-center flex-row"
      style={{...containerStyles}}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            navigation.goBack();
          }
        }}>
        {prepend}
      </TouchableOpacity>
      <View>
        <Text
          style={{...inlineStyles}}
          className="text-3xl text-center font-bold tracking-wide ">
          {title}
        </Text>
      </View>
      {apppend}
    </View>
  );
};

export default HeaderComp;
