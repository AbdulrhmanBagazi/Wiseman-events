import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';
import { PrimaryColor, LightText } from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  TopCard: {
    // height: 200,
    flex: 1,
    // marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  TopCardLayer: {
    backgroundColor: 'rgba(175, 0, 41, 0.4)',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  TopCardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 42,
    marginTop: 20,
    marginHorizontal: 18,
    textAlign: 'left',
  },
  TopCardTitleStatus: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 42,
    marginHorizontal: 18,
    textAlign: 'left',
  },
  TopCardTime: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 18,
    // position: 'absolute',
    // bottom: 10,
  },
  TopCardImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    position: 'absolute',
  },
  JobCard: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  MainjobsView: {
    width: width + 20,
  },
  Section: {
    width,
    // marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SectionTitle: {
    fontSize: 24,
  },
  NumberOfJobs: {
    fontSize: 14,
    color: LightText,
    marginVertical: 5,
  },
  JobsMore: {
    fontSize: 14,
    color: PrimaryColor,
  },
  SectionTtitle: {
    alignItems: 'flex-start',
  },
  SectionMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SectionMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  //
  SingleJob: {
    backgroundColor: '#fff',
    width: width - 5,
    flex: 1,
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
    // flex: 1,
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  space: {
    height: 20,
    width,
  },
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
  Loading: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  error: {
    textAlign: 'center',
    color: '#E8505B',
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 15,
  },
  soon: {
    textAlign: 'center',
    color: PrimaryColor,
    fontSize: 16,
    marginHorizontal: 29,
    marginVertical: 15,
  },
  Notify: {
    backgroundColor: PrimaryColor,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  NotifyText: {
    color: '#fff',
    fontSize: 14,
  },
  NotifyTextButton: {
    color: PrimaryColor,
    fontSize: 16,
  },
  NotifyButton: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  StatusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  StatusTextView: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  smallogo: {
    height: width / 10,
    width: width / 10,
    resizeMode: 'contain',
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 99,
  },
  BlackColor: { color: '#000' },
  FlexOne: { flex: 1 },
  LoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 177,
  },
  FlexFour: { flex: 4 },
  alignSelfLoading: { alignSelf: 'center' },
});

export default styles;
