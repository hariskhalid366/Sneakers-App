import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {HeaderComp, Loading, Notification} from '../Components';
import {
  ChevronLeftIcon,
  CurrencyDollarIcon,
  HeartIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon as Heart} from 'react-native-heroicons/solid';
import {theme} from '../constants/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {MoreOrLess} from '@rntext/more-or-less';
import {useCart} from '../AsyncStorage/cartStorage';
import {useFavorites} from '../AsyncStorage/FavStorage';
import {useQuery} from '@tanstack/react-query';
import {getBidProductById, getProductsByID} from '../services/apiServices';
import BidModal from '../Components/((modal))/BidModal';
import {wp} from '../constants/Dimensions';

const ProductScreen = ({navigation, route}) => {
  const {id, minted} = route?.params;

  const {data, isLoading, error} = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (minted) {
        return getBidProductById(id);
      } else {
        return getProductsByID(id);
      }
    },
  });
  useEffect(() => {
    if (data?.product?.images?.length > 0) {
      if (!minted) {
        setImages(data?.product?.images[0]);
      }
    } else if (data?.product?.image) {
      setImages(data?.product?.image);
    }
  }, [data?.product?.images, data?.product?.image, minted]);

  const {addToCart} = useCart();

  const [Images, setImages] = React.useState(null);

  const [selected, setSelected] = React.useState('');

  const handleAddToCart = product => {
    addToCart(product);

    toastRef.current.show({
      type: 'cart',
      text: product?.name,
      image: product?.image,
    });
    setTimeout(() => {
      navigation.navigate('MyCart');
    }, 1500);
  };

  console.log('data', data?.product._id);

  const {favorites, addToFavorites, removeFromFavorites} = useFavorites();

  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const isItemFavorite = favorites.some(
      favoriteItem => favoriteItem?._id === data?.product?._id,
    );
    setIsFavorite(isItemFavorite);
  }, [favorites, data?.product]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(data?.product?._id);
    } else {
      addToFavorites(data?.product);
    }
  };

  const toastRef = useRef();

  if (error) {
    showToast(error.message || 'Something went wrong');
  }

  const modalRef = useRef(null);
  const handleOpenBidModal = () => {
    modalRef?.current?.expand();
  };
  return (
    <>
      {isLoading && <Loading />}
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
            <View className="flex-row items-center justify-between">
              <Text className="  w-9/12 text-black text-3xl font-bold tracking-wide">
                {data?.product?.brand
                  ? data?.product?.brand
                  : '' + data?.product?.name}
              </Text>

              {/* <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('ARScreen');
                }}>
                <Text className="  text-gray-500 text-base font-semibold tracking-wide">
                  AR mode
                </Text>
              </TouchableOpacity> */}
            </View>
            <Text className="  my-2 text-gray-500 text-base font-semibold tracking-wide">
              Men's Shoes
            </Text>
            <Text className=" mb-3 text-black font-bold tracking-wide text-2xl">
              ${data?.product?.price || data?.product?.currentBid?.amount}
            </Text>
            <Animated.Image
              sharedTransitionTag="PRODUCT_IMAGE"
              style={{aspectRatio: 1, borderRadius: 20}}
              source={{uri: Images}}
            />
            {data?.product?.images?.length > 1 && (
              <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                scrollEnabled={false}
                horizontal
                data={data?.product?.images}
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
            {data?.product?.sizes && (
              <View className="flex-row my-4 items-center">
                <Text className="  text-sm text-black font-bold">
                  Available Sizes:
                </Text>
                <FlatList
                  horizontal
                  data={data?.product?.sizes}
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
            )}
            {data?.product?.creator && (
              <View className="mt-3 flex-row align-middle items-center gap-3">
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: wp(100),
                    backgroundColor: '#00000066',
                  }}
                  source={{uri: data?.product?.creator?.avatar}}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('PublicProfile')}>
                  <Text className="font-bold text-lg tracking-wide">
                    {data?.product?.creator?.username}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="font-bold text-sm tracking-wide text-primary">
                    Follow
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Text className="mt-3 font-semibold text-lg tracking-wide">
              Description :
            </Text>
            <MoreOrLess
              numberOfLines={5}
              textButtonStyle={{color: theme.primery}}
              animated={true}>
              {data?.product?.description}
            </MoreOrLess>
          </View>
        </ScrollView>
        <View className="absolute flex-row bottom-4 justify-around w-full items-center">
          <TouchableOpacity
            onPress={() => {
              toastRef.current.show({
                type: 'fav',
                text: data?.product?.name,
                image: data?.product?.image,
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
          {minted && (
            <TouchableOpacity
              onPress={handleOpenBidModal}
              style={{elevation: 3}}
              className="rounded-full p-3 bg-white">
              <CurrencyDollarIcon color={'green'} size={'30'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-primary rounded-2xl"
            onPress={() => {
              handleAddToCart(data?.product);
            }}>
            <Text className="  text-white text-lg font-bold py-2 px-16">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BidModal sheetRef={modalRef} data={data} />
    </>
  );
};

export default ProductScreen;
