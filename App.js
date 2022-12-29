import { Provider } from 'react-redux';
import NavigationProvider from './NavigationProvider';
import store from './store/Index';
import {  AlertNotificationRoot } from 'react-native-alert-notification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
    <AlertNotificationRoot>
      <NavigationProvider />
    </AlertNotificationRoot>
    </Provider>
    </GestureHandlerRootView>
  );
}
