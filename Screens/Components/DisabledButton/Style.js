import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    width,
    borderRadius: 5,
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
  ButtonContact: {
    flexDirection: 'row',
    // width: width - 30,
    flex: 1,
    borderRadius: 5,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
