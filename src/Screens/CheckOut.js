import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {
  HeaderComp,
  InputField,
  Loading,
  Notification,
  RecoveryModal,
} from '../Components';
import * as ImagePicker from 'react-native-image-picker';

import {
  ChevronLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../ReduxStore/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';
import {Button, RadioButton} from 'react-native-paper';
import {useNotifications} from '../AsyncStorage/Notification';
import {client} from '../constants/thirdweb';
import {getItem} from '../constants/mmkv';
import {wp} from '../constants/Dimensions';

// Reusable BuySection component with dynamic price
function BuySection({price, productName, product}) {
  return (
    <View style={[styles.stepContainer, {borderColor: theme.borderColor}]}>
      <Text style={{textAlign: 'center', fontWeight: '600'}}>
        {productName}
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8, flex: 1}}>
        {product.map((products, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              width: product?.length > 0 ? '30%' : '100%',
              height: product?.length > 0 ? wp(60) : wp(30),
            }}>
            <Image
              source={{uri: products?.item?.image}}
              style={styles.buyImage}
            />
          </View>
        ))}
      </View>
      <Text style={{textAlign: 'center', fontWeight: '600'}}>
        Price: ${price.toFixed(2)}
      </Text>
      <View style={{gap: 8, marginTop: 16}}>
        <Button
          onPress={async () => {
            const url = await makeUrl(price);
            const mmUrl = new URL(
              `https://metamask.app.link/dapp/${url.toString()}`,
            );
            Linking.openURL(mmUrl.toString());
          }}>
          Pay with Metamask
        </Button>
        <Button
          onPress={async () => {
            const url = encodeURIComponent((await makeUrl(price)).toString());
            const mmUrl = new URL(
              `https://phantom.app/ul/browse/${url}?ref=${url}`,
            );
            Linking.openURL(mmUrl.toString());
          }}>
          Pay with Phantom
        </Button>
      </View>
    </View>
  );
}

async function makeUrl(price) {
  const authToken = await AsyncStorage.getItem(
    `walletToken-${client.clientId}`,
  );
  const url = new URL('https://thirdweb.com/pay');

  url.searchParams.set('clientId', client.clientId);
  url.searchParams.set('chainId', '8453');
  url.searchParams.set(
    'tokenAddress',
    '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  );
  url.searchParams.set(
    'recipientAddress',
    '0x2247d5d238d0f9d37184d8332aE0289d1aD9991b',
  );

  const amount = Math.floor(price * 10 ** 6).toString();
  url.searchParams.set('amount', amount);

  url.searchParams.set('redirectUri', 'com.sneakers://');
  url.searchParams.set('theme', 'light');
  url.searchParams.set('name', 'thirdweb hoodie');
  url.searchParams.set('preferredWallet', 'io.metamask');
  url.searchParams.set(
    'image',
    'https://playground.thirdweb.com/drip-hoodie.png',
  );

  if (authToken) {
    url.searchParams.set('authCookie', authToken);
    url.searchParams.set('walletId', 'inApp');
    url.searchParams.set('authProvider', 'google');
  }

  return url;
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  buyImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
});

