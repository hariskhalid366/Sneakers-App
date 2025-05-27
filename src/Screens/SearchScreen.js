import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderComp, InputField, Loading, ShoesCard} from '../Components';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {searchProducts} from '../services/apiServices';
import showToast from '../Components/Toast';
import {hp, wp} from '../constants/Dimensions';
import {useDebounce} from 'use-debounce';

const SearchScreen = ({navigation}) => {
  const toastRef = React.useRef(null);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearch.trim().length === 0) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        const response = await searchProducts({search: debouncedSearch});
        setProducts(response?.data || []);
        console.log(response);
      } catch (err) {
        showToast(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  return (
    <>
      {loading && <Loading />}
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <HeaderComp
                title={'Search'}
                inlineStyles={{
                  fontSize: 22,
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
                apppend={<View className="w-10" />}
              />
              <InputField
                prependChild={
                  <MagnifyingGlassIcon
                    color={theme.darkColor}
                    strokeWidth={2}
                    size={'23'}
                  />
                }
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder={'Search Your Shoes'}
                innerStyles={{flex: 1, marginLeft: 10}}
                containerStyles={{
                  backgroundColor: theme.backgroundColor,
                  marginHorizontal: 8,
                  elevation: 3,
                }}
              />
            </>
          )}
          legacyImplementation={true}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 20,

            paddingHorizontal: 10,
          }}
          data={Array.isArray(products) ? products : []}
          numColumns={2}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                top: hp(15),
                opacity: 0.43,
              }}>
              <Image
                style={{width: wp(30), height: wp(30), borderRadius: wp(5)}}
                source={require('../../assets/logo.png')}
              />
            </View>
          )}
          renderItem={({item, index}) => (
            <ShoesCard
              item={item}
              index={index}
              bestSellers={false}
              favourite={false}
              setRef={toastRef}
            />
          )}
        />
      </View>
    </>
  );
};

export default SearchScreen;
