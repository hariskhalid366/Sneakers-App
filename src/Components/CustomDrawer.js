import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {wp} from '../constants/Dimensions';
import {ArrowLeftOnRectangleIcon} from 'react-native-heroicons/outline';
import {AuthContext} from '../Navigation/Route';
import {getItem, imageBuffer} from '../constants/mmkv';
import {theme} from '../constants/theme';

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useDisconnect,
} from 'thirdweb/react';
import {shortenAddress} from 'thirdweb/utils';
import {createWallet} from 'thirdweb/wallets';
import {client} from '../constants/thirdweb';

const CustomDrawer = props => {
  const {signOut} = useContext(AuthContext);
  const data = getItem('user');
  const imageData = imageBuffer(data?.profile);

  // ✅ Thirdweb hooks and states
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const {disconnect} = useDisconnect();
  const {connect, isConnecting} = useConnect();
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (account) {
      setWalletAddress(shortenAddress(account?.address));
    }
  }, [account]);

  // // ✅ Connect with MetaMask handler
  // const connectWithMetaMask = async () => {
  //   connect(async () => {
  //     const w =createWallet("app.phantom")
  //     await w.connect({client});
  //     return w;
  //   });
  // };

  const wallets = [
    createWallet('app.phantom'),
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('me.rainbow'),
    createWallet('io.rabby'),
    createWallet('io.zerion.wallet'),
  ];

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      {...props}>
      <View style={[styles.headerContent]}>
        <View style={styles.ImagContainer}>
          <Image
            style={styles.userImage}
            source={
              data?.profile
                ? {uri: `data:image/jpeg;base64,${imageData}`}
                : require('../../assets/logo.png')
            }
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.userName}>{data?.username}</Text>
          <Text style={styles.userEmail}>{data?.email}</Text>
        </View>

        {/* ✅ Thirdweb wallet connection UI */}
        <View style={{marginTop: 10}}>
          {wallet && account ? (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: wp(3.5), color: '#000'}}>
                Connected: {walletAddress}
              </Text>
              <TouchableOpacity
                onPress={() => disconnect(wallet)}
                style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Disconnect Wallet</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ConnectButton
              client={client}
              connectModal={{size: 'compact'}}
              wallets={wallets}
            />
          )}
        </View>
      </View>

      <View style={styles.divider} />
      <DrawerItemList {...props} />
      <TouchableOpacity
        onPress={() => {
          signOut();
          props.navigation.closeDrawer();
        }}
        style={styles.logoutButton}>
        <ArrowLeftOnRectangleIcon color={'#000'} size={wp(6)} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImagContainer: {
    width: wp(28),
    height: wp(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  userImage: {
    backgroundColor: theme.primeryDark,
    width: wp(24),
    height: wp(24),
    borderRadius: 45,
  },
  userName: {
    fontSize: wp(4.5),
    color: '#000',
  },
  userEmail: {
    fontSize: wp(3),
    color: '#000',
  },
  divider: {
    width: '100%',
    marginTop: 15,
    height: 0.6,
  },
  connectButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: theme.primeryDark,
    borderRadius: 10,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: wp(3.2),
  },
  logoutButton: {
    marginVertical: 5,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#00000008',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#000',
    fontWeight: '500',
    fontSize: wp(3.2),
    textAlignVertical: 'center',
  },
});
