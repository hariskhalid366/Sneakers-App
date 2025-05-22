import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';

const SecurityIcon = ({onPress, setIcon, color, size}) => {
  return (
    <TouchableHighlight styles={{padding: 10}} onPress={onPress}>
      {setIcon ? (
        <EyeSlashIcon color={color} strokeWidth={2} size={size} />
      ) : (
        <EyeIcon color={color} size={size} strokeWidth={2} />
      )}
    </TouchableHighlight>
  );
};

export default React.memo(SecurityIcon);
