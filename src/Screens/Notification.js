import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HeaderComp} from '../Components';
import {
  BellAlertIcon,
  ChevronLeftIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import LottieView from 'lottie-react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNotifications} from '../AsyncStorage/Notification';
// import Clipboard from '@react-native-clipboard/clipboard';

const Notification = ({navigation}) => {
  const {notifications, clearNotifications} = useNotifications();

  return (
    <View className="flex-1 bg-background p-3">
      <HeaderComp
        title={'Notifications'}
        inlineStyles={{
          fontSize: 18,
          fontWeight: '600',
        }}
        prepend={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: theme.backgroundColor,
              padding: 10,
              elevation: 3,
              borderRadius: 30,
            }}>
            <ChevronLeftIcon color={theme.darkColor} size={'18'} />
          </TouchableOpacity>
        }
        apppend={
          <TouchableOpacity
            onPress={() => {
              clearNotifications();
            }}
            style={{
              backgroundColor: theme.backgroundColor,
              padding: 10,
              borderRadius: 30,
              elevation: 3,
            }}>
            <TrashIcon strokeWidth={1.5} color={theme.darkColor} size={'20'} />
          </TouchableOpacity>
        }
      />
      {notifications.length > 0 ? (
        <>
          <Text className="  text-lg font-bold text-black">Recent</Text>
          <FlatList
            contentContainerStyle={{paddingVertical: 20}}
            data={notifications}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  // Clipboard.setString(item.product.reference);
                  ToastAndroid.showWithGravity(
                    'Product id copied',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }}
                activeOpacity={0.6}
                className="self-center bg-white justify-between w-full h-20 rounded-3xl my-1 p-4 flex-row items-center">
                <>
                  <Text className="  text-xl font-bold">🎉</Text>
                  <Text className="  text-sm tracking-wide text-black font-bold">
                    {item.message}
                  </Text>
                  <BellAlertIcon color={theme.primeryDark} size={'25'} />
                </>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <LottieView
            loop
            autoPlay
            style={{width: 600, height: 500}}
            source={require('../../assets/lottieAnimation/noti.json')}
          />
        </View>
      )}
    </View>
  );
};

export default Notification;
