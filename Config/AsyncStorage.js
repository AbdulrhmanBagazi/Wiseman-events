import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageStore = async (Language) => {
  await AsyncStorage.setItem('@Wiseman-events:Language', Language);
  return;
};

const LanguageGet = async () => {
  var Language = await AsyncStorage.getItem('@Wiseman-events:Language');
  return Language;
};

const UserTokenStore = async (Token) => {
  await AsyncStorage.setItem('@Wiseman-events:Token', Token);
  return;
};

const UserTokenGet = async () => {
  var UserToken = await AsyncStorage.getItem('@Wiseman-events:Token');
  return UserToken;
};

const UserTokenRemove = async () => {
  await AsyncStorage.removeItem('@Wiseman-events:Token');
  return;
};

const UserPhoneOTP = async (phone) => {
  await AsyncStorage.setItem('@Wiseman-events:OTP', phone);
  return;
};
const UserPhoneOTPGet = async () => {
  var value = await AsyncStorage.getItem('@Wiseman-events:OTP');
  return value;
};

const QrStore = async (QR) => {
  await AsyncStorage.setItem('@Wiseman-events:Qr', QR);
  return;
};

const QrGet = async () => {
  var QR = await AsyncStorage.getItem('@Wiseman-events:Qr');
  return QR;
};

const setFilesystemresettime = async (time) => {
  await AsyncStorage.setItem('@Wiseman-events:eventimagesresetTime', time);
  return;
};

const getFilesystemresettime = async () => {
  var time = await AsyncStorage.getItem('@Wiseman-events:eventimagesresetTime');
  return time;
};

export {
  LanguageStore,
  LanguageGet,
  UserTokenStore,
  UserTokenGet,
  UserTokenRemove,
  UserPhoneOTP,
  UserPhoneOTPGet,
  QrStore,
  QrGet,
  setFilesystemresettime,
  getFilesystemresettime,
};
