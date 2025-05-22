import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {HeaderComp, Notification} from '../Components';
import {
  ChevronLeftIcon,
  HeartIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon as Heart} from 'react-native-heroicons/solid';
import {theme} from '../constants/theme';
import {useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {MoreOrLess} from '@rntext/more-or-less';
import {useCart} from '../AsyncStorage/cartStorage';
import {useFavorites} from '../AsyncStorage/FavStorage';

const ProductScreen = ({navigation, route}) => {
  // const id = route.params.id;

  const {addToCart} = useCart();

  const product = useSelector(state => state.products.selectedProduct);

  // const {data, isLoading, error} = useGetProductQuery(id);

  // const product = data?.data;

  // if (isLoading) {
  //   return (
  //     <View className="flex items-center m-6 justify-center">
  //       <LottieView
  //         source={require('../../assets/lottieAnimation/animation.json')}
  //         style={{width: 50, height: 50}}
  //         autoPlay
  //         loop
  //       />
  //     </View>
  //   );
  // }

  // if (error) {
  //   ToastAndroid.showWithGravityAndOffset(
  //     'Network Connection Error',
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50,
  //   );
  // }

  const [Images, setImages] = React.useState(product?.image);

  const [selected, setSelected] = React.useState('');

  const handleAddToCart = product => {
    addToCart(product);

    toastRef.current.show({
      type: 'cart',
      text: product.name,
      image: product.image,
    });
    setTimeout(() => {
      navigation.navigate('MyCart');
    }, 1500);
  };

  const {favorites, addToFavorites, removeFromFavorites} = useFavorites();

  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    // Check if the current item is in the favorites list
    const isItemFavorite = favorites.some(
      favoriteItem => favoriteItem.id === product.id,
    );
    setIsFavorite(isItemFavorite);
  }, [favorites, product]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const toastRef = useRef();

  return (
    <>
      <Notification ref={toastRef} />
      <View className="flex-1 bg-background p-3.5">
        <HeaderComp
          title={'Product Detail'}
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
          apppend={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyCart');
              }}
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                borderRadius: 30,
                elevation: 3,
              }}>
              <ShoppingBagIcon
                strokeWidth={1.5}
                color={theme.darkColor}
                size={'20'}
              />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <View className="m-3">
            <Text className="  w-9/12 text-black text-3xl font-bold tracking-wide">
              {product?.brand ? product?.brand : '' + product?.name}
            </Text>
            <Text className="  my-2 text-gray-500 text-base font-semibold tracking-wide">
              Men's Shoes
            </Text>
            <Text className="  text-black font-bold tracking-wide text-2xl">
              ${product?.price}
            </Text>
            <Animated.Image
              sharedTransitionTag="carousal"
              style={{aspectRatio: 1}}
              source={{uri: Images}}
            />
            {product?.images?.length > 1 && (
              <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                scrollEnabled={false}
                horizontal
                data={product?.images}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setImages(item);
                    }}
                    key={index}
                    className="justify-center items-center mx-1">
                    <Animated.Image
                      sharedTransitionTag="carousal"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 15,
                        borderWidth: 1,
                        marginHorizontal: 1,
                        borderColor: theme.primery,
                      }}
                      source={{uri: item}}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
            <View className="flex-row my-4 items-center">
              <Text className="  text-sm text-black font-bold">
                Available Sizes:
              </Text>
              <FlatList
                horizontal
                data={product.sizes}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item);
                    }}
                    style={{
                      backgroundColor:
                        selected === item ? theme.primeryDark : 'transparent',
                      borderRadius: 20,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: '#000',
                      marginHorizontal: 6,
                    }}
                    activeOpacity={0.6}>
                    <Text
                      style={{
                        color: selected === item ? '#fff' : '#000',
                      }}
                      className="p-2 text-sm font-bold">
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text className="  font-bold text-lg tracking-wide">
              Description :
            </Text>
            <MoreOrLess
              numberOfLines={5}
              textButtonStyle={{color: theme.primery}}
              animated={true}>
              {product.description}
            </MoreOrLess>
          </View>
        </ScrollView>
        <View className="absolute flex-row bottom-4 justify-around w-full items-center">
          <TouchableOpacity
            onPress={() => {
              toastRef.current.show({
                type: 'fav',
                text: product.name,
                image: product.image,
              });
              handleToggleFavorite();
            }}
            style={{elevation: 3}}
            className="rounded-full p-3 bg-white">
            {isFavorite ? (
              <Heart color={'red'} size={'20'} />
            ) : (
              <HeartIcon strokeWidth={2} color={'#000'} size={'20'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary rounded-2xl"
            onPress={() => {
              handleAddToCart(product);
            }}>
            <Text className="  text-white text-lg font-bold py-2 px-16">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProductScreen;
