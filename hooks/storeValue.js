import * as SecureStore from 'expo-secure-store';

async function storeValue(key, value) {
  await SecureStore.setItemAsync(key, value)
}
export default storeValue