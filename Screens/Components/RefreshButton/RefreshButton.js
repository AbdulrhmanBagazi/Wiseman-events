import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'

function RefreshButton(props) {
  return (
    <TouchableOpacity style={styles.Button} onPress={props.onPress}>
      <Icon name="refresh-cw" size={24} color="#fff" />
    </TouchableOpacity>
  )
}

export default RefreshButton
