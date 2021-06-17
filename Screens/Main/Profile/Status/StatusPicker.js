import React from 'react';
import {
  View,
  Text,
  Modal,
  I18nManager,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import styles from './Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { StatusPageStrings } from '../../../../Config/Strings';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // borderBottomWidth: 1,
    // borderColor: '#868991',
    margin: 2,
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontWeight: '600',
    fontSize: 16,
    color: PrimaryColor,
  },
  inputAndroid: {
    padding: 5,
    fontWeight: '600',
    fontSize: 16,
    color: PrimaryColor,
  },
});

const Days = I18nManager.isRTL
  ? [
      { label: 'السبت', value: 'Saturday' },
      { label: 'الآحد', value: 'Sunday' },
      { label: 'الإثنين', value: 'Monday' },
      { label: 'الثلاثاء', value: 'Tuesday' },
      { label: 'الآربعاء', value: 'Wednesday' },
      { label: 'الخميس', value: 'Thursday' },
      { label: 'الجمعة', value: 'Friday' },
    ]
  : [
      { label: 'Saturday', value: 'Saturday' },
      { label: 'Sunday', value: 'Sunday' },
      { label: 'Monday', value: 'Monday' },
      { label: 'Tuesday', value: 'Tuesday' },
      { label: 'Wednesday', value: 'Wednesday' },
      { label: 'Thursday', value: 'Thursday' },
      { label: 'Friday', value: 'Friday' },
    ];

const Stat = I18nManager.isRTL
  ? [
      { label: 'متفرغ', value: 'Full-Time' },
      { label: 'طالب', value: 'Student' },
      { label: 'موظف', value: 'Employed' },
    ]
  : [
      { label: 'Full-Time', value: 'Full-Time' },
      { label: 'Student', value: 'Student' },
      { label: 'Employed', value: 'Employed' },
    ];

