// import '@walletconnect/react-native-compat';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Route} from './src/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/ReduxStore';
import {CartProvider} from './src/AsyncStorage/cartStorage';
import {FavoritesProvider} from './src/AsyncStorage/FavStorage';
import './global.css';
import {NotificationProvider} from './src/AsyncStorage/Notification';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './src/contexts/ThemeContext';
// import {WagmiProvider} from 'wagmi';
// import {mainnet, polygon, arbitrum} from '@wagmi/core/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {
//   createAppKit,
//   defaultWagmiConfig,
//   AppKit,
// } from '@reown/appkit-wagmi-react-native';

const App = gestureHandlerRootHOC(() => {
  const queryClient = new QueryClient();

  // const projectId = '2cadec1c8f231f25285888c13d4bbda0';

  // const metadata = {
  //   name: 'Skeaks',
  //   description: 'Skeaks : a web3 sneakers marketplace.',
  //   url: 'https://reown.com/appkit',
  //   icons: ['https://avatars.githubusercontent.com/u/179229932'],
  //   redirect: {
  //     native: 'seakers://',
  //     universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  //   },
  // };

  // const chains = [mainnet, polygon, arbitrum] as const;

  // const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

  // createAppKit({
  //   projectId,
  //   wagmiConfig,
  //   defaultChain: mainnet,
  //   enableAnalytics: true,
  // });

  return (
    // <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider style={{backgroundColor: '#fff'}}>
          <Provider store={store}>
            <BottomSheetModalProvider>
              <PaperProvider>
                <NotificationProvider>
                  <FavoritesProvider>
                    <CartProvider>
                      <Route />
                      {/* <AppKit /> */}
                    </CartProvider>
                  </FavoritesProvider>
                </NotificationProvider>
              </PaperProvider>
            </BottomSheetModalProvider>
          </Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </WagmiProvider>
  );
});

export default App;
