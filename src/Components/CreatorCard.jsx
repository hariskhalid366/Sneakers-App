import {Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
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
import {hp, wp} from '../constants/Dimensions';

const {width} = Dimensions.get('screen');

const CreatorCard = ({item, favourite, setRef}) => {
  // const {addToCart} = useCart();
  // const {favorites, addToFavorites, removeFromFavorites} = useFavorites();

  // const [isFavorite, setIsFavorite] = React.useState(false);

  // React.useEffect(() => {
  //   const isItemFavorite = favorites.some(
  //     favoriteItem => favoriteItem.id === item.id,
  //   );
  //   setIsFavorite(isItemFavorite);
  // }, [favorites, item]);

  // const handleToggleFavorite = () => {
  //   if (isFavorite) {
  //     removeFromFavorites(item.id);
  //   } else {
  //     setRef?.current?.show({type: 'fav', text: item.name, image: item.image});
  //     addToFavorites(item);
  //   }
  // };

  // // };
  // const dispatch = useDispatch();

  // const pressOnProduct = () => {
  //   dispatch(productSlice.actions.setSelectedProduct(item.id));
  //   navigation.navigate('Product');
  //   // navigation.navigate('Product', {id: item._id});
  // };

  // const handleAddToCart = product => {
  //   addToCart(product);
  //   setRef?.current?.show({type: 'cart', text: item.name, image: item.image});
  // };

  const navigation = useNavigation();
  return (
    <View
      style={{height: hp(32)}}
      key={item?.id}
      className="flex-1 p-2 bg-white elevation-md m-3 rounded-2xl">
      <View>
        {/* {item?.image || item?.imageURL ? ( */}
        <Animated.Image
          sharedTransitionTag="image"
          style={{
            width: '100%',
            height: hp(22),
            backgroundColor: '#EBEEF0',
            borderRadius: 10,
            resizeMode: 'cover',
          }}
          // source={{uri: item?.image || item?.imageURL}}
          source={require('../../assets/shoes.png')}
        />
        {/* ) : null} */}
        {/* <View
              style={{transform: [{rotateX: '83deg'}], opacity: 0.3}}
              className="bg-zinc-300 w-16 h-5 rounded-full relative -rotate-12 left-2 bottom-0"
            /> */}
      </View>
      <View className="py-3 px-2 flex-row items-center gap-2 justify-between">
        <View className="flex-row items-center justify-center gap-2 flex-1 ">
          <Image
            source={require('../../assets/logo.png')}
            style={{width: wp(10), height: wp(10), borderRadius: wp(100)}}
          />
          <View className="flex-1 gap-1">
            <View style={{width: '100%'}} className="flex-row justify-between">
              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: '600',
                  maxWidth: '70%',
                }}
                className="text-primary  font-medium">
                {/* {item?.brand} */}
                Dildo
              </Text>
              <Text
                numberOfLines={1}
                style={{fontSize: wp(3), fontWeight: '400'}}
                className="text-black font-normal tracking-wide">
                {/* {item?.name} */}
                12/03/2025
              </Text>
            </View>

            <Text
              numberOfLines={2}
              style={{fontSize: wp(3), fontWeight: '400'}}
              className="text-black font-normal tracking-wide">
              {/* {item?.name} */}
              aslkjfd;las;lkjfd; Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Beatae ipsum, eaque alias sint repudiandae illum
              nihil consectetur necessitatibus architecto modi earum at magnam
              laudantium quasi vel unde quod praesentium autem?
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(CreatorCard);
