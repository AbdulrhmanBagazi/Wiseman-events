import { StyleSheet } from 'react-native'
import { width, height } from '../../../Config/Layout'
import { PrimaryColor, LightText } from '../../../Config/ColorPalette'

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
})

export default styles
