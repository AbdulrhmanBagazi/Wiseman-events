import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Config/Layout';
import {
  PrimaryColor,
  SecondaryText,
  LightText,
} from '../../../../Config/ColorPalette';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  ContainerMain: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 10,
    textAlign: 'left',
  },
  titleS: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    marginVertical: 10,
    textAlign: 'left',
  },
  titleSmall: {
    fontSize: 11,
    fontWeight: '400',
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign: 'left',
    color: LightText,
  },
  SelectOneOrMore: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginHorizontal: 16,
    color: LightText,
  },
  titleSecond: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  shift: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  TimeandA: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
    marginHorizontal: 15,
    marginVertical: 10,
    textAlign: 'left',
  },
  SelectView: {
    width,
    borderWidth: 1,
    borderColor: '#DFE0E3',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  SelectViewChose: {
    width,
    borderWidth: 1,
    borderColor: '#DFE0E3',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    alignItems: 'flex-start',
  },
  ShiftView: {
    flexDirection: 'row',
  },
  ShiftButton: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 10,
    borderColor: '#cccccc',
    backgroundColor: '#cccccc',
  },
  ShiftButtonSelect: {
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectViewPoints: {
    width,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DFE0E3',
    alignSelf: 'center',
    // alignItems: 'center',
  },
  TextPointsView: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  TextSelect: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
    marginVertical: 8,
    textAlign: 'left',
  },
  ButtonView: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  Button: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 30,
  },
  WarrningView: {
    backgroundColor: '#FFAA00',
    flexDirection: 'row',
    width: width - 10,
    // height: 50,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SuccView: {
    backgroundColor: '#2DB329',
    flexDirection: 'row',
    width: width - 10,
    // height: 50,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  WarrningText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 14,
  },
  MainWarrningView: { flex: 1, alignItems: 'flex-start' },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ButtonTextHome: {
    color: PrimaryColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    width,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  ModalButtonHome: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    // width: width - 100,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  ModalButton: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    // width: width - 100,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: 32,
    textAlign: 'center',
  },
  Slogan: {
    textAlign: 'center',
    color: LightText,
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 10,
  },
  tinyLogo: {
    height: height / 8,
    resizeMode: 'contain',
  },
  LoadingModal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectCircle: {
    width: width / 20,
    height: width / 20,
    borderRadius: width + height / 2,
    marginRight: 10,
    borderColor: PrimaryColor,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectCircleSmall: {
    width: width / 30,
    height: width / 30,
    borderRadius: width + height / 2,
    // borderColor: '#fff',
    // borderWidth: 2,
  },
  BlackText: { color: '#000' },
  AlignSelfScroll: { alignSelf: 'flex-start' },
  FlexRow: { flexDirection: 'row' },
});

export default styles;
