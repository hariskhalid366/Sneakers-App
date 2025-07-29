import '@thirdweb-dev/react-native-adapter';
import {ThirdwebProvider} from 'thirdweb/react';
import React from 'react';
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
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Platform} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = gestureHandlerRootHOC(() => {
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider>
      <StripeProvider
        merchantIdentifier="Sneakers.co"
        publishableKey="pk_test_51HcQn5G5eRjmICdVGncOZAlvXqG3dRQElsG5l2SQMfBcHTbaqCd22Yr5Y39hKmhbTK5LzMirlUBCmYjpQKGPJD5200S5RF83Tg">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <BottomSheetModalProvider>
              <PaperProvider>
                <NotificationProvider>
                  <FavoritesProvider>
                    <CartProvider>
                      {Platform.OS !== 'web' && (
                        <BlurView
                          style={{
                            position: 'absolute',
                            zIndex: 2,
                            top: 0,
                            width: '100%',
                            height: 40,
                          }}
                          blurAmount={4}
                          blurRadius={6}
                          blurType="light"
                        />
                      )}
                      <Route />
                    </CartProvider>
                  </FavoritesProvider>
                </NotificationProvider>
              </PaperProvider>
            </BottomSheetModalProvider>
          </Provider>
        </QueryClientProvider>
      </StripeProvider>
    </ThirdwebProvider>
  );
});

export default App;
