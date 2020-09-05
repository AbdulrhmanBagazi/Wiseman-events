import React from 'react'
import { View, Text, ActivityIndicator, I18nManager } from 'react-native'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import styles from '../Style'

function CalSalary(props) {
  const [isLoading, setLoading] = React.useState(true)
  const [Total, setTotal] = React.useState(0)

  React.useEffect(() => {
    setLoading(true)
    var data = props.Values
    var rate = Number(props.Rate.event.Salary / 60)
    var total = 0

    for (var i = 0; i < data.length; i++) {
      total = total + Math.floor(Number(data[i].TotalHours / 60000))
    }
    var min = total
    var salary = Math.round(min * rate)

    setTotal(salary)
    setLoading(false)
  }, [props.Values])

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {I18nManager.isRTL ? Total + 'ريال' : Total + 'sar'}
    </Text>
  )
}

export default CalSalary