function StatusPicker(props) {
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  // const [DateValue] = React.useState(new Date());
  const [TimeFrom, setTimeFrom] = React.useState(new Date());
  const [TimeTo, setTimeTo] = React.useState(new Date());
  const [Check, setCheck] = React.useState(null);
  const [From, setFrom] = React.useState('');
  const [To, setTo] = React.useState('');

  const showDatepickerIOS = () => {
    if (Platform.OS === 'ios') {
      setShow(true);
      setShowModal(true);
      setCheck(1);
      return;
    } else {
      setShow(true);
      setShowModal(false);
      setCheck(1);
      return;
    }
  };

  const showDatepickerIOSTWO = () => {
    if (Platform.OS === 'ios') {
      setShow(true);
      setShowModal(true);
      setCheck(2);
      return;
    } else {
      setShow(true);
      setShowModal(false);
      setCheck(2);
      return;
    }
  };

  const onChange = async (event, selectedTime) => {
    if (Platform.OS === 'ios') {
      var Time = await moment(selectedTime).format('hh:mm a');
      if (Check === 1) {
        setTimeFrom(selectedTime);
        setFrom(Time);
        props.getTimeStart(Time);

        return;
      } else {
        setTimeTo(selectedTime);
        setTo(Time);
        props.getTimeEnd(Time);

        return;
      }
    } else {
      var Time = await moment(selectedTime).format('hh:mm a');
      if (event.type === 'dismissed') {
        setShow(false);
        setShowModal(false);
        setCheck(null);
      } else if (event.type === 'set') {
        setShow(false);
        setShowModal(false);
        setCheck(null);
        if (Check === 1) {
          setTimeFrom(selectedTime);
          setFrom(Time);
          props.getTimeStart(Time);

          return;
        } else {
          setTimeTo(selectedTime);
          setTo(Time);
          props.getTimeEnd(Time);

          return;
        }
      }
    }
  };

  const ClosePicker = async () => {
    setShow(false);
    setShowModal(false);
    setCheck(null);
    if (Check === 1) {
      var Time = await moment(TimeFrom).format('hh:mm a');
      setTimeFrom(TimeFrom);
      setFrom(Time);
      props.getTimeStart(Time);
      return;
    } else {
      var Time = await moment(TimeTo).format('hh:mm a');
      setTimeTo(TimeTo);
      setTo(Time);
      props.getTimeEnd(Time);

      return;
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.MainView}>
        <View style={styles.ViewAlignContent}>
          <Text style={styles.ViewTextPickerFirst}>
            {I18nManager.isRTL ? 'الحالة' : 'Status'}
          </Text>
        </View>
        <RNPickerSelect
          onValueChange={props.onValueChangeStat}
          style={{
            ...pickerSelectStyles,
          }}
          placeholder={{
            label: I18nManager.isRTL ? 'حدد الحالة ...' : 'Select Status...',
            value: null,
          }}
          items={Stat}
          Icon={() => null}
        />
      </View>

      {props.ShowMore === false ? null : (
        <View style={styles.ShowMoreView}>
          <View style={styles.ViewAlignContent}>
            <Text style={styles.ViewTextPicker}>
              {I18nManager.isRTL ? 'أيام العمل' : 'Work days'}
            </Text>
          </View>
          <View style={styles.ViewRow}>
            <View style={styles.PickerView}>
              <RNPickerSelect
                onValueChange={props.onValueChangeDayFrom}
                style={{
                  ...pickerSelectStyles,
                }}
                placeholder={{
                  label: I18nManager.isRTL ? 'من...' : 'From...',
                  value: null,
                }}
                items={Days}
                Icon={() => null}
              />
            </View>
            <View style={styles.SelectView}>
              <RNPickerSelect
                onValueChange={props.onValueChangeDayTo}
                style={{
                  ...pickerSelectStyles,
                }}
                placeholder={{
                  label: I18nManager.isRTL ? 'إلى...' : 'To...',
                  value: null,
                }}
                items={Days}
                Icon={() => null}
              />
            </View>
          </View>
        </View>
      )}

      {props.ShowMore === false ? null : (
        <View style={styles.MarginV}>
          <View style={styles.ViewAlignContent}>
            <Text style={styles.ViewTextPicker}>
              {I18nManager.isRTL ? 'وقت العمل' : 'Work time'}
            </Text>
          </View>
          <View style={styles.ViewRow}>
            <View style={styles.FlexOne}>
              <TouchableOpacity
                style={styles.inputTime}
                onPress={showDatepickerIOS}
              >
                <Text
                  style={[
                    styles.TextFont,
                    {
                      color: From === '' ? '#c7c7cd' : PrimaryColor,
                    },
                  ]}
                >
                  {From !== '' ? From : I18nManager.isRTL ? 'من...' : 'From...'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.inputTime}
                onPress={showDatepickerIOSTWO}
              >
                <Text
                  style={[
                    styles.TextFont,
                    {
                      color: To === '' ? '#c7c7cd' : PrimaryColor,
                    },
                  ]}
                >
                  {To !== '' ? To : I18nManager.isRTL ? 'إلى...' : 'To...'}
                </Text>
                {/* {Platform.OS === 'ios' ? null : <FontAwesome name="caret-down" size={15} color="#747474" />} */}
              </TouchableOpacity>
            </View>
          </View>

          {!showModal && show === true ? (
            Check === 1 ? (
              <DateTimePicker
                style={styles.picker}
                testID="dateTimePicker"
                value={TimeFrom}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            ) : Check === 2 ? (
              <DateTimePicker
                style={styles.picker}
                testID="dateTimePicker"
                value={TimeTo}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            ) : null
          ) : show === true ? (
            <Modal animationType="fade" transparent={true} visible={show}>
              <View style={styles.Modal}>
                <View style={styles.modalContainer}>
                  {Check === 1 ? (
                    <DateTimePicker
                      style={styles.picker}
                      testID="dateTimePicker"
                      value={TimeFrom}
                      mode="time"
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />
                  ) : (
                    <DateTimePicker
                      style={styles.picker}
                      testID="dateTimePicker"
                      value={TimeTo}
                      mode="time"
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.ModalButton}
                    onPress={() => ClosePicker()}
                  >
                    <Text style={styles.ButtonText}>
                      {StatusPageStrings.Done}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
      )}
    </View>
  );
}

export default StatusPicker;
