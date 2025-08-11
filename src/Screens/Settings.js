import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {HeaderComp} from '../Components';
import {HeaderBackButton} from '@react-navigation/elements';
import Nfts from '../constants/nftData.json';
import {wp} from '../constants/Dimensions';
import nftImages from '../constants/nftImages';
import {getContract} from 'thirdweb';
import {sepolia} from 'thirdweb/chains';
import {claimTo} from 'thirdweb/extensions/erc721';
import {useActiveAccount, useSendTransaction} from 'thirdweb/react';
import LongButton from '../Components/LongButton';
import {client} from '../constants/thirdweb';
import {theme} from '../constants/theme';

const Settings = ({navigation}) => {
  const address = useActiveAccount();

  const nftDropContract = getContract({
    client: client,
    chain: sepolia,
    address: '0x35a95368b79Df3D42A77C9E0eB963Fa5e37113d8',
  });

  const {mutateAsync: sendTransaction} = useSendTransaction();

  const claimNFT = async recipientAddress => {
    try {
      const transaction = claimTo({
        contract: nftDropContract,
        to: recipientAddress,
        quantity: BigInt(1),
      });
      await sendTransaction(transaction);
      console.log('NFT claimed successfully!');
    } catch (error) {
      console.log(error);

      Alert.alert('Transaction Error', 'GO gas fees available');
    }
  };

  return (
    <>
      <HeaderComp
        title="Mintable NFTs"
        apppend={<View className="w-10" />}
        prepend={<HeaderBackButton onPress={() => navigation.goBack()} />}
      />
      <ScrollView>
        <View style={{width: wp(90), alignSelf: 'center'}}>
          <LongButton
            title={'Claim random nft'}
            backgroundColor={theme.primery}
            onPress={() => claimNFT(address?.address)}
          />
        </View>
        <View style={styles.container}>
          {Nfts.map((nft, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate('NftDetails', {nft})}>
              <Image source={nftImages[nft?.image]} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{nft?.name}</Text>
                <Text style={styles.price}>{nft?.price}</Text>
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
