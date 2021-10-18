import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  I18nManager,
  Platform,
} from 'react-native';
import styles from './Style';
import { SingleJobStrings } from '../../../../Config/Strings';
import ModalApplication from './ModalApplication';
import AnimatedButton from './AnimatedButton';
import AnimatedButtonSelect from './AnimatedButtonSelect';
import LoadingModal from '../../../Components/Loading/LoadingModal';
import DisabledButton from '../../../Components/DisabledButton/DisabledButton';
import { inject, observer } from 'mobx-react';
//
import moment from 'moment';

function ApplicationnonAuth({ navigation, route }) {
  const [selectedShift, setselectedShift] = React.useState(null);
  const [isTime, setTime] = React.useState(null);
  const [isAttendance, setAttendance] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [isShow, setShow] = React.useState(false);
  const [isHours, setHours] = React.useState(0);
  const [isShiftIndex, setShiftIndex] = React.useState(-1);
  //

  const [istoggle, settoggle] = React.useState([]);
  const toggle = (index) => {
    const position = istoggle.indexOf(index);
    let newDetails = istoggle.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...istoggle, index];
    }

    settoggle(newDetails);
  };
  //

  const { items, shifts } = route.params;

  const Select = async (val) => {
    setLoading(false);
    settoggle([]);
    //
    setShiftIndex(val);
    var Time = I18nManager.isRTL
      ? moment(items.eventshifts[val].timeStart, 'hh:mm')
          .locale('en')
          .format('hh:mma') +
        ' إلى ' +
        moment(items.eventshifts[val].timeEnd, 'hh:mm')
          .locale('en')
          .format('hh:mma')
      : moment(items.eventshifts[val].timeStart, 'hh:mm')
          .locale('en')
          .format('hh:mma') +
        ' To ' +
        moment(items.eventshifts[val].timeEnd, 'hh:mm')
          .locale('en')
          .format('hh:mma');
    setselectedShift(items.eventshifts[val].shift);
    setTime(Time);
    setHours(items.eventshifts[val].totalhours);
    setAttendance(
      moment(items.eventshifts[val].attendance, 'hh:mm')
        .locale('en')
        .format('hh:mma')
    );

    return;
  };

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ContainerMain}>
          <Text style={styles.title}>{SingleJobStrings.ShiftSelect}</Text>
          <View style={styles.SelectView}>
            <View style={styles.ShiftView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={shifts}
                horizontal={true}
                inverted={
                  I18nManager.isRTL && Platform.OS !== 'ios' ? true : false
                }
                renderItem={({ item, index }) => (
                  <AnimatedButton
                    Shift={selectedShift}
                    itemIndex={item.shift}
                    onPress={() => Select(index)}
                    Disabled={item.show}
                    FullText={SingleJobStrings.Full}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>

            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftTime}{' '}
              <Text style={styles.BlackText}>
                {isTime
                  ? isTime +
                    ` (${isHours} ${I18nManager.isRTL ? 'ساعات' : 'Hours'})`
                  : null}
              </Text>
            </Text>
            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftAtta}{' '}
              <Text style={styles.BlackText}>{isAttendance}</Text>
            </Text>

            <Text style={styles.titleS}>
              {SingleJobStrings.Applyingfor + ' (' + istoggle.length + ')'}
            </Text>
            {isShiftIndex >= 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={items.eventshifts[isShiftIndex].jobshifts}
                horizontal={true}
                inverted={
                  I18nManager.isRTL && Platform.OS !== 'ios' ? true : false
                }
                renderItem={({ item, index }) => (
                  <AnimatedButtonSelect
                    Shift={istoggle.includes(item.job.id)}
                    onPress={() => toggle(item.job.id)}
                    Disabled={item.Disabled}
                    FullText={SingleJobStrings.Full}
                    Value={
                      I18nManager.isRTL
                        ? item.job.title_ar +
                          ' (' +
                          Number(item.job.hourly_rate) +
                          'ريال/الساعة)'
                        : item.job.title +
                          ' (' +
                          Number(item.job.hourly_rate) +
                          'SAR/hour)'
                    }
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : null}
          </View>
          <Text style={styles.titleSecond}>{SingleJobStrings.Impor}</Text>
          <View style={styles.SelectViewPoints}>
            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'تآكد من تسجيل الحضور الإنصراف (عبر رمز  QR)'
                : 'make sure to check-in and check-out (via QR code)'}
            </Text>
            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'الالتزام بوقت الحضور'
                : 'Commitment to attendance time'}
            </Text>

            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'عند التقديم فأنت توافق على شروط العمل (يمكنك التحقق منها في الصفحة السابقة)'
                : 'when applying you agree to the work Terms (you can check them in the previous page)'}
            </Text>

            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'في حالة عدم الالتزام بالعمل قد يؤدي إلى خصم من المستحقات المالية أو الفصل من العمل'
                : 'In the event of non-compliance with the work, it may lead to a deduction from the financial dues or dismissal from work'}
            </Text>
          </View>
        </View>

        <ModalApplication
          ShowModal={isShow}
          onPress={() => setShow(false)}
          onPressHome={() => {
            setShow(false);
            navigation.navigate('Home');
          }}
        />
        <LoadingModal Loading={isLoading} />
      </ScrollView>
      <View style={styles.ButtonView}>
        <DisabledButton
          TextValue={SingleJobStrings.Goto}
          Check={true}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
}

export default inject('store')(observer(ApplicationnonAuth));
