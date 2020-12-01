import React from 'react'
import { Text, ActivityIndicator, I18nManager } from 'react-native'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import styles from '../Style'

function Paymentdata(props) {
  const [isLoading, setLoading] = React.useState(true)

  const [isBonus, setBonus] = React.useState(0)
  const [isDeduction, setDeduction] = React.useState(0)
  const [isPaid, setPaid] = React.useState(0)
  const [isabsence, setabsence] = React.useState(0)
  const [isincomplete, setincomplete] = React.useState(0)

  React.useEffect(() => {
    var data = props.Values
    var Bonus = 0
    var Deduction = 0
    var Paid = 0
    var total_absence_organizer = 0
    var total_absence_supervisor = 0
    var total_incomplete_organizer = 0
    var total_incomplete_supervisor = 0

    for (var i = 0; i < data.length; i++) {
      Bonus = Bonus + Number(data[i].Bonus)
      Deduction = Deduction + Number(data[i].Deduction)
      Paid = Paid + Number(data[i].Paid)
      total_absence_organizer = total_absence_organizer + Number(data[i].total_absence_organizer)
      total_absence_supervisor = total_absence_supervisor + Number(data[i].total_absence_supervisor)
      total_incomplete_organizer = total_incomplete_organizer + Number(data[i].total_incomplete_organizer)
      total_incomplete_supervisor = total_incomplete_supervisor + Number(data[i].total_incomplete_supervisor)
    }

    setBonus(Bonus)
    setDeduction(Deduction)
    setPaid(Paid)
    setabsence(total_absence_organizer + total_absence_supervisor)
    setincomplete(total_incomplete_organizer + total_incomplete_supervisor)

    setLoading(false)
  }, [props.Values])

  return isLoading ? (
    <ActivityIndicator size="small" color={PrimaryColor} />
  ) : props.paid ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isPaid}
      {I18nManager.isRTL ? 'ريال ' : ' SAR'}
    </Text>
  ) : props.deduction ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isDeduction}
      {I18nManager.isRTL ? 'ريال ' : ' SAR'}
    </Text>
  ) : props.bonus ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isBonus}
      {I18nManager.isRTL ? 'ريال ' : ' SAR'}
    </Text>
  ) : props.absence ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{isabsence}</Text>
  ) : props.incomplete ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{isincomplete}</Text>
  ) : null
}

export default Paymentdata
