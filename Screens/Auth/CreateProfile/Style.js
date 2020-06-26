import { StyleSheet, I18nManager } from 'react-native'
import { width, height } from '../../../Config/Layout'
import { PrimaryColor, SecondaryText } from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Scroll: {
    backgroundColor: '#fff',
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
  Title: {
    fontSize: 32,
    marginVertical: 10,
  },
  error: {
    textAlign: 'center',
    color: '#E8505B',
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 10,
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
  input: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputDate: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputNat: {
    backgroundColor: '#fff',
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignItems: 'flex-start',
  },
  inputDateText: {
    color: '#C7C7CD',
  },
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width,
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
  ModalButton: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width: width - 100,
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
  },
  Gender: {
    flexDirection: 'row',
    width,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  TouchableOpacity: {
    height: 50,
    width: 68,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  TouchableOpacityFirst: {
    height: 50,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  CitiesView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  CitiesModalView: {
    flex: 1,
  },
})

export default styles
