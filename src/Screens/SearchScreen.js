import {Dimensions, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HeaderComp, InputField} from '../Components';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';

const SearchScreen = ({navigation}) => {
  const handleSearch = text => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setSearch(text);
  };
  const [search, setSearch] = React.useState('');

  return (
    <View className="flex-1 bg-background p-3">
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
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder={'Search Your Shoes'}
        innerStyles={{flex: 1, marginLeft: 10}}
        containerStyles={{
          backgroundColor: theme.backgroundColor,
          marginHorizontal: 8,
          elevation: 3,
        }}
      />
    </View>
  );
};

export default SearchScreen;
