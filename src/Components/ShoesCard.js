import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {HeartIcon, PlusIcon} from 'react-native-heroicons/outline';
import {HeartIcon as Heart} from 'react-native-heroicons/solid';
import {theme} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {productSlice} from '../ReduxStore/productSlice';
import {useCart} from '../AsyncStorage/cartStorage';
import {useFavorites} from '../AsyncStorage/FavStorage';
import Animated from 'react-native-reanimated';
import {wp, hp} from '../constants/Dimensions';

const {width} = Dimensions.get('screen');

const ShoesCard = ({item, favourite, setRef}) => {
  const {addToCart} = useCart();
  const {favorites, addToFavorites, removeFromFavorites} = useFavorites();

  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const isItemFavorite = favorites.some(
      favoriteItem => favoriteItem._id === item._id,
    );
    setIsFavorite(isItemFavorite);
  }, [favorites, item]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(item._id);
    } else {
      setRef?.current?.show({type: 'fav', text: item.name, image: item.image});
      addToFavorites(item);
    }
  };

  // };
  const dispatch = useDispatch();

  const pressOnProduct = () => {
    dispatch(productSlice.actions.setSelectedProduct(item?._id));
    navigation.navigate('Product', {id: item?._id || item?._id});
    // navigation.navigate('Product', {id: item._id});
  };

  const handleAddToCart = product => {
    addToCart(product);
    setRef?.current?.show({type: 'cart', text: item.name, image: item.image});
  };

  const navigation = useNavigation();
  return (
    <View
      key={item?._id}
      style={{width: width * 0.43}}
      className="flex-1 bg-white elevation-sm my-3 mx-1 rounded-2xl">
      <View className="px-3 py-2">
        <TouchableOpacity
          onPress={() => {
            handleToggleFavorite();
          }}
          className=" justify-center items-center w-8 h-6 rounded-full">
          {isFavorite ? (
            <Heart color={'red'} size={'20'} />
          ) : (
            <HeartIcon strokeWidth={2} color={'#000'} size={'20'} />
          )}
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              pressOnProduct();
            }}
            className=" justify-center flex items-center round p-1 py-2">
            {item?.image || item?.imageURL ? (
              <Animated.Image
                sharedTransitionTag="PRODUCT_IMAGE"
                style={{
                  width: wp(30),
                  backgroundColor: '#EBEEF0',
                  borderRadius: 20,
                  resizeMode: 'cover',
                  height: hp(15),
                }}
                source={{uri: item?.image || item?.imageURL}}
              />
            ) : null}
            {/* <View
              style={{transform: [{rotateX: '83deg'}], opacity: 0.3}}
              className="bg-zinc-300 w-16 h-5 rounded-full relative -rotate-12 left-2 bottom-0"
            /> */}
          </TouchableOpacity>
        </View>
        <Text
          style={{fontSize: wp(3), fontWeight: '600'}}
          className="text-primary  font-medium">
          {item?.brand}
        </Text>
        <Text
          numberOfLines={1}
          style={{fontSize: wp(3.2), fontWeight: '400'}}
          className="text-black font-normal tracking-wide">
          {item?.name}
        </Text>
      </View>
      <View
        className=" flex-row justify-between items-center "
        // style={{width: width * 0.429}}>
      >
        <Text
          style={{paddingBottom: favourite ? 10 : 0}}
          className="px-3 text-black text-sm font-semibold">
          ${item?.price}
        </Text>

        {favourite ? (
          <View className="w-24 items-center pb-2 justify-center flex-row gap-2">
            <View className="w-3 h-3 bg-red-600 rounded-full" />
            <View className="w-3 h-3 bg-blue-600 rounded-full" />
            <View className="w-3 h-3 bg-gray-800 rounded-full" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleAddToCart(item);
            }}
            className="bg-primary justify-center items-center w-10 h-10 rounded-tl-2xl rounded-br-2xl ">
            <PlusIcon color={theme.backgroundColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(ShoesCard);
