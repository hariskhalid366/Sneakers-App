import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {InputField} from '../Components';
import {
  EnvelopeIcon,
  MapIcon,
  PhoneIcon,
  UserIcon,
  WalletIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import LongButton from '../Components/LongButton';
import {wp} from '../constants/Dimensions';

const Profile = () => {
  const [editable, setEditable] = React.useState(false);
  // const connectWallet = async () => {
  //   try {
  //     await connect();
  //   } catch (error) {
  //     console.error('Failed to connect wallet:', error);
  //   }
  // };

  // const imageData = Buffer.from(/* Your image data here */);

  // Convert the Buffer to a base64-encoded string
  // const base64ImageData = imageData.toString('base64');

  // uri: `data:image/jpeg;base64,${base64ImageData}`,

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <View className="h-2/3 items-center p-4 justify-center rounded-2xl bg-white w-11/12">
        <TouchableOpacity className="p-4 bg-primary elevation-sm rounded-full absolute top-5 right-5">
          <WalletIcon
            color={theme.backgroundColor}
            strokeWidth={2}
            size={wp(5)}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 130, height: 130, borderRadius: 200}}
        />
        <InputField
          prependChild={
            <UserIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your name'}
        />
        <InputField
          prependChild={
            <EnvelopeIcon
              color={theme.primeryDark}
              size={'22'}
              strokeWidth={2}
            />
          }
          editable={editable}
          placeholder={'Your Email'}
        />
        <InputField
          prependChild={
            <PhoneIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your Phone'}
        />
        <InputField
          prependChild={
            <MapIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your Address'}
        />
        <LongButton
          title={'Edit Profile'}
          backgroundColor={theme.primery}
          color={'#fff'}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default Profile;
