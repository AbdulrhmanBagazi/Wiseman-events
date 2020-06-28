import * as React from 'react'
import { Feather } from '@expo/vector-icons'

function Icons(props) {
  return <Feather name={props.name} size={props.size} color={props.color} />
}

export default Icons
