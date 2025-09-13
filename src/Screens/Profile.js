import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {InputField} from '../Components';
import {
  EnvelopeIcon,
  MapIcon,
  PhoneIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {hp, wp} from '../constants/Dimensions';
import {useQuery} from '@tanstack/react-query';
import {getItem, imageBuffer} from '../constants/mmkv';
import {ScrollView} from 'react-native-gesture-handler';
import showToast from '../Components/Toast';
import {GET} from '../services/apiServices';
import ScrollToRefresh from '../Components/Refresh';
import ProfileMintCard from '../Components/ProfileMintCard';
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from 'thirdweb/react';

import {inAppWallet, createWallet} from 'thirdweb/wallets';
import {client} from '../constants/thirdweb';

import {getContract} from 'thirdweb';
import {sepolia} from 'thirdweb/chains';
import {claimTo} from 'thirdweb/extensions/erc20';

const Profile = () => {
  const [editable, setEditable] = React.useState(false);

  const wallets = [
    inAppWallet({
      auth: {
        options: ['google', 'discord', 'email', 'x', 'telegram', 'passkey'],
      },
    }),
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('io.zerion.wallet'),
    createWallet('com.binance.wallet'),
    createWallet('com.okex.wallet'),
    createWallet('com.bitget.web3'),
    createWallet('com.trustwallet.app'),
    createWallet('me.rainbow'),
    createWallet('io.rabby'),
  ];

  const userData = getItem('user');

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['myCollection', userData?._id],
    queryFn: () => GET(`/api/bid/mine/${userData?._id}`),
    experimental_prefetchInRender: true,
  });

  const account = useActiveAccount();

  if (error) {
    showToast(error?.message || 'Something went wrong');
  }

  const tw_coin = getContract({
    address: '0xACf072b740a23D48ECd302C9052fbeb3813b60a6',
    chain: sepolia,
    client: client,
  });

  const COINS = getItem('tokens') || 0;

  return (
    <ScrollToRefresh onRefresh={refetch}>
      <ScrollView
        className="flex-1 bg-background px-6"
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp(10),
        }}>
        <View style={{position: 'absolute', top: -40, right: 10}}>
          <ConnectButton
            className="p-4 bg-primary elevation-sm rounded-full absolute -top-10 -right-2"
            client={client}
            connectModal={{size: 'wide'}}
            wallets={wallets}
          />
        </View>
        <View
          style={{
            backgroundColor: theme.primery,
            borderRadius: wp(100),
            width: wp(24),
            height: wp(24),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: wp(4),
          }}>
          <Image
            style={{width: 130, height: 130, borderRadius: 200}}
            source={
              data?.profile
                ? {uri: `${imageBuffer(data?.profile)}`}
                : require('../../assets/user.png')
            }
          />
        </View>
        <InputField
          prependChild={
            <UserIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your name'}
          value={userData?.username || ''}
        />
        <InputField
          prependChild={
            <EnvelopeIcon
              color={theme.primeryDark}
              size={'22'}
              strokeWidth={2}
            />
          }
          editable={editable}
          placeholder={'Your Email'}
          value={userData?.email || ''}
        />
        <InputField
          prependChild={
            <PhoneIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your Phone'}
          value={userData?.phonenumber || ''}
          keyboardType={'phone-pad'}
          autoComplete={'tel'}
        />
        <InputField
          prependChild={
            <MapIcon color={theme.primeryDark} size={'22'} strokeWidth={2} />
          }
          editable={editable}
          placeholder={'Your Address'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text className="text-base font-bold text-black">
            Total Token Count
          </Text>
          <Text className="text-base font-bold text-black">{COINS}</Text>
        </View>
        {COINS > 0 && (
          <TransactionButton
            transaction={() =>
              claimTo({
                contract: tw_coin,
                to: account?.address,
                quantity: COINS.toString(),
              })
            }>
            <Text className="text-base font-bold text-black">Claim Tokens</Text>
          </TransactionButton>
        )}

        {/* <LongButton
        title={'Edit Profile'}
        backgroundColor={theme.primery}
        color={'#fff'}
        onPress={() => {}}
      /> */}

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FlatList
              ListHeaderComponent={() => (
                <View className="bg-primary px-3 py-1.5 rounded-xl mt-3">
                  <Text className="font-semibold text-white tracking-wide text-xl align-baseline">
                    My Mints
                  </Text>
                </View>
              )}
              ListEmptyComponent={() => (
                <Text className="text-base text-black self-center top-10">
                  Not Found
                </Text>
              )}
              style={{flexGrow: 1, width: '100%'}}
              scrollEnabled={false}
              legacyImplementation={true}
              contentContainerStyle={{paddingBottom: hp(15)}}
              data={data?.data}
              numColumns={2}
              renderItem={({index, item}) => (
                <ProfileMintCard item={item} key={index} />
              )}
            />
          </>
        )}
      </ScrollView>
    </ScrollToRefresh>
  );
};

export default Profile;
