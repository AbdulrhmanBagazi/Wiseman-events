import { StyleSheet, I18nManager } from 'react-native';
import { width, height } from '../../../Config/Layout';
import {
  PrimaryColor,
  SecondaryText,
  LightText,
} from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Logo: {
    width,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    height: height / 6,
    resizeMode: 'contain',
  },
  Title: {
    fontSize: 32,
    marginBottom: 10,
  },
  Slogan: {
    textAlign: 'center',
    color: LightText,
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 10,
  },
  error: {
    textAlign: 'center',
    color: '#E8505B',
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 5,
  },
  input: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    height: 45,
  },
  PasswordInput: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    marginBottom: 10,
  },
  HidePassword: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 10,
    right: 10,
  },
  Button: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    marginBottom: 12,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  Register: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  Member: {
    color: SecondaryText,
  },
  RegisterText: {
    color: PrimaryColor,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  CheckMatch: {
    width,
    justifyContent: 'flex-start',
    marginBottom: 20,
    flexDirection: 'row',
  },
  Terms: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  and: {
    color: SecondaryText,
  },
  closebutton: {
    // backgroundColor: PrimaryColor,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  checkIconView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 2,
    borderRadius: 2,
    borderWidth: 1,
    // borderColor: AgreeColor,
    marginHorizontal: 5,
  },
  warview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    textAlign: 'left',
  },
  removeUnderline: { color: PrimaryColor, textDecorationLine: 'underline' },
  webView: { marginTop: 10 },
});

export default styles;
