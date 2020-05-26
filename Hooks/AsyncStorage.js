import { AsyncStorage } from 'react-native'

export default LanguageAsyncStorage = async (Language) => {
  await AsyncStorage.setItem('@Wiseman-events:Language', Language)
}
