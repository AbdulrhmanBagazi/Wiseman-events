import { StyleSheet } from 'react-native';
import { width } from '../../../Config/Layout';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    width: width + 20,
  },
  header: {
    backgroundColor: '#F8F8F9',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  safe: {
    width: width + 20,
    alignItems: 'flex-end',
  },
  info: {
    width,
    marginTop: 10,
    alignItems: 'flex-start',
    padding: 10,
  },
  rating: {
    width,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  balance: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A7AAB2',
    flex: 1,
    textAlign: 'left',
  },
  ratingText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  ratingTextNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A7AAB2',
  },
  about: {
    width: width + 20,
    flex: 1,
  },
  aboutE: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#DFE0E3',
    width: width + 20,
    alignItems: 'flex-start',
  },
  aboutT: {
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  aboutB: {
    backgroundColor: '#F8F8F9',
    flex: 1,
  },
  aboutButton: {
    width: width + 20,
    borderBottomColor: '#DFE0E3',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
  },
  rightText: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 15,
  },
  rightTextNull: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 15,
    color: '#E8505B',
  },
  leftText: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 10,
    color: '#859881',
  },
});

export default styles;
