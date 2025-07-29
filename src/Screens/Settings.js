import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {HeaderComp} from '../Components';
import {HeaderBackButton} from '@react-navigation/elements';
import Nfts from '../constants/nftData.json';
import {wp} from '../constants/Dimensions';
import nftImages from '../constants/nftImages';
import {
  NFTDescription,
  NFTMedia,
  NFTName,
  NFTProvider,
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from 'thirdweb/react';
import {
  client,
  contract,
  nftContract,
  tokenContract,
} from '../constants/thirdweb';
import {sepolia} from 'thirdweb/chains';

const Settings = ({navigation}) => {
  // const {data, isLoading} = useReadContract({
  //   contract: contract,
  // });

  const account = useActiveAccount();

  const {data, isLoading, isError} = useWalletBalance({
    chain: sepolia,
    address: account?.address,
    client,
    tokenContract: tokenContract,
  });
  console.log(isLoading, data, isError);

  // console.log(data, isLoading);

  return (
    <>
      <HeaderComp
        title="Mintable NFTs"
        apppend={<View className="w-10" />}
        prepend={<HeaderBackButton onPress={() => navigation.goBack()} />}
      />

      <ScrollView>
        <View style={styles.container}>
          {Nfts.map((nft, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate('NftDetails', {nft})}>
              <Image source={nftImages[nft?.image]} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{nft.name}</Text>
                <Text style={styles.price}>{nft.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    width: wp(33.3),
    backgroundColor: '#FFF',
    borderRadius: 14,
    width: wp(44),
    elevation: 2,
  },
  image: {
    width: wp(33.3),
    height: wp(50.3),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
