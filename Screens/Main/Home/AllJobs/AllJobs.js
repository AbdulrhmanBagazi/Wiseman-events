import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import Card from './Card'
import styles from '../Style'
import axios from 'axios'
import { URL } from '../../../../Config/Config'

function AllJobs({ route, store, navigation }) {
  const [isLoading, setLoading] = React.useState(false)
  const [isData, setData] = React.useState([])

  const { id } = route.params

  React.useEffect(() => {
    axios
      .get(URL + '/user/getJobs/' + id, {
        headers: {
          Authorization: store.token,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            await setData(response.data.data)
            setLoading(true)
            return
          } else if (response.data.check === 'fail') {
            setError(false)
            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(false)

        return
      })

    return
  }, [])

  return (
    <View style={styles.AllJobsContainer}>
      {/* <Card /> */}
      {isLoading ? (
        <Card Data={isData} PushJob={() => navigation.navigate('SingleJob')} click={navigation.navigate} />
      ) : (
        <ActivityIndicator size="large" color="#AF0029" style={{ alignSelf: 'center' }} />
      )}
    </View>
  )
}

export default inject('store')(observer(AllJobs))
