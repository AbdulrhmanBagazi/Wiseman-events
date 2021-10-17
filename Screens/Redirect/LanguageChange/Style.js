import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';
import { BackgroundColor, PrimaryColor } from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    // alignItems: 'center',
  },
  PageTitle: {
    marginBottom: 80,
    marginTop: 80,
    // fontSize: 32,
    alignSelf: 'center',
  },
  AnimatedButtonView: {
    alignSelf: 'center',
  },
  TouchableOpacityContainer: {
    flexDirection: 'row',
    width,
    marginBottom: 12,
    height: 50,
  },
  TouchableOpacity: {
    flexDirection: 'row',
    width,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
    height: 50,
    padding: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  Circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: PrimaryColor,
  },
  TouchableOpacityText: {
    fontSize: 14,
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
    marginTop: 40,
    alignSelf: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
