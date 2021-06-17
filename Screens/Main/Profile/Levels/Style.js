import { StyleSheet } from 'react-native';
import { width } from '../../../../Config/Layout';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width,
    alignSelf: 'center',
  },
  Title: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 16,
    marginTop: 35,
  },
  About: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
    marginVertical: 10,
    textAlign: 'left',
  },
  LevelView: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F9',
    width: width + 10,
    padding: 10,
    marginTop: 10,
  },
  Level: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  LevelNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E8505B',
  },
  LevelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#868991',
    marginVertical: 5,

    marginHorizontal: 16,
  },
});

export default styles;
