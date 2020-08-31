import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { width } from '../../../Config/Layout'

function QrcodeGen(props) {
  return <QRCode value={[{ data: props.value, mode: 'byte' }]} size={width - 30} />
}

export default QrcodeGen
