import '@walletconnect/react-native-compat';
import {WagmiProvider} from 'wagmi';
import {mainnet, polygon, arbitrum} from '@wagmi/core/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from '@reown/appkit-wagmi-react-native';

const queryClient = new QueryClient();

const projectId = '2cadec1c8f231f25285888c13d4bbda0';

// 2. Create config
const metadata = {
  name: 'Sneakers',
  description: 'Connect your wallet to Sneakers',
  url: 'https://sneakers.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'sneakers://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
});

export default function WalletConnect() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
