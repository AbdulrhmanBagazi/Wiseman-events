import React from 'react'
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import Card from './Card'
import styles from '../Style'
import axios from 'axios'
import { URL } from '../../../../Config/Config'
import RefreshButton from '../../../Components/RefreshButton/RefreshButton'

function AllJobs({ route, store, navigation }) {
  const [isLoading, setLoading] = React.useState(false)
  const [isData, setData] = React.useState([])
  const [isError, setError] = React.useState(false)
  const [isRefresh, setRefresh] = React.useState(false)

  const { id } = route.params

  React.useEffect(() => {
    setLoading(true)

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
            setError(true)
            setLoading(false)

            return
          }
        }
      })
      .catch(async (error) => {
        // console.log(error)
        setError(true)
        setLoading(false)

        return
      })

    return
  }, [isRefresh])

  return (
    <View style={styles.AllJobsContainer}>
      {/* <Card /> */}
      {isLoading ? (
        <Card Data={isData} PushJob={() => navigation.navigate('SingleJob')} click={navigation.navigate} />
      ) : isError ? (
        <View>
          <RefreshButton onPress={() => setRefresh(!isRefresh)} />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#AF0029" style={{ alignSelf: 'center' }} />
      )}
    </View>
  )
}

export default inject('store')(observer(AllJobs))
