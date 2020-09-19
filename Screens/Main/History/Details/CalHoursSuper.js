import React from 'react'
import { View, Text, ActivityIndicator, I18nManager } from 'react-native'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import styles from '../Style'
import humanizeDuration from 'humanize-duration'

function CalHoursSuper(props) {
  const [isLoading, setLoading] = React.useState(true)
  const [Total, setTotal] = React.useState(0)

  React.useEffect(() => {
    setLoading(true)
    var data = props.Values
    var total = 0

    for (var i = 0; i < data.length; i++) {
      if (data[i].Type === 'supervisor') {
        total = total + Math.floor(Number(data[i].TotalHours) / 60000)
      }
    }

    var mills = total * 60000

    setTotal(mills)
    setLoading(false)
  }, [props.Values])

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {humanizeDuration(Total, {
        units: ['h'],
        round: true,
        language: I18nManager.isRTL ? 'ar' : 'en',
        fallbacks: ['en'],
      })}
    </Text>
  )
}

export default CalHoursSuper