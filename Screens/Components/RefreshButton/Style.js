import { StyleSheet } from 'react-native'
import { PrimaryColor } from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: PrimaryColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
