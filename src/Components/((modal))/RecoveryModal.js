import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {EnvelopeOpenIcon} from 'react-native-heroicons/outline';
import {theme} from '../../constants/theme';

const RecoveryModal = ({ref}) => {
  const points = React.useMemo(() => ['40%'], []);
  const renderBackdrop = React.useCallback(
    props => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={points}
      backdropComponent={renderBackdrop}
      style={styles.sheetContainer}></BottomSheet>
  );
};

export default RecoveryModal;

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
