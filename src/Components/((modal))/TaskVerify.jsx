import React, {forwardRef, useMemo, useCallback, useRef} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {theme} from '../../constants/theme';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {wp} from '../../constants/Dimensions';

const TaskVerifyModal = ({ref, selectedTask, text, setText, handleVerify}) => {
  const snapPoints = useMemo(() => ['30%'], []);

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

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <BottomSheet
      ref={ref}
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
              ref.current?.close();
              Keyboard.dismiss();
            }}
            style={styles.touchable}>
            <XMarkIcon color={'#000'} size={wp(6)} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {selectedTask?.completed ? 'Verify Task' : 'Complete Task'}
          </Text>
          <Image
            source={require('../../../assets/chat.png')}
            style={{width: 50, height: 50}}
          />
        </View>
        <TextInput
          placeholder={'Enter Link to verify'}
          value={text}
          onChangeText={e => setText(e)}
          activeOutlineColor="#000"
          style={styles.input}
          placeholderTextColor={'#00000044'}
        />
        <TouchableOpacity onPress={handleVerify} style={styles.touchableVerify}>
          <Text style={styles.bot}>Verify</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default TaskVerifyModal;

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
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
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: theme.primery,
  },
  bot: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '600',
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
