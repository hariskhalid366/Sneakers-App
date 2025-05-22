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
import {ThirdwebProvider} from 'thirdweb/react-native';

const App = gestureHandlerRootHOC(() => {
  return (
    <ThirdwebProvider>
      <ThemeProvider>
        <SafeAreaProvider style={{backgroundColor: '#fff'}}>
          <Provider store={store}>
            <BottomSheetModalProvider>
              <PaperProvider>
                <NotificationProvider>
                  <FavoritesProvider>
                    <CartProvider>
                      <Route />
                    </CartProvider>
                  </FavoritesProvider>
                </NotificationProvider>
              </PaperProvider>
            </BottomSheetModalProvider>
          </Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ThirdwebProvider>
  );
});

export default App;
