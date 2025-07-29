import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HeaderComp, Loading} from '../../Components';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {theme} from '../../constants/theme';
import {hp, wp} from '../../constants/Dimensions';
import {getItem, imageBuffer} from '../../constants/mmkv';
import * as ImagePicker from 'react-native-image-picker';
import showToast from '../../Components/Toast';
import LongButton from '../../Components/LongButton';
import {useMutation} from '@tanstack/react-query';
import {POST} from '../../services/apiServices';

const PublishDesign = ({navigation}) => {
  const userData = getItem('user');
  const imageUser = imageBuffer(userData.profile);

  const [data, setData] = React.useState({
    name: '',
    description: '',
    image: null,
    startingPrice: '',
    bidEndTime: '',
    userId: userData?._id,
    username: userData?.username,
    avatar: imageUser,
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleInputChange = (field, value) => {
    setData(prev => ({...prev, [field]: value}));
  };

  const editableFields = [
    {key: 'name', label: 'Name'},
    {key: 'description', label: 'Description'},
    {key: 'startingPrice', label: 'Starting Price'},
    {key: 'bidEndTime', label: 'Bid End Time'},
  ];

  const postOrder = useMutation({
    mutationFn: data => POST('bid/post', data),
    onSuccess: data => {
      console.log(data, 'data from post order');

      if (data?.success) {
        navigation.replace('OtpScreen', {email: email, passwordReset: true});
        showToast(data?.message);
      } else if (
        data?.message ===
        'Please verify your account with the OTP sent to your email.'
      ) {
        navigation.goBack();
        showToast(data?.message);
      } else {
        showToast('Something went wrong');
      }
    },
    onError: error => {
      showToast(error?.message || 'Something went wrong');
    },
  });

  if (postOrder?.error) {
    showToast(postOrder.error?.message || 'Something went wrong');
  }

  const onPressContainer = () => {
    Keyboard.dismiss();
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
      selectionLimit: 1,
      presentationStyle: 'formSheet',
    })
      .then(_data => {
        if (_data?.didCancel) {
          showToast('Process terminated');
          return;
        }
        const uri = _data?.assets[0]?.uri;
        handleInputChange('image', uri);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      handleInputChange('bidEndTime', selectedDate.toISOString());
    }
  };

  return (
    <>
      {postOrder.isPending && <Loading />}
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.secondaryBackground,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        extraScrollHeight={100}>
        <HeaderComp
          inlineStyles={{
            fontSize: 18,
            fontWeight: '600',
          }}
          touchableStyle={{
            backgroundColor: theme.backgroundColor,
            padding: 10,
            elevation: 3,
            borderRadius: 30,
          }}
          containerStyles={{
            paddingHorizontal: 10,
          }}
          prepend={<ChevronLeftIcon color={theme.darkColor} size={18} />}
          title={'Upload Product'}
          apppend={<View className="w-10" />}
        />

        <View style={{flex: 1, paddingHorizontal: wp(3)}}>
          <TouchableOpacity
            onPress={onPressContainer}
            activeOpacity={0.7}
            style={{
              elevation: 3,
              borderColor: theme.primery,
              borderWidth: 1,
              backgroundColor: '#fff',
              width: '100%',
              height: hp(25),
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp(2),
              overflow: 'hidden',
            }}>
            {data.image !== null ? (
              <Image
                source={{uri: data?.image}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            ) : (
              <Text
                style={{
                  color: '#000',
                  fontSize: wp(5),
                  fontWeight: 'bold',
                }}>
                Upload Image
              </Text>
            )}
          </TouchableOpacity>

          <Text className="my-3 px-2 font-bold text-black text-xl">
            Product Details
          </Text>

          {editableFields.map(field => (
            <TouchableOpacity
              key={field.key}
              activeOpacity={field.key === 'bidEndTime' ? 0.7 : 1}
              onPress={() =>
                field.key === 'bidEndTime' && setShowDatePicker(true)
              }
              style={{
                borderRadius: 10,
                borderColor: theme.primery,
                backgroundColor: '#fff',
                borderWidth: 1,
                marginBottom: hp(1.5),
              }}>
              <RNTextInput
                value={
                  field.key === 'bidEndTime' && data[field.key]
                    ? new Date(data[field.key]).toLocaleString()
                    : data[field.key]
                }
                placeholder={field.label}
                placeholderTextColor={theme.secondaryDark}
                style={{
                  fontSize: wp(3.5),
                  color: theme.darkColor,
                  fontWeight: '500',
                  padding: 12,
                }}
                onChangeText={
                  field.key !== 'bidEndTime'
                    ? text => handleInputChange(field.key, text)
                    : undefined
                }
                editable={field.key !== 'bidEndTime'}
                multiline={field.key === 'description'}
                keyboardType={
                  field.key === 'startingPrice' ? 'numeric' : 'default'
                }
              />
            </TouchableOpacity>
          ))}

          {showDatePicker && (
            <DateTimePicker
              value={data.bidEndTime ? new Date(data.bidEndTime) : new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
          <LongButton
            onPress={() => {
              postOrder.mutate(data);
            }}
            title={'Confirm'}
            color={'#fff'}
            backgroundColor={theme.primery}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default PublishDesign;

const styles = StyleSheet.create({});
