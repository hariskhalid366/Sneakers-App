import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {HeaderComp, ShoesCard} from '../Components';
import {ChevronLeftIcon, TrashIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {FlatList} from 'react-native-gesture-handler';
import {useFavorites} from '../AsyncStorage/FavStorage';
import LottieView from 'lottie-react-native';

const Favourite = () => {
  const {favorites, deleteAllFavorites} = useFavorites();

  return (
    <View className="flex-1 bg-background px-3">
      <HeaderComp
        title={'Favoirute'}
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
              deleteAllFavorites();
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
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          numColumns={2}
          renderItem={({item, index}) => (
            <ShoesCard index={index} item={item} favourite={true} />
          )}
        />
      ) : (
        <View className="flex-1 justify-center mb-32 ">
          <LottieView
            loop
            autoPlay
            style={{aspectRatio: 1.1}}
            source={require('../../assets/lottieAnimation/heart.json')}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(Favourite);
