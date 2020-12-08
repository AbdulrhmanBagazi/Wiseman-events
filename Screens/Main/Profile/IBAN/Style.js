import { StyleSheet, I18nManager } from 'react-native'
import { width, height } from '../../../../Config/Layout'
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
  PrimaryBorder,
} from '../../../../Config/ColorPalette'

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width,
    alignSelf: 'center',
  },
  Button: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width: width - 20,
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
    alignSelf: 'center',
  },
  ButtonAdd: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width: width - 20,
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
    marginTop: 30,
    alignSelf: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  Title: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 40,
    marginHorizontal: 16,
  },
  TitleTwo: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  Cancel: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
    color: '#E8505B',
  },
  TitleAdd: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  About: {
    fontSize: 14,
    fontWeight: '500',
    color: '#868991',
    marginTop: 10,
    marginBottom: 40,
    marginHorizontal: 16,
    textAlign: 'left',
  },
  input: {
    // height: 45,
    textAlign: I18nManager.isRTL ? 'left' : 'left',
    flex: 4,
  },
  inputName: {
    // height: 45,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    flex: 4,
  },
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F9',
    width: width + 10,
    padding: 10,
    marginTop: 10,
  },
  ViewText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#868991',
    marginVertical: 10,
  },
  LevelNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E8505B',
  },
  LevelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#868991',
    marginVertical: 5,

    marginHorizontal: 16,
  },
  AddButton: {
    padding: 10,
    marginVertical: 30,
  },
  AddButtonText: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: '600',
  },
  CheckMatch: {
    width,
    justifyContent: 'flex-start',
    marginBottom: 15,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
})

export default styles
