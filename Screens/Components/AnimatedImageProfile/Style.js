import { StyleSheet } from 'react-native';
import { PrimaryColor } from '../../../Config/ColorPalette';

const styles = StyleSheet.create({
  Image: {
    backgroundColor: PrimaryColor,
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: 33,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: PrimaryColor,
  },
});

export default styles;
