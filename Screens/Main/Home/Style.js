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
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  TopCard: {
    width,
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  TopCardLayer: {
    backgroundColor: 'rgba(175, 0, 41, 0.4)',
    width: '100%',
    height: '100%',
  },
  TopCardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 42,
    marginVertical: 15,
    marginHorizontal: 18,
  },
  TopCardTime: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 18,
  },
  TopCardImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
})

export default styles
