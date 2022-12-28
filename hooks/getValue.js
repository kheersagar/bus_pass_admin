import * as SecureStore from 'expo-secure-store';
async function getValue(key) {
   const result =  await SecureStore.getItemAsync(key);
    if(result){
      return (result)
    }else{
       return ("Error")
    }
  
}
export default getValue;