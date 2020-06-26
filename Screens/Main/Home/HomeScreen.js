import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'

function Home({ store }) {
  React.useEffect(() => {
    console.log(store.data)
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  )
}

export default inject('store')(observer(Home))
