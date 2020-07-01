import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import Card from './Card'
import styles from '../Style'

function AllJobs({ store, navigation }) {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])

  return (
    <View style={styles.AllJobsContainer}>
      {/* <Card /> */}
      {isLoading ? (
        <Card PushJob={() => navigation.navigate('SingleJob')} />
      ) : (
        <ActivityIndicator size="large" color="#AF0029" style={{ alignSelf: 'center' }} />
      )}
    </View>
  )
}

export default inject('store')(observer(AllJobs))
