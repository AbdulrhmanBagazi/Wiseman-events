import { StyleSheet, I18nManager } from 'react-native'
import { width, height } from '../../../../Config/Layout'
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
  PrimaryBorder,
  LightBorder,
} from '../../../../Config/ColorPalette'

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  TitleImage: {
    height: 190,
    width: width + 20,
  },
  DataContainer: {
    width: width + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BodyData: {
    flex: 1,
    width,
  },
  AllSingleJobTitleView: {
    position: 'absolute',
    resizeMode: 'cover',
    width: width + 20,
    height: '100%',
  },
  AllSingleJobLayer: {
    backgroundColor: 'rgba(70, 14, 28, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
    position: 'absolute',
  },
  SingleTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  SingleJobDetailsTime: {
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
    color: LightText,
  },
  SingleJobDetailsTitle: {
    fontWeight: '500',
    fontSize: 24,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  SingleJobDetailsLocation: {
    fontWeight: '500',
    fontSize: 14,
    marginHorizontal: 10,
    color: LightText,
  },
  SingleJobDetailsLocationView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  SingleJobDetailsDataView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginVertical: 17,
  },
  DataSections: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  SingleJobDetailsSections: {
    fontWeight: '600',
    fontSize: 14,
    color: LightText,
  },
  SingleJobDetailsSectionsValue: {
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 6,
  },
  Hour: {
    color: LightText,
  },
  Desctiption: {
    width,
    borderWidth: 1,
    borderColor: '#DFE0E3',
    borderRadius: 5,
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
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  SelectText: {
    fontSize: 16,
    fontWeight: '600',
  },
  SelectButtonFirst: {
    marginVertical: 11,
    marginHorizontal: 16,
    padding: 5,
  },
  SelectButton: {
    marginVertical: 11,
    marginHorizontal: 24,
    padding: 5,
  },
  SelectView: {
    flexDirection: 'row',
  },
  TitleSelect: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  TextSelectView: {
    width: width - 40,
    alignSelf: 'center',
    marginVertical: 10,
  },
  TextSelect: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
    textAlign: 'left',
  },
  Rules: {
    backgroundColor: '#F8F8F9',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  PointsView: {
    width: width - 20,
    alignSelf: 'center',
    backgroundColor: '#F8F8F9',
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  Pager: {
    width,
    alignItems: 'flex-start',
  },
  TextPointsView: {
    flexDirection: 'row',
    marginVertical: 8,
    width: '95%',
    alignSelf: 'center',
  },
  TextSelectPoint: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
    textAlign: 'left',
  },
})

export default styles