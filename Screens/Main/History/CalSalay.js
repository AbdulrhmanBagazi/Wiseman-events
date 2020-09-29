import React from 'react'
import { View, Text, ActivityIndicator, I18nManager } from 'react-native'
import { PrimaryColor } from '../../../Config/ColorPalette'
import styles from './Style'

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
      if (data[i].Type === 'organizer') {
        var min = Math.floor(Number(data[i].TotalHours / 60000))
        var hours = Math.round(min / 60)

        totalHours = totalHours + hours
        if (Meal === false) {
          daysCompleted = daysCompleted + 1
        }
      } else {
        var min = Math.floor(Number(data[i].TotalHours / 60000))
        var hours = Math.round(min / 60)

        totalSuperHours = totalSuperHours + hours
        if (Meal === false) {
          daysCompleted = daysCompleted + 1
        }
      }
    }

    var organizerSalary = totalHours * rateHourOrganizer
    var supervisorSalary = totalSuperHours * rateHourSupervisor

    var salary = organizerSalary + supervisorSalary
    var meal = daysCompleted * MealPlus

    setTotal(salary + meal)
    setLoading(false)
  }, [props.Values])

  return (
    <View style={styles.dataTextActive}>
      {isLoading ? (
        <ActivityIndicator size="small" color={PrimaryColor} />
      ) : (
        <Text>{I18nManager.isRTL ? Total + 'ريال' : Total + 'sar'}</Text>
      )}
    </View>
  )
}

export default CalSalary
