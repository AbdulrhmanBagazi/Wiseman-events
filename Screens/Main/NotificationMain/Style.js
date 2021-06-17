import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';
import { PrimaryColor } from '../../../Config/ColorPalette';

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
  bodyTextTime: {
    fontWeight: '500',
    color: '#868991',
    textAlign: 'left',
    marginTop: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  Decline: {
    padding: 5,
    backgroundColor: '#d16767',
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Contact: {
    padding: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  ShowMoreButton: {
    backgroundColor: PrimaryColor,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 10,
  },
  ShowMoreButtonText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  Flexone: { flex: 1 },
  paddingContent: { paddingBottom: 20, paddingTop: 0 },
  MarginLoading: { marginVertical: 10 },
});

export default styles;
