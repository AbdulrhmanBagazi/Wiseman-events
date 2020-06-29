import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, Image } from 'react-native'
import { inject, observer } from 'mobx-react'

function AllJobs({ store }) {
  return (
    <View>
      <TouchableHighlight>
        <Text>AllJobs</Text>
      </TouchableHighlight>
    </View>
  )
}

export default inject('store')(observer(AllJobs))
