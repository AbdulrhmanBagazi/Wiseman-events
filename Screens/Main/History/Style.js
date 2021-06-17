import { StyleSheet } from 'react-native';
import { width, height } from '../../../Config/Layout';
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
} from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  ButtonsView: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
    top: 0,
  },
  TouchableOpacityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderBottomWidth: 1.5,
  },
  TouchableOpacityText: {
    fontSize: 13,
    fontWeight: '600',
  }, //
  SingleJob: {
    backgroundColor: '#fff',
    width,
    flex: 1,
    // width: width - 30,
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
    marginVertical: 8,
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
    flexWrap: 'wrap',
  },
  DataSections: {
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  DataSectionsTime: {
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  DataSectionsAta: {
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  space: {
    height: 20,
    width,
  }, //

  SingleAllJob: {
    backgroundColor: '#fff',
    width,
    flex: 1,
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
  AllJobCard: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    width: width + 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllJobFlatlist: {
    width: width + 10,
    flex: 1,
  },
  Hour: {
    color: LightText,
  },
  StatusView: {
    // width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  StatusBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: '#FFF4F5',
    marginHorizontal: 5,
    marginVertical: 20,
    flex: 1,
    borderWidth: 1,
    // borderColor: '#E8505B',
    borderRadius: 5,
  },
  StatusBoxWithdraw: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: '#FFF4F5',
    marginHorizontal: 5,
    marginVertical: 20,
    flex: 1,
    borderWidth: 1,
    // borderColor: '#E8505B',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  StatusBoxWithdrawBorderColor: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: '#FFF4F5',
    marginHorizontal: 5,
    marginVertical: 20,
    flex: 1,
    borderWidth: 1,
    // borderColor: '#E8505B',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#e55353',
    borderColor: '#e55353',
  },
  StatuText: {
    fontSize: 14,
    fontWeight: '500',
    // color: '#fff',
  },
  StatuTextWhite: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
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
    backgroundColor: PrimaryColor,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    opacity: 0.75,
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
  //CompleteDetails
  CompleteDetailsView: {
    flex: 1,
  },
  CompleteDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  CompleteDetailsHeaderHour: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  CompleteDetailsHeaderView: {
    flex: 2,
    alignItems: 'flex-start',
  },
  CompleteDetailsHeaderViewSalary: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'flex-start',
  },
  CompleteDetailsHeaderViewText: {
    color: '#A7AAB2',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 9,
  },
  CompleteDetailsHeaderViewTextValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  CompleteDetailsbodyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  CompleteDetailsbodyContainer: {
    marginHorizontal: 16,
    borderRadius: 5,
    borderColor: '#E4E8F1',
    borderWidth: 1,
  },
  CompleteDetailsbodyContainerData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 15,
  },
  msg: {
    marginHorizontal: 12,
    marginVertical: 13,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    color: LightText,
  },
  CompleteDetailsbodyContainerDataText: {
    color: '#A7AAB2',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'left',
  },
  CompleteDetailsbodyContainerDataTextValue: {
    fontWeight: '600',
    fontSize: 12,
  },
  CompleteDetailStatusBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  CompleteDetailTextnodate: {
    fontWeight: '600',
    fontSize: 12,
    color: PrimaryColor,
  },
  TypeBadge: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  badgeO: {
    backgroundColor: GrayColor,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  badgeS: {
    backgroundColor: PrimaryColor,
    padding: 5,
    borderRadius: 5,
  },
  BadgeText: {
    fontWeight: '600',
    fontSize: 11,
    color: LightText,
  },
  BadgeTextS: {
    fontWeight: '600',
    fontSize: 11,
    color: '#fff',
  },
  NoDateSetText: {
    color: PrimaryColor,
    fontWeight: '600',
    fontSize: 11,
  },
  work: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  calendarButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  calendarButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
  },
  InfoHover: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: PrimaryColor,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  InfoHoverText: {
    fontWeight: '600',
    fontSize: 24,
    color: '#fff',
  },
  InfoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 5,
    padding: 5,
    width: width - 20,
    backgroundColor: '#22bb33',
  },
  InfoBoxText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  FlexOne: { flex: 1 },
  WorkSchedule: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  PaddingTopBottom: { paddingBottom: 30, paddingTop: 0 },
  ViewRowCenter: { flexDirection: 'row', alignItems: 'center' },
  AbsoluteView: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 20 / 2,
    width: 20,
    height: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 25,
    bottom: 5,
  },
  BlackText: { color: '#000' },
  ViewAlignSelf: { flex: 1, alignSelf: 'center' },
  FlexEnd: { flex: 1, alignItems: 'flex-end' },
  FlexTwo: { flex: 2 },
  FlexMargin: { flex: 1, marginTop: 50 },
});

export default styles;
