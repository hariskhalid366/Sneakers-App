import React, {useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {theme} from '../../constants/theme';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {wp} from '../../constants/Dimensions';
import {POST} from '../../services/apiServices';
import {useMutation} from '@tanstack/react-query';
import {getItem, imageBuffer} from '../../constants/mmkv';
import Loading from '../Loading';
import showToast from '../Toast';

const BidModal = ({sheetRef, data}) => {
  const snapPoints = useMemo(() => ['30%', '75%'], []);
  const [text, setText] = React.useState('');
  const userData = getItem('user');
  const ProfileImage = imageBuffer(userData?.profile);

  const Bids = [50, 100, 150, 200, 250];

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleBid = useMutation({
    mutationFn: bidData => POST('bid/place-bid', bidData),
    onSuccess: res => {
      if (res?.status) {
        console.log(res);
        sheetRef?.current?.close();
        Keyboard.dismiss();
      } else {
        showToast(res.message);
        sheetRef?.current?.close();
      }
    },
    onError: error => {
      showToast(error?.message || 'Something went wrong');
    },
  });

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const handlePostBid = () => {
    if (!text) {
      showToast('Please enter a bid amount');
      return;
    }
    sheetRef?.current?.close();

    handleBid.mutate({
      productId: data?.product?._id,
      userId: userData?._id,
      username: userData?.username,
      avatar: ProfileImage,
      amount: text,
    });
  };

  // 👇 Keyboard listeners to snap sheet
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      sheetRef?.current?.snapToIndex(1); // Snap to 75%
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      sheetRef?.current?.snapToIndex(-1); // Snap to 30%
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [sheetRef]);

  return (
    <>
      {handleBid?.isPending && <Loading />}

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{backgroundColor: theme.primery}}
        backdropComponent={renderBackdrop}
        index={-1}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        animationConfigs={animationConfigs}
        backgroundStyle={{backgroundColor: theme.backgroundColor}}
        style={styles.sheetContainer}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                sheetRef?.current?.close();
                Keyboard.dismiss();
              }}
              style={styles.touchable}>
              <XMarkIcon color={'#000'} size={wp(6)} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Place a Bid</Text>
            <View style={{width: wp(10)}} />
          </View>

          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {Bids.map((bid, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setText(bid.toString())}
                style={{
                  borderRadius: 30,
                  padding: 10,
                  borderColor: '#000',
                  borderWidth: StyleSheet.hairlineWidth,
                }}>
                <Text style={styles.messageText}>Bid: ${bid}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder={'Enter your bid amount'}
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholderTextColor={'#00000044'}
            keyboardType="numeric"
          />

          <TouchableOpacity
            onPress={handlePostBid}
            style={styles.touchableVerify}>
            <Text style={styles.bot}>Post Bid</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BidModal;

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
    paddingBottom: 20,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.darkColor,
    padding: 16,
  },
  messageText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '600',
  },
  touchable: {
    padding: 13,
    borderRadius: wp(100),
    backgroundColor: '#fff',
    elevation: 4,
  },
  touchableVerify: {
    borderRadius: 10,
    backgroundColor: theme.primery,
    elevation: 4,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  input: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: theme.primery,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
    height: 50,
    fontSize: wp(3.5),
    fontWeight: '600',
    paddingHorizontal: 10,
  },
});
