import { StyleSheet } from 'react-native'
import { width, height } from '../../../Config/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width,
    borderColor: 'gray',
    borderWidth: 1,
  },
})

export default styles
