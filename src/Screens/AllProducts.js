import {View} from 'react-native';
import React, {useRef} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {HeaderComp, Notification, ShoesCard} from '../Components';
import {theme} from '../constants/theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useSelector} from 'react-redux';

const AllProducts = () => {
  const product = useSelector(state => state?.products?.product);
  const toastRef = useRef();

  return (
    <>
      <Notification ref={toastRef} />

      <ScrollView className="bg-background flex-1 p-4">
        <HeaderComp
          title={'All Products'}
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
          apppend={<View className="w-9" />}
        />
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

export default React.memo(AllProducts);
