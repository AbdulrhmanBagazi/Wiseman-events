import React from 'react';
import { View, Modal, Text, TouchableOpacity, I18nManager } from 'react-native';
import styles from './Style';
import { WorkScheduleUserString } from '../../../Config/Strings';
import moment from 'moment-timezone';

function InfoModal(props) {
  const [isStart, setStart] = React.useState(null);
  const [isEnd, setEnd] = React.useState(null);
  const [isStatus, setStatus] = React.useState(null);

  React.useEffect(() => {
    var S = props.Data.Start;
    var E = props.Data.End;
    var T = props.Data.Status;

    if (S) {
      var Sdate = moment(S);
      var start = moment.tz(Sdate, 'Asia/Riyadh').locale('en').format('hh:mma');
      setStart(start);
    } else {
      setStart(WorkScheduleUserString.noInfo);
    }

    if (E) {
      var Edate = moment(E);
      var end = moment.tz(Edate, 'Asia/Riyadh').locale('en').format('hh:mma');
      setEnd(end);
    } else {
      setEnd(WorkScheduleUserString.noInfo);
    }

    if (T) {
      var String =
        T === 'active'
          ? WorkScheduleUserString.activeStatus
          : T === 'absence'
          ? WorkScheduleUserString.Absence
          : T === 'incomplete'
          ? WorkScheduleUserString.incomplete
          : T === 'completed'
          ? WorkScheduleUserString.CompletedStatus
          : WorkScheduleUserString.pendingStatus;
      setStatus(String);
    } else {
      setStatus(WorkScheduleUserString.Info);
    }
  }, [props.Data]);

  return (
    <Modal animationType="fade" transparent={true} visible={props.OpenModal}>
      <View style={styles.modal}>
        <View style={styles.Container}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>{isStatus}</Text>
          </View>
          <View style={styles.Body}>
            <View style={styles.InfoContainer}>
              <View style={styles.Info}>
                <View style={styles.InfoOne}>
                  <Text style={styles.InfoTitle}>{props.TakeAttendence}</Text>
                  <Text style={styles.InfoTime}>{isStart}</Text>
                </View>
                <View style={styles.InfoTwo}>
                  <Text style={styles.InfoTitle}>
                    {props.TakeAttendenceEnd}
                  </Text>
                  <Text style={styles.InfoTime}>{isEnd}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.Button} onPress={props.onPress}>
              <Text style={styles.ButtonText}>
                {I18nManager.isRTL ? 'حسنا' : 'Ok'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default InfoModal;
