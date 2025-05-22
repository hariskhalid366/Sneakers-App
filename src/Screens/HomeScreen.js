import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  TruckIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {
  DiscountBanners,
  HeaderComp,
  ModalMenu,
  ShoesCard,
  Notification,
} from '../Components';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ShoesList} from '../constants/shoelist';
import data from '../constants/data.json';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {DrawerActions} from '@react-navigation/native';
import {AnimatedFAB} from 'react-native-paper';
import {hp, wp} from '../constants/Dimensions';
import ChatBotModal from '../Components/((modal))/ChatBotModal';

const HomeScreen = ({navigation}) => {
  React.useEffect(() => {
    if (data?.length > 0) {
      setLoading(false);
    }
    setTimeout(() => {
      setIsExtended(true);
    }, 2000);
  }, []);

  const [isExtended, setIsExtended] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [selected, setSelected] = React.useState('All Shoes');
  const [Loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const product = useSelector(state => state?.products?.product);
  const popular = useSelector(state => state?.popular?.product);

  const handleFilterPress = () => {
    setVisible(!visible);
  };
  const bottomSheetRef = useRef(null);

  const toastRef = useRef();

  const onScroll = ({nativeEvent}) => {
    setVisible(false);
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
    if (currentScrollPosition <= 150) {
      setIsVisible(true);
    }
    if (currentScrollPosition > 300) {
      setIsVisible(false);
    }
  };

  return (
    <>
      <Notification ref={toastRef} />
      <ChatBotModal ref={bottomSheetRef} />

      <ModalMenu setVisible={setVisible} visible={visible} />
      <AnimatedFAB
        icon={({}) => (
          <Image
            source={require('../../assets/chat.png')}
            style={{width: wp(15), height: wp(15), tintColor: '#fff'}}
          />
        )}
        label={'Sneakers Assistant'}
        extended={isExtended}
        onPress={() => {
          bottomSheetRef.current.present();
        }}
        color="#fff"
        visible={isVisible}
        animateFrom={'right'}
        style={[styles.fabStyle]}
      />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={20}
        className="flex p-5"
        style={{backgroundColor: theme.secondaryBackground}}>
        <HeaderComp
          title={'Explore'}
          apppend={
            <TouchableOpacity
              onPress={() => {
                navigation.push('SearchOrdredProduct');
              }}
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                elevation: 3,
                borderRadius: 30,
              }}>
              <TruckIcon color={theme.darkColor} size={'18'} />
            </TouchableOpacity>
          }
          prepend={
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              <Image
                className="w-6 h-6"
                source={require('../../assets/barIcon.png')}
              />
            </TouchableOpacity>
          }
        />
        <View className="justify-between items-center flex-row">
          <Pressable
            onPress={() => {
              navigation.navigate('Search');
            }}
            className="items-center flex-row bg-white flex-1 p-3 rounded-xl mr-2">
            <MagnifyingGlassIcon
              strokeWidth={2}
              size={'25'}
              color={theme.secondaryDark}
            />
            <Text className="   text-sm font-semibold text-gray-500 tracking-wide mx-3">
              Looking For Shoes
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              handleFilterPress();
            }}
            style={{
              backgroundColor: theme.primery,
              padding: 10,
              borderRadius: 30,
            }}>
            <AdjustmentsHorizontalIcon
              color={theme.backgroundColor}
              size={'28'}
            />
          </TouchableOpacity>
        </View>
        <View className="my-3.5">
          <Text className="   text-xl font-semibold tracking-wide">
            Select Category
          </Text>
          <FlatList
            horizontal
            backfaceVisibility={'hidden'}
            legacyImplementation={true}
            showsHorizontalScrollIndicator={false}
            data={ShoesList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item.name);
                }}
                className={
                  selected === item.name
                    ? 'px-6 py-3 my-4 rounded-lg  mx-2 bg-primary '
                    : 'px-6 py-3 my-4 rounded-lg bg-white mx-2'
                }
                style={{borderWidth: 1, borderColor: theme.primery}}
                key={item.id}>
                <Text
                  className={
                    selected === item.name
                      ? 'text-white text-sm font-semibold'
                      : 'text-gray-500 text-sm font-medium'
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View className="mx-2 flex-row justify-between items-center">
            <Text className="text-lg font-medium">Popular Shoes</Text>
            <TouchableOpacity activeOpacity={0.4}>
              <Text className="   text-sm text-primary font-bold">See all</Text>
            </TouchableOpacity>
          </View>
          {Loading ? (
            <View className="flex items-center m-6 justify-center">
              <LottieView
                source={require('../../assets/lottieAnimation/animation.json')}
                style={{width: 25, height: 25}}
                autoPlay
                loop
              />
            </View>
          ) : (
            <FlatList
              horizontal
              renderToHardwareTextureAndroid={true}
              legacyImplementation={true}
              showsHorizontalScrollIndicator={false}
              data={popular.filter(
                item => selected === 'All Shoes' || item.category === selected,
              )}
              renderItem={({item}) => (
                <ShoesCard item={item} setRef={toastRef} />
              )}
              ListHeaderComponent={() => {
                if (Loading) {
                  return (
                    <View className="flex items-center m-6 justify-center">
                      <LottieView
                        source={require('../../assets/lottieAnimation/animation.json')}
                        style={{width: 25, height: 25}}
                        autoPlay
                        loop
                      />
                    </View>
                  );
                }
                return null;
              }}
            />
          )}
          <DiscountBanners />
          <View className="mx-2 my-1 flex-row justify-between items-center">
            <Text className="   text-lg  font-medium">New Arrivals</Text>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                navigation.navigate('All Products');
              }}>
              <Text className="   text-sm text-primary font-bold">See all</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          legacyImplementation={true}
          scrollEnabled={false}
          contentContainerStyle={{paddingBottom: 40}}
          data={product}
          numColumns={2}
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
      </ScrollView>
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    zIndex: 300,
    backgroundColor: theme.primery,
  },
});
