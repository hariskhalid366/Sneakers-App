import {createThirdwebClient, getContract} from 'thirdweb';
import {base, baseSepolia, sepolia} from 'thirdweb/chains';

const clientId = 'dd0b45a9c9ad9e7edb0ffde2c77ecb4f';

export const secretKey =
  '_j8XKc9IHd7WD0Q7E6OFWVlMH5trmo0GzNmjOYCy7OGpDO_5_l5mddTGpm2z4BqU1RgRuTS9Z1s_LNcFOGIvRQ';
export const vaultAdminKey =
  'sa_adm_OL35_QI2T_4XIN_NGSM_I6M2_OSOG_2eed970a-6753-4282-83d5-bfd085244243';

export const vaultAdminToken =
  'vt_act_FO76STNCU7YLCYLGFAKXSWHHFO6YOUOKEAH4DOCS4MCFVSS4QLCVOMXYQSE5WQA2WDHTVLIXDF7YUABO5WLQUZ2TIKBIHVN72CCSIQSD';

if (!clientId) {
  throw new Error(
    'Missing EXPO_PUBLIC_THIRDWEB_CLIENT_ID - make sure to set it in your .env file',
  );
}

export const nftContract = '0x35a95368b79Df3D42A77C9E0eB963Fa5e37113d8';
export const accountFactory = '0xf60e19045da1133e804556f6b9c532d49da8e1bc';
export const tokenContract = '0xDa2252B4Cf3c1dD8a490d253849bB5E00Cce00D5';

export const client = createThirdwebClient({
  clientId,
  secretKey,
});

export const chain = base;

export const contract = getContract({
  client,
  address: nftContract,
  chain: sepolia,
});

export const usdcContract = getContract({
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chain: base,
  client,
});
