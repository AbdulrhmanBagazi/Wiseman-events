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
    fontWeight: '500',
    color: '#0E1118',
    marginVertical: 10,
  },
  bodyText: {
    fontWeight: '500',
    color: '#868991',
    textAlign: 'left',
  },
  TimeText: {
    fontWeight: '500',
    color: '#868991',
  },
  AcceptPromotion: {
    flexDirection: 'row',
    flex: 1,
  },
  SpaceView: {
    flex: 1,
  },
  SpaceViewBody: {
    flexDirection: 'row',
    flex: 3,
  },
  Accept: {
    padding: 5,
    backgroundColor: '#45a164',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  Decline: {
    padding: 5,
    backgroundColor: '#d16767',
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  AcceptDeclinetext: {
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  Atext: {
    fontWeight: '600',
    color: '#45a164',
    textAlign: 'center',
  },
  Dtext: {
    fontWeight: '600',
    color: '#d16767',
    textAlign: 'center',
  },
})

export default styles
