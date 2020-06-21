import { StyleSheet, I18nManager } from 'react-native'
import { width, height } from '../../../Config/Layout'
import {
  BackgroundColor,
  PrimaryColor,
  SecondaryColor,
  PrimaryText,
  SecondaryText,
  GrayColor,
  LightBorder,
  LightText,
} from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Logo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: GrayColor,
    marginVertical: 20,
  },
  Title: {
    fontSize: 32,
    marginBottom: 10,
  },
  TitleCode: {
    fontSize: 32,
    marginTop: 100,
  },
  Slogan: {
    textAlign: 'center',
    color: LightText,
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 20,
  },
  input: {
    backgroundColor: GrayColor,
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
  ResendContainer: {
    width,
    alignItems: 'flex-end',
    marginBottom: 20,
    flexDirection: 'row',
  },
  ResendText: {
    color: PrimaryColor,
    textDecorationLine: 'underline',
  },
  Resendmessage: {
    color: SecondaryText,
  },
})

export default styles
