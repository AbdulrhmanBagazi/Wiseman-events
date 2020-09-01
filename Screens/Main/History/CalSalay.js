import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { PrimaryColor } from '../../../Config/ColorPalette'
import styles from './Style'

function CalSalary(props) {
  const [isLoading, setLoading] = React.useState(true)
  const [Total, setTotal] = React.useState(0)

  React.useEffect(() => {
    setLoading(true)
    var data = props.Values
    var total = 0

    for (var i = 0; i < data.length; i++) {
      total = total + Number(data[i].TotalHours)
    }
    var min = total / 60000
    var salary = Math.round(min * 0.416666666666667)

    setTotal(salary)
    setLoading(false)
  }, [props.Values])

  return (
    <View style={styles.dataTextActive}>
      {isLoading ? <ActivityIndicator size="small" color={PrimaryColor} /> : <Text>{Total + ' sar'}</Text>}
    </View>
  )
}

export default CalSalary
