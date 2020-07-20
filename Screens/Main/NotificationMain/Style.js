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
  NotificationBoxFirst: {
    width: width + 20,
    backgroundColor: '#F8F8F9',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E4E9F1',
  },
  NotificationBox: {
    width: width + 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 10,
  },
  IconView: {
    alignItems: 'center',
    marginVertical: 10,
    flex: 0.15,
  },
  CenterView: {
    flex: 1,
    marginHorizontal: 15,
  },
  TimeView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  BodyTextView: {
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0E1118',
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#868991',
  },
  TimeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#868991',
  },
})

export default styles
