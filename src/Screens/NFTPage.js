import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderComp, Loading} from '../Components';
import {hp, wp} from '../constants/Dimensions';
import nftImages from '../constants/nftImages';
import {getContract} from 'thirdweb';
import {client} from '../constants/thirdweb';
import {useActiveAccount, useSendTransaction} from 'thirdweb/react';
import {mintTo} from 'thirdweb/extensions/erc721';
import {theme} from '../constants/theme';
import {sepolia} from 'thirdweb/chains';
import LongButton from '../Components/LongButton';
import showToast from '../Components/Toast';

const NFTPage = ({route, navigation}) => {
  const {nft} = route?.params;
  const [isMinting, setIsMinting] = useState(false);
  const account = useActiveAccount(); // 👈 active wallet object
  const userAddress = account?.address; // 👈 actual address

  // your collection contract
  const nftCollectionContract = getContract({
    client,
    chain: sepolia,
    address: '0x1fF05f9b9Ec890125a068BF7F625EC9c4cd5cCd9',
  });

  const {mutateAsync: sendTransaction} = useSendTransaction();

  const mint = async () => {
    if (!userAddress) {
      showToast('No wallet connected');
      return;
    }
    setIsMinting(true);
    try {
      const tx = mintTo({
        contract: nftCollectionContract,
        to: userAddress,
        nft: {
          name: nft?.name,
          description: nft?.description,
          image: nftImages[nft?.image], // ensure this resolves to a valid URI or file
        },
      });
      await sendTransaction(tx);
      showToast('NFT minted to', userAddress);
    } catch (err) {
      showToast('Minting failed:', err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      {isMinting && <Loading />}
      <HeaderComp
        title={nft?.name || 'NFT Details'}
        apppend={<View style={{width: 40}} />}
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
            onPress={mint}
            disabled={isMinting}
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
