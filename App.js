import { Provider } from 'react-redux';
import NavigationProvider from './NavigationProvider';
import store, { persistor } from './store/Index';
import {  AlertNotificationRoot } from 'react-native-alert-notification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
    <PersistGate persistor={persistor}>

    <AlertNotificationRoot>
      <NavigationProvider />
    </AlertNotificationRoot>
    </PersistGate>
    </Provider>
    </GestureHandlerRootView>
  );
}
