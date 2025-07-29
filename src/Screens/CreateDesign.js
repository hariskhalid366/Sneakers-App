import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AnimatedFAB, FAB, Portal} from 'react-native-paper';
import {
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {hp, wp} from '../constants/Dimensions';
import {FlatList} from 'react-native-gesture-handler';
import CreatorCard from '../Components/CreatorCard';
import {useRoute} from '@react-navigation/native';
import {HeaderComp, Loading} from '../Components';
import {getItem} from '../constants/mmkv';
import {GET} from '../services/apiServices';
import showToast from '../Components/Toast';
import {useQuery} from '@tanstack/react-query';
import ScrollToRefresh from '../Components/Refresh';

const CreateDesign = ({navigation}) => {
  const route = useRoute();
  const [active, setActive] = React.useState(false);

  const userData = getItem('user');

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['myCollection', userData?._id],
    queryFn: () => GET(`/api/bid/mine/${userData?._id}`),
    experimental_prefetchInRender: true,
  });

  if (error) {
    showToast(error?.message || 'Something went wrong');
  }

  useEffect(() => {
    if (route?.name === 'CreateDesign') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [route]);

  const onScroll = ({nativeEvent}) => {
    setActive(false);
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    if (currentScrollPosition <= 150) {
      setActive(true);
    }
    if (currentScrollPosition > 300) {
      setActive(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <AnimatedFAB
        iconMode="static"
        visible={active}
        onPress={() => {
          navigation.navigate('UploadDesign');
        }}
        animated={true}
        icon={() => {
          return <PlusIcon color={theme.backgroundColor} size={wp(6)} />;
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          zIndex: 100,
          right: 20,
        }}
      />
      <View
        style={{
          backgroundColor: theme.secondaryBackground,
        }}>
        <HeaderComp
          title={'My Collections'}
          inlineStyles={{
            fontSize: 18,
            fontWeight: '600',
          }}
          containerStyles={{
            paddingHorizontal: 10,
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
              // onPress={() => {
              //   deleteAllFavorites();
              // }}
              style={{
                backgroundColor: theme.backgroundColor,
                padding: 10,
                borderRadius: 30,
                elevation: 3,
              }}>
              <TrashIcon
                strokeWidth={1.5}
                color={theme.darkColor}
                size={'20'}
              />
            </TouchableOpacity>
          }
        />
        <FlatList
          onScroll={onScroll}
          legacyImplementation={true}
          contentContainerStyle={{paddingBottom: hp(15)}}
          data={data?.data}
          renderItem={({index, item}) => (
            <CreatorCard item={item} key={index} />
          )}
        />
      </View>
    </>
  );
};

export default CreateDesign;

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    paddingBottom: hp(0.5),
    zIndex: 300,
  },
});
