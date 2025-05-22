import React from 'react';
import {theme} from '../../constants/theme';
import {
  CurrencyDollarIcon,
  FireIcon,
  LanguageIcon,
} from 'react-native-heroicons/outline';
import {Menu, Divider} from 'react-native-paper';
import {hp, wp} from '../../constants/Dimensions';
import {StyleSheet} from 'react-native';

const ModalMenu = ({visible, setVisible}) => {
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      anchor={{x: wp(96), y: hp(16)}}
      visible={visible}
      elevation={20}
      contentStyle={{
        width: wp(40),
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.primery,
        borderRadius: 20,
      }}
      theme={{colors: {primary: theme.primery}}}
      onDismiss={closeMenu}>
      <Menu.Item
        style={styles.align}
        rippleColor={theme.primery}
        onPress={() => {}}
        titleStyle={styles.text}
        title="Name"
        leadingIcon={({}) => <LanguageIcon color={'green'} size={20} />}
      />
      <Divider />
      <Menu.Item
        style={styles.align}
        rippleColor={theme.primery}
        onPress={() => {}}
        titleStyle={styles.text}
        title="Price"
        leadingIcon={({}) => <CurrencyDollarIcon color={'blue'} size={20} />}
      />
      <Divider />

      <Menu.Item
        style={styles.align}
        rippleColor={theme.primery}
        onPress={() => {}}
        titleStyle={styles.text}
        title="Popular"
        leadingIcon={({}) => <FireIcon color={'red'} size={20} />}
      />
    </Menu>
  );
};

export default ModalMenu;
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.darkColor,
  },
  align: {
    alignItems: 'center',
  },
});
