import { StyleSheet, I18nManager } from 'react-native'
import { width, height } from '../../../Config/Layout'
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
  PrimaryBorder,
} from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  KeyboardAvoidingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    height: height / 4,
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
    marginVertical: 15,
  },
  inputPhone: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    height: 45,
  },
  input: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: PrimaryBorder,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputPassword: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
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
  ForgotContainer: {
    width,
    alignItems: 'flex-end',
    marginTop: 10,
  },
  ForgotText: {
    color: SecondaryText,
  },
  Register: {
    flexDirection: 'row',
    marginTop: 30,
  },
  Member: {
    color: SecondaryText,
  },
  RegisterText: {
    color: PrimaryColor,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  Terms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  and: {
    color: SecondaryText,
  },
  Scroll: {
    flex: 1,
  },
})

export default styles
