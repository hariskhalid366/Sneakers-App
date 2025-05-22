import React, {useCallback, useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {Swipeable} from 'react-native-gesture-handler';
import {theme} from '../constants/theme';

const CartCard = ({
  item,
  increasePress,
  decresePress,
  deletePress,
  selectedItems,
  handleCheckPress,
}) => {
  const swipeableRef = useRef(null);

  const memoizedHandleCheckPress = useCallback(() => {
    handleCheckPress(item);
  }, [handleCheckPress, item]);

  const rightView = () => (
    <TouchableNativeFeedback onPress={deletePress}>
      <View className="justify-center items-center mx-2 self-center p-4 rounded-2xl h-24 bg-red-600">
        <TrashIcon color={'#fff'} size={'25'} />
      </View>
    </TouchableNativeFeedback>
  );

  const leftView = () => (
    <View className="bg-primary justify-center items-center mx-2 self-center rounded-2xl h-24">
      <TouchableNativeFeedback onPress={increasePress}>
        <View style={styles.Button}>
          <PlusIcon color={'#fff'} size={'20'} />
        </View>
      </TouchableNativeFeedback>
      <View style={styles.border} />
      <TouchableNativeFeedback onPress={decresePress}>
        <View style={styles.Button}>
          <MinusIcon color={'#fff'} size={'20'} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  useEffect(() => {
    // Automatically close the left and right actions after 4 seconds
    const timeout = setTimeout(() => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [swipeableRef]);

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={leftView}
      renderRightActions={rightView}>
      <View className="bg-white rounded-xl h-24 my-1.5 mx-2 flex-row border border-primary justify-between items-center">
        <View className="mx-3 rounded-2xl bg-background">
          <Image
            style={{width: 80, borderRadius: 15, height: 70}}
            source={{uri: item?.image}}
          />
          <View className="w-6 h-6 rounded-full absolute -bottom-2 right-0 justify-center bg-primary items-center">
            <Text className="   text-white text-sm">{item?.quantity}</Text>
          </View>
        </View>
        <View className="flex-1">
          <Text
            lineBreakMode="tail"
            numberOfLines={1}
            className="text-base font-medium tracking-wide text-black">
            {item?.name}
          </Text>
          <Text className="   text-base font-semibold text-black">
            $ {item?.price}
          </Text>
        </View>
        <TouchableOpacity
          onPress={memoizedHandleCheckPress}
          style={{
            backgroundColor:
              selectedItems.findIndex(
                selectedItem => selectedItem.item.id === item.id,
              ) !== -1
                ? theme.primery
                : '#00000012',
          }}
          className="mx-3 p-2 rounded-full">
          <CheckIcon
            color={
              selectedItems.findIndex(
                selectedItem => selectedItem.item.id === item.id,
              ) !== -1
                ? '#fff'
                : '#000'
            }
          />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default React.memo(CartCard);

const styles = StyleSheet.create({
  Button: {
    padding: 11,
    paddingLeft: 17,
    paddingRight: 17,
  },
  border: {
    borderWidth: 0.8,
    borderColor: '#ffffff',
    width: '70%',
  },
});
