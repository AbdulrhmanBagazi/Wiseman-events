import { StyleSheet } from 'react-native'
import { width, height } from '../../../Config/Layout'
import { PrimaryColor, SecondaryText, GrayColor, LightText } from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  Container: {
    width: width + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonsView: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  TouchableOpacityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderBottomWidth: 1.5,
  },
  TouchableOpacityText: {
    fontSize: 16,
    fontWeight: '600',
  }, //
  SingleJob: {
    backgroundColor: '#fff',
    width,
    flex: 1,
    width: width - 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: 5,
  },
  SingleJobTitleView: {
    // backgroundColor: 'rgba(175, 0, 41, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
  },
  SingleJobLayer: {
    backgroundColor: 'rgba(70, 14, 28, 0.5)',
    width: '100%',
    height: 103,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  SingleTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  SingleJobDetails: {
    // backgroundColor: '#fff',
    flex: 1,
    padding: 5,
    alignItems: 'flex-start',
  },
  SingleJobDetailsTime: {
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
    color: LightText,
  },
  SingleJobDetailsTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 10,
  },
  SingleJobDetailsLocation: {
    fontWeight: '500',
    fontSize: 14,
    marginHorizontal: 10,
    color: LightText,
  },
  SingleJobDetailsLocationView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'flex-start',
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
  SingleJobDetailsDataView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  DataSections: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  DataSectionsTime: {
    flex: 2,
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  DataSectionsAta: {
    flex: 2,
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  space: {
    height: 20,
    width,
  }, //
  AllJobCard: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  SingleAllJob: {
    backgroundColor: '#fff',
    width,
    flex: 1,
    width,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  AllJobsContainer: {
    width: width + 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AllSingleJobTitleView: {
    // backgroundColor: 'rgba(175, 0, 41, 0.4)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  AllSingleJobLayer: {
    backgroundColor: 'rgba(70, 14, 28, 0.5)',
    width: '100%',
    height: 103,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'absolute',
  },
  AllSSingleJobDetails: {
    // backgroundColor: '#fff',
    flex: 1,
    padding: 5,
    alignItems: 'flex-start',
  },
  AllJobFlatlist: {
    width: width + 10,
    flex: 1,
  },
  Hour: {
    color: LightText,
  },
  StatusView: {
    width,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  StatusBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: '#FFF4F5',
    marginHorizontal: 12,
    marginVertical: 20,
    width: 115,
    borderWidth: 1,
    // borderColor: '#E8505B',
    borderRadius: 5,
  },
  StatuText: {
    fontSize: 14,
    fontWeight: '500',
    // color: '#fff',
  },
  Logo: {
    width,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: -99,
  },
  tinyLogo: {
    height: height / 6,
    resizeMode: 'contain',
  },
  ActivejobView: {
    // backgroundColor: '#F1FFF9',
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  ActivejobHeader: {
    width: width - 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  ImageActive: {
    backgroundColor: '#11865B',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    backgroundColor: PrimaryColor,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceActive: {
    marginHorizontal: 5,
  },
  ActivejobHeaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ActivejobHeaderTextLight: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
  },
  ActivejobBody: {
    width: width - 10,
    padding: 5,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  SplitBodyHOne: {
    flex: 3,
  },
  SplitBodyH: {
    flex: 1,
  },
  ActivejobBodyText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
  },
  ActivejobBodyTextLight: {
    fontSize: 14,
    fontWeight: '500',
    color: SecondaryText,
  },
  SingleJobDetailsLocationView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  SingleJobDetailsLocation: {
    fontWeight: '500',
    fontSize: 14,
    marginHorizontal: 10,
    color: LightText,
  },
  ActivejobBoxContainer: {
    width: width - 10,
    borderColor: '#DFE0E3',
    // borderColor: '#11865B',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    alignSelf: 'center',
  },
  ActivejobBox: {
    backgroundColor: GrayColor,
    // backgroundColor: '#F1FFF9',
  },
  ActivejobBoxTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  ActivejobBoxBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 25,
  },
  dataTextActive: {
    marginTop: 10,
  },
  GrayColorText: {
    color: SecondaryText,
  },
  Activejobsplit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    backgroundColor: 'transparent',
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ActiveSoon: {
    width: width - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PrimaryColor,
    borderBottomWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  ActiveSoonText: {
    fontWeight: '500',
    fontSize: 14,
    color: PrimaryColor,
  },
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})

export default styles
