import {ToastAndroid, View} from 'react-native';
import React from 'react';
import {useGetOrderMutation} from '../ReduxStore/apiSlice';
import {HeaderComp, InputField, Loading} from '../Components';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import DisplayOrder from '../Components/DisplayOrder';
import LottieView from 'lottie-react-native';

const OrderedProduct = ({navigation}) => {
  const [getOrder, {isLoading}] = useGetOrderMutation();

  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);

  const searchProdct = async () => {
    const responce = await getOrder({
      reference: search,
    });

    if (!responce.data.status) {
      ToastAndroid.showWithGravity(
        'Order not found',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    setData(responce.data);
  };

  return (
    <>
      {isLoading && <Loading />}
      <ScrollView className="flex-1 p-4 bg-background">
        <HeaderComp
          title={'Find Order'}
          inlineStyles={{
            fontSize: 18,
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
          placeholder={'Enter product id'}
          containerStyles={{backgroundColor: '#fff'}}
          value={search}
          onChangeText={text => setSearch(text)}
          prependChild={
            <MagnifyingGlassIcon color={theme.primeryDark} size={'22'} />
          }
          appendChild={
            <TouchableOpacity
              onPress={() => {
                searchProdct();
              }}
              className="bg-primary rounded-lg p-1">
              <PaperAirplaneIcon color={'#fff'} size={'28'} />
            </TouchableOpacity>
          }
        />
        {data.length > 0 ? (
          <DisplayOrder items={data.data} />
        ) : (
          <View className="flex-1 justify-center mt-36">
            <LottieView
              loop
              autoPlay
              style={{aspectRatio: 1.4}}
              source={require('../../assets/lottieAnimation/search.json')}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default React.memo(OrderedProduct);