const CheckOut = ({navigation, route}) => {
  const products = route.params.products;

  // console.log(products[0]?.item?.image);

  // function extractProductImages(products) {
  //   if (!Array.isArray(products)) return [];

  //   return products
  //     .map(product => product?.item?.image)
  //     .filter(img => img !== undefined && img !== null);
  // }

  const price = route.params.price;
  const Delivery = route.params.dPrice;
  const total = price + Delivery;

  const [images, setImages] = React.useState('');

  const [address, setAddress] = React.useState('');
  const [checked, setChecked] = React.useState('online');
  const [methodOfTransaction, setMethodOfTransaction] =
    React.useState('Credit Card');

  const {addNotification} = useNotifications();
  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const data = getItem('user');

  const handlePaymentIntent = async () => {
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
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
      defaultBillingDetails: {address: 'Pakistan'},
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
    if (address.length > 10) {
      try {
        const order = await createOrder({
          id: data?._id,
          username: data?.username,
          email: data?.email,
          phoneNumber: data?.phonenumber,
          address: address,
          paymentMethod: methodOfTransaction,
          payment: total,
          product: products,
        });
        if (order.data.status) {
          addNotification(order.data);
          ToastAndroid.showWithGravity(
            order.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('MyCart');
        } else {
          ToastAndroid.showWithGravity(
            'Something went wrong',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please enter a valid address',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const textStyles = 'justify-between items-center flex-row';

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
        setImages(uri);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Notification />
      {isLoading && <Loading />}
      <RecoveryModal modelType={true} />
      <View
        style={{flex: 1, backgroundColor: theme.backgroundColor, padding: 12}}>
        <HeaderComp
          title={'Checkout'}
          inlineStyles={{fontSize: 18, fontWeight: '600'}}
          prepend={
            <TouchableOpacity
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                elevation: 3,
                borderRadius: 30,
              }}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon color={theme.darkColor} size={18} />
            </TouchableOpacity>
          }
          apppend={<View style={{width: 40}} />}
        />
        <ScrollView
          style={{flex: 1, backgroundColor: 'white', borderRadius: 16}}>
          <Text style={{padding: 20, fontWeight: 'bold', fontSize: 18}}>
            Contact Form
          </Text>

          <View style={{marginHorizontal: 16}}>
            <InputField
              maxLength={40}
              value={data?.username}
              placeholder={'Your Name'}
              prependChild={
                <UserIcon color={theme.primeryDark} size={22} strokeWidth={2} />
              }
            />
            <InputField
              maxLength={40}
              value={data?.email}
              placeholder={'Your Email'}
              prependChild={
                <EnvelopeIcon
                  color={theme.primeryDark}
                  size={22}
                  strokeWidth={2}
                />
              }
            />
            <InputField
              maxLength={40}
              value={data?.phonenumber}
              placeholder={'Your Phone Number'}
              prependChild={
                <PhoneIcon
                  color={theme.primeryDark}
                  size={22}
                  strokeWidth={2}
                />
              }
            />
            <InputField
              maxLength={40}
              value={address}
              onChangeText={setAddress}
              placeholder={'Your Proper Address'}
              prependChild={
                <MapPinIcon
                  color={theme.primeryDark}
                  size={22}
                  strokeWidth={2}
                />
              }
            />
          </View>

          <Text style={{margin: 16, fontWeight: 'bold', fontSize: 16}}>
            Payment Method
          </Text>
          {['online', 'cash', 'Wallet'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setChecked(option);
                setMethodOfTransaction(
                  option === 'online'
                    ? 'Credit Card'
                    : option === 'cash'
                    ? 'Cash on Delivery'
                    : 'Wallet',
                );
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value={option}
                color={theme.primery}
                status={checked === option ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(option);
                  setMethodOfTransaction(
                    option === 'online'
                      ? 'Credit Card'
                      : option === 'cash'
                      ? 'Cash on Delivery'
                      : 'Wallet',
                  );
                }}
              />
              <Text style={{fontWeight: 'bold'}}>
                {option === 'online'
                  ? 'Online Payment'
                  : option === 'cash'
                  ? 'Cash on Delivery'
                  : 'Pay with Wallet'}
              </Text>
            </TouchableOpacity>
          ))}

          <BuySection
            price={total}
            productName={'Sneakers'}
            product={products}
            // image={'https://playground.thirdweb.com/drip-hoodie.png'}
            // image={products[0]?.item?.image}
          />
        </ScrollView>
      </View>

      <View style={{backgroundColor: 'white', width: '100%'}}>
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'gray'}}>SubTotal</Text>
            <Text style={{fontWeight: 'bold'}}>${price}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'gray'}}>Delivery</Text>
            <Text style={{fontWeight: 'bold'}}>${Delivery}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              marginVertical: 8,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'gray'}}>Total</Text>
            <Text style={{fontWeight: 'bold'}}>${total}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (address.length > 10) {
              if (checked === 'online') handlePaymentIntent();
              else if (checked === 'Wallet') {
                // integrate wallet payment logic here
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
          style={{
            margin: 16,
            borderRadius: 16,
            height: 56,
            backgroundColor: theme.primery,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CheckOut;
