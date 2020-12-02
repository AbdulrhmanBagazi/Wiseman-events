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
    var Meal = props.Meal
    var MealPlus = props.MealPlus

    var totalHours = 0
    var totalSuperHours = 0
    var daysCompleted = 0

    for (var i = 0; i < data.length; i++) {
      if (data[i].Status === 'completed') {
        if (data[i].Type === 'organizer') {
          var hours = data[i].TotalHours / 60

          totalHours = totalHours + hours
          if (Meal === false) {
            daysCompleted = daysCompleted + 1
          }
        } else {
          var hours = data[i].TotalHours / 60

          totalSuperHours = totalSuperHours + hours
          if (Meal === false) {
            daysCompleted = daysCompleted + 1
          }
        }
      }
    }

    var HoursSuper = Math.round(totalSuperHours - 0.3)
    var HoursOrganizer = Math.round(totalHours - 0.3)

    var organizerSalary = HoursOrganizer * rateHourOrganizer
    var supervisorSalary = HoursSuper * rateHourSupervisor

    var salary = organizerSalary + supervisorSalary
    var meal = daysCompleted * MealPlus

    setTotal(salary + meal)
    setLoading(false)
  }, [props.Values])

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {I18nManager.isRTL ? Total + 'ريال ' : Total + ' SAR'}
    </Text>
  )
}

export default CalSalary
