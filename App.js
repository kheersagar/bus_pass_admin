import { Provider } from 'react-redux';
import NavigationProvider from './NavigationProvider';
import store from './store/Index';
import {  AlertNotificationRoot } from 'react-native-alert-notification';
export default function App() {
  return (
    <Provider store={store}>
    <AlertNotificationRoot>
      <NavigationProvider />
    </AlertNotificationRoot>
    </Provider>
  );
}
