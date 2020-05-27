import { AsyncStorage } from 'react-native'

const LanguageStore = async (Language) => {
  await AsyncStorage.setItem('@Wiseman-events:Language', Language)
  return
}

const LanguageGet = async () => {
  var Language = await AsyncStorage.getItem('@Wiseman-events:Language')
  return Language
}

const UserTokenStore = async (Token) => {
  await AsyncStorage.setItem('@Wiseman-events:Token', Token)
  return
}

const UserTokenGet = async () => {
  var UserToken = await AsyncStorage.getItem('@Wiseman-events:Token')
  return UserToken
}

const UserTokenRemove = async () => {
  await AsyncStorage.removeItem('@Wiseman-events:Token')
  return
}

export { LanguageStore, LanguageGet, UserTokenStore, UserTokenGet, UserTokenRemove }
