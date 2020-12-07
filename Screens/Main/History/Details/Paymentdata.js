import React from 'react'
import { Text, ActivityIndicator, I18nManager } from 'react-native'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import styles from '../Style'
import humanizeDuration from 'humanize-duration'

function Paymentdata(props) {
  const [isLoading, setLoading] = React.useState(true)

  const [isBonus, setBonus] = React.useState(0)
  const [isDeduction, setDeduction] = React.useState(0)
  const [isPaid, setPaid] = React.useState(0)
  const [isabsence, setabsence] = React.useState(0)
  const [isincomplete, setincomplete] = React.useState(0)
  const [isLate, setLate] = React.useState(0)
  const [isFees, setFees] = React.useState(0)

  React.useEffect(() => {
    var data = props.Values
    var Bonus = 0
    var Deduction = 0
    var Paid = 0
    var total_absence_organizer = 0
    var total_absence_supervisor = 0
    var total_incomplete_organizer = 0
    var total_incomplete_supervisor = 0
    var total_Late_organizer = 0
    var total_Late_supervisor = 0
    var Fees = 0

    for (var i = 0; i < data.length; i++) {
      Bonus = Bonus + Number(data[i].Bonus)
      Deduction = Deduction + Number(data[i].Deduction)
      Paid = Paid + Number(data[i].Paid)
      total_absence_organizer = total_absence_organizer + Number(data[i].total_absence_organizer)
      total_absence_supervisor = total_absence_supervisor + Number(data[i].total_absence_supervisor)
      total_incomplete_organizer = total_incomplete_organizer + Number(data[i].total_incomplete_organizer)
      total_incomplete_supervisor = total_incomplete_supervisor + Number(data[i].total_incomplete_supervisor)
      total_Late_organizer = total_Late_organizer + Number(data[i].total_Late_organizer)
      total_Late_supervisor = total_Late_supervisor + Number(data[i].total_Late_supervisor)

      if (data[i].PaymentMethod === 'bank') {
        Fees = Fees + 1
      }
    }

    setBonus(Bonus)
    setDeduction(Deduction)
    setPaid(Paid)
    setabsence(total_absence_organizer + total_absence_supervisor)
    setincomplete(total_incomplete_organizer + total_incomplete_supervisor)
    setLate((total_Late_organizer + total_Late_supervisor) * 60000)
    setFees(Fees * 10)
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
  ) : props.Late ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {humanizeDuration(isLate, {
        units: ['h', 'm'],
        round: true,
        language: I18nManager.isRTL ? 'ar' : 'en',
        fallbacks: ['en'],
      })}
    </Text>
  ) : props.Fees ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isFees}
      {I18nManager.isRTL ? 'ريال ' : ' SAR'}
    </Text>
  ) : null
}

export default Paymentdata
