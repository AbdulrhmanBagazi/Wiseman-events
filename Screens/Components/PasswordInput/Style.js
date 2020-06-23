import { StyleSheet } from 'react-native'
import { width } from '../../../Config/Layout'
import { SecondaryText } from '../../../Config/ColorPalette'

const styles = StyleSheet.create({
  HidePassword: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 10,
    right: 10,
  },
  Resendmessage: {
    color: SecondaryText,
  },
  CheckMatch: {
    width,
    justifyContent: 'flex-start',
    marginBottom: 20,
    flexDirection: 'row',
  },
})

export default styles
