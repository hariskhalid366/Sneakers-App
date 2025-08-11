import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderComp, Loading} from '../Components';
import {hp, wp} from '../constants/Dimensions';
import nftImages from '../constants/nftImages';
import {getContract} from 'thirdweb';
import {client} from '../constants/thirdweb';
import {useActiveAccount} from 'thirdweb/react';
import LongButton from '../Components/LongButton';
import {theme} from '../constants/theme';
import {sepolia} from 'thirdweb/chains';
import {useSendTransaction} from 'thirdweb/react';
import {lazyMint} from 'thirdweb/extensions/erc721';

const NFTPage = ({route, navigation}) => {
  const [isMinting, setIsMinting] = useState(false); // 👈 prevents repeated minting
  const {nft} = route?.params;
  const address = useActiveAccount();
  const walletAddress = '0xA1363C5Fece59Ec997CbBc0496e91D09fdbB9f80';

  const nftCollectionContract = getContract({
    client,
    chain: sepolia,
    address: '0x1fF05f9b9Ec890125a068BF7F625EC9c4cd5cCd9',
  });
  const {mutateAsync: sendTransaction} = useSendTransaction();

  const lazyMintNFTs = async metadataList => {
    try {
      const transaction = lazyMint({
        contract: nftCollectionContract,
        nfts: metadataList,
      });
      await sendTransaction(transaction);
      console.log('NFTs lazy minted successfully!');
    } catch (error) {
      console.error('Failed to lazy mint NFTs', error);
    }
  };

  const metadata = {
    name: nft?.name,
    description: nft?.description,
    image: nftImages[nft?.image],
  };

  const mint = () => {
    if (walletAddress) {
      mintNFT(metadata, walletAddress);
      console.log(walletAddress);
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
            onPress={() => mint()}
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
