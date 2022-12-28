import * as SecureStore from 'expo-secure-store';
async function deleteValue(key) {
  await SecureStore.deleteItemAsync(key);

}
export default deleteValue;