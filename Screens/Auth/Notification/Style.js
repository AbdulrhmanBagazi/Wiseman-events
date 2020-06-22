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
  NotButton: {
    backgroundColor: SecondaryColor,
    flexDirection: 'row',
    width: 165,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: SecondaryColor,
    marginBottom: 12,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width: 165,
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
  },
  NotButtonText: {
    color: PrimaryColor,
    fontWeight: 'bold',
    fontSize: 16,
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
    justifyContent: 'flex-end',
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
  ButtonView: {
    flexDirection: 'row',
    width,
    justifyContent: 'space-around',
    marginTop: 60,
  },
  StartedButton: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    marginTop: 60,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
})

export default styles
