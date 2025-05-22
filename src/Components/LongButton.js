import {Text} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
const LongButton = ({onPress, title, backgroundColor, color, Childred}) => {
  return (
    <TouchableRipple
      rippleColor="rgba(225, 225, 225, 225.1)"
      onPress={onPress}
      style={{marginTop: 25, backgroundColor: backgroundColor}}
      className="h-14 w-full flex-row rounded-2xl justify-center items-center">
      <>
        {Childred}

        <Text
          style={{color: color}}
          className="tracking-wide text-sm font-semibold">
          {title}
        </Text>
      </>
    </TouchableRipple>
  );
};

export default React.memo(LongButton);
