import React from 'react';
import { Text, ActivityIndicator, I18nManager } from 'react-native';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import styles from '../Style';
import humanizeDuration from 'humanize-duration';

function Paymentdata(props) {
  const [isLoading, setLoading] = React.useState(true);

  const [isBonus, setBonus] = React.useState(0);
  const [isDeduction, setDeduction] = React.useState(0);
  const [isPaid, setPaid] = React.useState(0);
  const [isabsence, setabsence] = React.useState(0);
  const [isincomplete, setincomplete] = React.useState(0);
  const [iscomplete, setcomplete] = React.useState(0);
  const [isLate, setLate] = React.useState(0);
  const [isFees, setFees] = React.useState(0);
  const [isHours, setHours] = React.useState(0);

  React.useEffect(() => {
    var data = props.data;

    var paymentdata = props.Values;

    var total_Late = 0;
    var total_absence = 0;
    var total_incomplete = 0;
    var total_completed = 0;
    var hours = 0;

    for (var i = 0; i < data.length; i++) {
      total_Late = total_Late + Number(data[i].Late);

      if (data[i].Status === 'completed') {
        total_completed = total_completed + 1;
        hours = hours + Number(data[i].TotalHours);
      }

      if (data[i].Status === 'absence') {
        total_absence = total_absence + 1;
      }

      if (data[i].Status === 'incomplete') {
        total_incomplete = total_incomplete + 1;
      }
    }
    var LateSec = total_Late * 60000;
    var HoursSec = hours * 60000;
    var Fees = 0;
    var Bonus = 0;
    var Deduction = 0;
    var Paid = 0;
    for (var ii = 0; ii < paymentdata.length; ii++) {
      Bonus = Bonus + Number(paymentdata[ii].Bonus);
      Deduction = Deduction + Number(paymentdata[ii].Deduction);
      Paid = Paid + Number(paymentdata[ii].Paid);

      if (paymentdata[ii].PaymentMethod === 'bank') {
        Fees = Fees + 1;
      }
    }

    setBonus(Bonus);
    setDeduction(Deduction);
    setPaid(Paid);
    setabsence(total_absence);
    setincomplete(total_incomplete);
    setLate(LateSec);
    setcomplete(total_completed);
    setFees(Fees * 8.05);
    setHours(HoursSec);
    setLoading(false);
  }, [props.Values]);

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
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isabsence}
    </Text>
  ) : props.incomplete ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {isincomplete}
    </Text>
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
  ) : props.Completed ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {iscomplete}
    </Text>
  ) : props.Hours ? (
    <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>
      {humanizeDuration(isHours, {
        units: ['h', 'm'],
        round: true,
        language: I18nManager.isRTL ? 'ar' : 'en',
        fallbacks: ['en'],
      })}
    </Text>
  ) : null;
}

export default Paymentdata;
