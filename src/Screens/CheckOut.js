import {
  ActivityIndicator,
  Dimensions,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  HeaderComp,
  InputField,
  Loading,
  Notification,
  RecoveryModal,
} from '../Components';
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../ReduxStore/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';
import {RadioButton} from 'react-native-paper';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {useNotifications} from '../AsyncStorage/Notification';

const {width, height} = Dimensions.get('window');
const textStyles = 'justify-between items-center flex-row';

const CheckOut = ({navigation, route}) => {
  const products = route.params.products;
  const price = route.params.price;
  const Delivery = route.params.dPrice;
  const total = price + Delivery;

  const [user, setUser] = React.useState([]);
  const [address, setAddress] = React.useState('');
  const [checked, setChecked] = React.useState('online');
  const [methodOfTransaction, setMethodOfTransaction] =
    React.useState('Cradit Card');

  const {addNotification} = useNotifications();

  React.useEffect(() => {
    AsyncStorage.getItem('userAuth').then(items => {
      const userInfo = JSON.parse(items);
      setUser(userInfo.user);
    });
  }, []);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const handlePaymentIntent = async () => {
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    console.log(response);
    if (response.error) {
      ToastAndroid.showWithGravity(
        `Something went wrong \n ${response.error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Sneakers.co',
      paymentIntentClientSecret: response?.data?.paymentIntent,
      defaultBillingDetails: {
        address: 'Pakistan',
      },
    });

    if (initResponse.error) {
      ToastAndroid.showWithGravity(
        `Something went wrong \n ${initResponse.error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      ToastAndroid.showWithGravity(
        'Payment method is cancelled by user',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    orderProduct();
  };

  const orderProduct = async () => {
    try {
      if (address.length > 10) {
        const order = await createOrder({
          id: user?._id,
          username: user?.username,
          email: user?.email,
          phoneNumber: user.phonenumber,
          address: address,
          paymentMethod: methodOfTransaction,
          payment: total,
          product: products,
        });
        if (order.data.status) {
          toastRef?.current?.show({type: 'noti', text: order.data.message});
          ModalRef?.current?.present();
          console.log(order.data);
          addNotification(order.data);

          setTimeout(() => {
            navigation.replace('MyCart');
          }, 2000);
        } else {
          ToastAndroid.showWithGravity(
            'Something went wrong',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ModalRef = React.useRef(null);
  const toastRef = React.useRef(null);

  return (
    <>
      <Notification ref={toastRef} />
      {isLoading && <Loading />}
      <RecoveryModal modelType={true} ref={ModalRef} />
      <View className="flex-1 bg-background p-3">
        <HeaderComp
          title={'Checkout'}
          inlineStyles={{
            fontSize: 18,
            fontWeight: '600',
          }}
          prepend={
            <View
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                elevation: 3,
                borderRadius: 30,
              }}>
              <ChevronLeftIcon color={theme.darkColor} size={'18'} />
            </View>
          }
          apppend={<View className="w-10" />}
        />
        <ScrollView className="flex-1 bg-white rounded-2xl">
          <Text className="   p-5 font-bold text-black text-lg">
            Contact Form
          </Text>

          <View className="mx-4">
            <InputField
              maxLength={40}
              value={user?.username}
              onChangeText={text => handleChange('name', text)}
              placeholder={'Your Name'}
              keyboardType={'default'}
              editable={false}
              prependChild={
                <UserIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
            <InputField
              maxLength={40}
              value={user?.email}
              onChangeText={text => handleChange('email', text)}
              placeholder={'Your Email'}
              keyboardType={'default'}
              editable={false}
              prependChild={
                <EnvelopeIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
            <InputField
              maxLength={40}
              value={user.phonenumber}
              onChangeText={text => handleChange('phone', text)}
              placeholder={'Your Phone Number'}
              keyboardType={'default'}
              editable={false}
              prependChild={
                <PhoneIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
            <InputField
              maxLength={40}
              value={address}
              onChangeText={text => setAddress(text)}
              placeholder={'Your Proper Address'}
              keyboardType={'default'}
              prependChild={
                <MapPinIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
          </View>

          <Text className="   m-4 font-bold text-black text-base">
            Payment Method
          </Text>
          <View className="items-center flex-row">
            <RadioButton
              value="online"
              color={theme.primery}
              status={checked === 'online' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('online');
                setMethodOfTransaction('Cradit Card');
              }}
            />
            <Text className="   text-black text-sm font-bold">
              Online Payment
            </Text>
          </View>
          <View className="items-center flex-row">
            <RadioButton
              value="cash"
              color={theme.primery}
              status={checked === 'cash' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('cash');
                setMethodOfTransaction('Cash on Delivery');
              }}
            />
            <Text className="   text-black text-sm font-bold">
              Cash on Delivery
            </Text>
          </View>
        </ScrollView>
      </View>

      <View className="bg-white w-full">
        <View className="p-4 gap-3">
          <View className={textStyles}>
            <Text className="   text-base font-normal text-gray-500">
              SubTotal
            </Text>
            <Text className="   text-base font-semibold text-black">
              $ {price}
            </Text>
          </View>
          <View className={textStyles}>
            <Text className="   text-base font-normal text-gray-500">
              Delivery
            </Text>
            <Text className="   text-base font-semibold text-black">
              $ {Delivery}
            </Text>
          </View>
          <View className="border border-gray-500 border-dashed" />
          <View className={textStyles}>
            <Text className="   text-base font-normal text-gray-500">
              Total
            </Text>
            <Text className="   text-base font-semibold text-black">
              $ {total}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (address.length > 10) {
              if (checked === 'online') {
                handlePaymentIntent();
              } else {
                orderProduct();
              }
            } else {
              ToastAndroid.showWithGravity(
                'Please fill the required field',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          }}
          className="m-4 rounded-2xl h-14  justify-center items-center bg-primary">
          <Text className="   text-center text-white text-xl font-semibold">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CheckOut;
