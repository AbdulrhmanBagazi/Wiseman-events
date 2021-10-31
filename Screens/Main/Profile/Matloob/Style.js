import { StyleSheet, I18nManager } from 'react-native';
import { width } from '../../../../Config/Layout';
import {
  SecondaryColor,
  LightText,
  PrimaryColor,
} from '../../../../Config/ColorPalette';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    width: width - 20,
    borderRadius: 6,
    marginVertical: 70,
  },
  input: {
    padding: 10,
    flexDirection: 'row',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    backgroundColor: '#fff',
  },
  Col: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  modal: {
    backgroundColor: 'rgba(	15	,20	,50, 0.5)',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: LightText,
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
});

export default styles;
