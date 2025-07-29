import React, {useEffect, useRef} from 'react';
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  TruckIcon,
} from 'react-native-heroicons/outline';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import {AnimatedFAB} from 'react-native-paper';
import {hp, wp} from '../constants/Dimensions';
import {theme} from '../constants/theme';
import Nfts from '../constants/nftData.json';
import {useQuery} from '@tanstack/react-query';
import {GET} from '../services/apiServices';
import {
  DiscountBanners,
  HeaderComp,
  ModalMenu,
  ShoesCard,
  Notification,
  Loading,
} from '../Components';
import LottieView from 'lottie-react-native';
// import LottieView from 'lottie-react-native'; // comment if using web

const HomeScreen = ({navigation}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['homeScreen'],
    experimental_prefetchInRender: true,
    queryFn: () => GET('/api/products/data'),
  });

  const [isExtended, setIsExtended] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(true);
  const [selected, setSelected] = React.useState('All Shoes');
  const [isAppLoading, setIsAppLoading] = React.useState(true); // renamed to avoid conflict
  const [visible, setVisible] = React.useState(false);

  // const product = useSelector(state => state?.products?.product);
  // const popular = useSelector(state => state?.popular?.product);

  const bottomSheetRef = useRef(null);
  const toastRef = useRef();

  const handleFilterPress = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (data) {
      setIsAppLoading(false);
    }
  }, [data]);

  const onScroll = ({nativeEvent}) => {
    setVisible(false);
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
    setIsVisible(currentScrollPosition <= 150);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Notification ref={toastRef} />

      <ModalMenu setVisible={setVisible} visible={visible} />
      <AnimatedFAB
        icon={() => (
          <Image
            source={require('../../assets/chat.png')}
            style={{width: wp(15), height: wp(15), tintColor: '#fff'}}
          />
        )}
        label={'Sneakers Assistant'}
        extended={isExtended}
        onPress={() => {
          navigation.navigate('ChatBot');
        }}
        color="#fff"
        visible={isVisible}
        animateFrom={'right'}
        style={styles.fabStyle}
      />

      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={20}
        style={{padding: 20}}>
        <HeaderComp
          title={'Explore'}
          apppend={
            <TouchableOpacity
              onPress={() => navigation.push('SearchOrdredProduct')}
              style={styles.iconButton}>
              <TruckIcon color={theme.darkColor} size={18} />
            </TouchableOpacity>
          }
          prepend={
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/barIcon.png')}
              />
            </TouchableOpacity>
          }
        />

        <View style={styles.searchContainer}>
          <Pressable
            onPress={() => navigation.navigate('Search')}
            style={styles.searchBox}>
            <MagnifyingGlassIcon
              strokeWidth={2}
              size={25}
              color={theme.secondaryDark}
            />
            <Text style={styles.searchText}>Looking For Shoes</Text>
          </Pressable>
          <TouchableOpacity
            onPress={handleFilterPress}
            style={styles.filterButton}>
            <AdjustmentsHorizontalIcon
              color={theme.backgroundColor}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Select Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={item => item?._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setSelected(item?.name)}
              style={[
                styles.categoryButton,
                selected === item?.name && styles.categoryButtonActive,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  selected === item?.name && styles.categoryTextActive,
                ]}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Shoes</Text>
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {isAppLoading ? (
          <LottieView
            source={require('../../assets/lottieAnimation/animation.json')}
            style={{width: 25, height: 25, alignSelf: 'center'}}
            autoPlay
            loop
          />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data}
            keyExtractor={item => item?._id}
            renderItem={({item}) => <ShoesCard item={item} setRef={toastRef} />}
          />
        )}

        <DiscountBanners />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New NFTs</Text>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate('NFTs')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {Nfts.map((nft, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Image source={nftImages[nft?.image]} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{nft?.name}</Text>
                <Text style={styles.price}>{nft?.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('NFTs')}
            style={styles.card}>
            <Text>View All</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate('All Products')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          scrollEnabled={false}
          data={data?.data}
          numColumns={2}
          keyExtractor={item => item?._id}
          renderItem={({item, index}) => (
            <ShoesCard
              item={item}
              index={index}
              bestSellers={false}
              favourite={false}
              setRef={toastRef}
            />
          )}
          contentContainerStyle={{paddingBottom: 40}}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    zIndex: 300,
    backgroundColor: theme.primery,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: theme.backgroundColor,
    padding: 10,
    elevation: 3,
    borderRadius: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  searchText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: theme.primery,
    padding: 10,
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.primery,
    marginHorizontal: 5,
  },
  categoryButtonActive: {
    backgroundColor: theme.primery,
  },
  categoryText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.primery,
    fontWeight: '700',
  },
  container: {
    gap: 10,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    width: wp(33.3),
    backgroundColor: '#FFF',
    borderRadius: 14,
    width: wp(44),
    elevation: 2,
  },
  image: {
    width: wp(33.3),
    height: wp(50.3),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
