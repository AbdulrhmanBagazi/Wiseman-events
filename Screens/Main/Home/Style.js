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
  Container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  TopCard: {
    width,
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  TopCardLayer: {
    backgroundColor: 'rgba(175, 0, 41, 0.4)',
    width: '100%',
    height: '100%',
  },
  TopCardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 42,
    marginVertical: 15,
    marginHorizontal: 18,
  },
  TopCardTime: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 18,
  },
  TopCardImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  JobCard: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  Section: {
    width,
    marginTop: 30,
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
  SectionTtitle: {},
  SectionMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //
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
    marginHorizontal: 4,
    marginVertical: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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
    flex: 1,
    marginHorizontal: 15,
  },
})

export default styles
