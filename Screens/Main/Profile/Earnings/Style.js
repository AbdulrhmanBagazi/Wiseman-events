import { StyleSheet } from 'react-native'
import { width } from '../../../../Config/Layout'
import {
  PrimaryColor,
  SecondaryText,
  GrayColor,
  LightText,
  PrimaryBorder,
  SecondaryColor,
} from '../../../../Config/ColorPalette'

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width,
    alignSelf: 'center',
  },
  FlatListContainer: {
    flex: 1,
  },
  CardContainer: {
    backgroundColor: GrayColor,
    borderRadius: 5,
    alignItems: 'flex-start',
    marginTop: 5,
  },
  TextCompany: {
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
    color: SecondaryText,
  },
  TextEvent: {
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  TextDate: {
    fontWeight: '500',
    fontSize: 13,
    color: LightText,
    marginHorizontal: 10,
  },
  TextTransfer: {
    fontWeight: '500',
    fontSize: 13,
    color: LightText,
    marginHorizontal: 10,
    marginTop: 10,
  },
  TextDateValue: {
    fontWeight: '500',
    fontSize: 13,
    color: '#000',
  },
  DataView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  },
  DataViewC: {
    marginRight: 30,
    alignItems: 'flex-start',
  },
  TextData: {
    fontWeight: '500',
    fontSize: 14,
    color: LightText,
    marginVertical: 7,
  },
  TextDataValue: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
  },
  DataViewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  StatusBox: {
    backgroundColor: PrimaryColor,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  StatuText: {
    fontSize: 12,
    fontWeight: '500',
  },
})

export default styles
