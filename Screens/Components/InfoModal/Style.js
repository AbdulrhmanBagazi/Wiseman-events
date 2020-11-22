import { StyleSheet } from 'react-native'
import { SecondaryColor, LightText, PrimaryColor, GrayColor } from '../../../Config/ColorPalette'
import { width } from '../../../Config/Layout'

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    backgroundColor: '#fff',
    width: width - 10,
    borderRadius: 6,
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SecondaryColor,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 10,
  },
  HeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: LightText,
  },
  BodyText: {
    fontSize: 16,
    fontWeight: '500',
    color: LightText,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
  },
  Button: {
    backgroundColor: PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderRadius: 6,
    padding: 10,
    marginHorizontal: 20,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  BodyTextDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GrayColor,
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  BodyTextDateTop: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GrayColor,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  BodyTextTime: {
    fontSize: 16,
    fontWeight: '600',
    color: LightText,
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  BodyTextTimeEnd: {
    fontSize: 16,
    fontWeight: '600',
    color: LightText,
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  InfoContainer: {
    // width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Info: {
    flexDirection: 'row',
    // backgroundColor: SecondaryColor,
    // width,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 6,
  },
  InfoOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: LightText,
    marginVertical: 20,
  },
  InfoSelect: {
    backgroundColor: SecondaryColor,
    width,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoTime: {
    fontSize: 14,
    fontWeight: '500',
    color: PrimaryColor,
    marginBottom: 20,
  },
})

export default styles
