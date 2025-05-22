import {
  Text,
  ToastAndroid,
  View,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {CartCard, HeaderComp} from '../Components';
import {ChevronLeftIcon, TrashIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {FlatList} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../AsyncStorage/cartStorage';
const textStyles = 'justify-between items-center flex-row';

const MyCart = () => {
  const navigation = useNavigation();
  const {cart, removeFromCart, deleteAll, increaseQuantity, decreaseQuantity} =
    useCart();

  const handleRemoveFromCart = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeFromCart(id);
  };

  const handleIncreaseQuantity = id => {
    increaseQuantity(id);
  };
  const handleDecreaseQuantity = id => {
    decreaseQuantity(id);
  };

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [DeliveryPrice, setDeliveryPrice] = React.useState(
    totalPrice > 300 ? 0 : 60,
  );

  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCheckPress = item => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.item.id === item.id,
    );

    setSelectedItems(prevSelectedItems => {
      let updatedSelectedItems;
      if (isSelected) {
        updatedSelectedItems = prevSelectedItems.filter(
          selectedItem => selectedItem.item.id !== item.id,
        );
      } else {
        updatedSelectedItems = [
          ...prevSelectedItems,
          {
            item,
            price: item.price * item.quantity,
          },
        ];
      }

      const newTotalPrice = updatedSelectedItems.reduce(
        (total, current) => (total += current.price),
        0,
      );
      setTotalPrice(newTotalPrice);

      return updatedSelectedItems;
    });
  };

  return (
    <>
      <View className="flex-1 bg-background px-3 pt-3">
        <HeaderComp
          title={'My Cart'}
          inlineStyles={{
            fontSize: 18,
            fontWeight: '600',
          }}
          prepend={
            <View
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 12,
                elevation: 3,
                borderRadius: 30,
              }}>
              <ChevronLeftIcon color={theme.darkColor} size={'18'} />
            </View>
          }
          apppend={
            <TouchableOpacity
              onPress={() => {
                deleteAll();
              }}
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                borderRadius: 30,
                elevation: 3,
              }}>
              <TrashIcon
                strokeWidth={1.5}
                color={theme.darkColor}
                size={'20'}
              />
            </TouchableOpacity>
          }
        />
        <Text className="   px-2 text-lg font-semibold tracking-wide">
          {cart.length} Items
        </Text>
        {cart.length > 0 ? (
          <FlatList
            legacyImplementation={true}
            data={cart}
            numColumns={1}
            renderItem={({item}) => (
              <CartCard
                item={item}
                increasePress={() => {
                  handleIncreaseQuantity(item.id);
                }}
                deletePress={() => {
                  handleRemoveFromCart(item.id);
                }}
                decresePress={() => {
                  handleDecreaseQuantity(item.id);
                }}
                handleCheckPress={handleCheckPress}
                selectedItems={selectedItems}
              />
            )}
          />
        ) : (
          <View className="flex-1 justify-center mb-36 ">
            <LottieView
              loop
              autoPlay
              style={{aspectRatio: 1}}
              source={require('../../assets/lottieAnimation/cart.json')}
            />
          </View>
        )}
      </View>
      {cart.length > 0 ? (
        <View className="bg-white w-full">
          <View className="p-4 gap-3">
            <View className={textStyles}>
              <Text className="   text-base font-normal text-gray-500">
                SubTotal
              </Text>
              <Text className="   text-base font-semibold text-black">
                $ {totalPrice}
              </Text>
            </View>
            <View className={textStyles}>
              <Text className="   text-base font-normal text-gray-500">
                Delivery
              </Text>
              <Text className="   text-base font-semibold text-black">
                $ {DeliveryPrice}
              </Text>
            </View>
            <View className="border border-gray-500 border-dashed" />
            <View className={textStyles}>
              <Text className="   text-base font-normal text-gray-500">
                Total
              </Text>
              <Text className="   text-base font-semibold text-black">
                $ {totalPrice + DeliveryPrice}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (selectedItems.length > 0) {
                navigation.navigate('Checkout', {
                  products: selectedItems,
                  price: totalPrice,
                  dPrice: DeliveryPrice,
                });
              } else {
                ToastAndroid.showWithGravity(
                  'Select item to proceed',
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
      ) : (
        <View />
      )}
    </>
  );
};

export default MyCart;
