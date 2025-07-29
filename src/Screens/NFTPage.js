import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderComp, Loading} from '../Components';
import {hp, wp} from '../constants/Dimensions';
import nftImages from '../constants/nftImages';
import {defineChain, Engine, getContract} from 'thirdweb';
import {chain, client, secretKey, vaultAdminToken} from '../constants/thirdweb';
import {useActiveAccount} from 'thirdweb/react';
import LongButton from '../Components/LongButton';
import {theme} from '../constants/theme';
import {mintTo} from 'thirdweb/extensions/erc20';

const NFTPage = ({route, navigation}) => {
  const {nft} = route?.params;
  const address = useActiveAccount();

  const [isMinting, setIsMinting] = useState(false); // 👈 prevents repeated minting

  const BACKEND_WALLET_ADDRESS = '0x0F32ea248C58B3dC27bF70fa5d177A0b2caDDC15';
  const chainId = 84532;
  const contractAddress = '0x1fF05f9b9Ec890125a068BF7F625EC9c4cd5cCd9';

  const contract = getContract({
    address: contractAddress,
    chain: defineChain(chainId),
    client: client,
  });

  const mintNft = async () => {
    if (isMinting) return; // 👈 prevent multiple mint calls
    setIsMinting(true);
    try {
      const serverWallet = Engine.serverWallet({
        address: BACKEND_WALLET_ADDRESS,
        client: client,
        vaultAccessToken: vaultAdminToken,
      });

      const {transactionId} = await serverWallet.enqueueTransaction({
        transaction: mintTo({
          contract,
          params: [
            address?.address,
            {
              name: nft?.name,
              description: nft?.description,
              image: nftImages[nft?.image], // Make sure this is a valid image URI
            },
          ],
        }),
      });

      console.log('Transaction Enqueued:', transactionId);

      const result = await Engine.waitForTransactionHash({
        client: client,
        transactionId,
      });

      console.log('Transaction Result:', result);
      Alert.alert('Success', 'NFT Minted Successfully!');
    } catch (error) {
      console.error('Minting Failed:', error);
      Alert.alert('Error', 'Failed to mint NFT');
    } finally {
      setIsMinting(false); // 👈 allow next mint
    }
  };

  return (
    <>
      {isMinting && <Loading />}
      <HeaderComp
        title={nft?.name || 'NFT Details'}
        apppend={<View className="w-10" />}
        prepend={<HeaderBackButton onPress={() => navigation.goBack()} />}
      />
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={nftImages[nft.image]}
            style={{
              width: wp(90),
              height: hp(50),
              borderRadius: 10,
              marginBottom: 20,
              resizeMode: 'contain',
            }}
          />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', gap: 20}}>
              <Text style={styles.title}>{nft?.name}</Text>
              <Text style={styles.title}>{nft?.symbol}</Text>
            </View>
            <Text style={styles.description}>{nft?.description}</Text>
            <Text style={styles.price}>Price: {nft?.price}</Text>
          </View>
          <LongButton
            backgroundColor={theme.primery}
            title={isMinting ? 'Minting...' : 'Mint NFT'}
            onPress={mintNft}
            disabled={isMinting} // 👈 disables button while minting
          />
        </ScrollView>
      </View>
    </>
  );
};

export default NFTPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
