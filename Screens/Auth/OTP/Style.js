import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';
import { PrimaryColor, LightText } from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Title: {
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
  error: {
    textAlign: 'center',
    color: '#E8505B',
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 10,
  },
  Button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width,
    marginBottom: 12,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  ButtonText: {
    color: PrimaryColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  underlineStyleBase: {
    borderBottomWidth: 1,
    borderWidth: 0,
    color: PrimaryColor,
  },
  underlineStyleHighLighted: {
    borderColor: PrimaryColor,
  },
  Scroll: {
    flex: 1,
  },
  inputView: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: '#AF0029',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: { width, height: 45, textAlign: 'center' },
  ltrView: { direction: 'ltr' },
  digittyle: { backgroundColor: 'transparent' },
  digittext: { color: '#AF0029' },
  flexContainer: {
    flex: 1,
  },
});

export default styles;
