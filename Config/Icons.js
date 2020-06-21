import * as React from 'react'
import { Entypo } from '@expo/vector-icons'

function Icons(props) {
  return <Entypo name={props.IconName} size={props.IconSize} color="black" />
}

export default Icons
