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
    var rateHourOrganizer = Number(props.Rate.event.Salary)
    var rateHourSupervisor = Number(props.Rate.event.SalarySupervisor)

    var totalHours = 0
    var totalSuperHours = 0

    for (var i = 0; i < data.length; i++) {
      if (data[i].Type === 'organizer') {
        var min = Math.floor(Number(data[i].TotalHours / 60000))
        var hours = Math.round(min / 60)

        totalHours = totalHours + hours
      } else {
        var min = Math.floor(Number(data[i].TotalHours / 60000))
        var hours = Math.round(min / 60)

        totalSuperHours = totalSuperHours + hours
      }
    }

    var organizerSalary = totalHours * rateHourOrganizer
    var supervisorSalary = totalSuperHours * rateHourSupervisor

    var salary = organizerSalary + supervisorSalary

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
