import React from 'react'
import * as Analytics from 'expo-firebase-analytics'
import { View, Text, Alert, ScrollView, FlatList, I18nManager, ActivityIndicator } from 'react-native'
import styles from './Style'
import { SingleJobStrings, AnimatedButtonSelectStrings } from '../../../../Config/Strings'
import ModalApplication from './ModalApplication'
import AnimatedButton from './AnimatedButton'
import AnimatedButtonSelect from './AnimatedButtonSelect'
import LoadingModal from '../../../Components/Loading/LoadingModal'
import DisabledButton from '../../../Components/DisabledButton/DisabledButton'
import { URL } from '../../../../Config/Config'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
//
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'
import moment from 'moment'

function Application({ route, store }) {
  const [selectedShift, setselectedShift] = React.useState(null)
  const [isTime, setTime] = React.useState(null)
  const [isAttendance, setAttendance] = React.useState(null)
  const [isShiftId, setShiftId] = React.useState(null)
  const [canApply, setCanApply] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [isShow, setShow] = React.useState(false)
  const [isOrganizer, setOrganizer] = React.useState(false)
  const [isSupervisor, setSupervisor] = React.useState(false)
  const [isHours, setHours] = React.useState(0)

  //
  const { signOut } = React.useContext(AuthContext)

  const { item, shifts } = route.params

  const Select = async (val) => {
    var Time = I18nManager.isRTL
      ? moment(item.eventshifts[val].timeStart, 'hh:mm').format('hh:mma') +
        ' إلى ' +
        moment(item.eventshifts[val].timeEnd, 'hh:mm').format('hh:mma')
      : moment(item.eventshifts[val].timeStart, 'hh:mm').format('hh:mma') +
        ' To ' +
        moment(item.eventshifts[val].timeEnd, 'hh:mm').format('hh:mma')
    setselectedShift(item.eventshifts[val].shift)
    setTime(Time)
    setAttendance(moment(item.eventshifts[val].attendance, 'hh:mm').format('hh:mma'))
    setShiftId(item.eventshifts[val].id)
    setHours(item.eventshifts[val].totalhours)
    if (isOrganizer === false && isSupervisor === false) {
      setCanApply(false)
    } else if (isOrganizer === true || isSupervisor === true) {
      setCanApply(true)
    }
    return
  }

  const Apply = async () => {
    setLoading(true)
    axios
      .post(
        URL + '/user/ApplyToJob',
        {
          eventshiftId: isShiftId,
          eventId: item.id,
          Organizer: isOrganizer,
          Supervisor: isSupervisor,
        },
        {
          headers: {
            Authorization: store.token,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'exists') {
            setLoading(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'لا يمكنك التقديم على نفس الوردية' : 'You cannot apply to the same shift',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            )
          } else if (response.data.check === 'success') {
            // await store.ReloadData()
            Analytics.logEvent('ApplyingToJob')
            await store.setHistoryPageBack()
            await store.setResetPages()
            setTimeout(() => {
              setLoading(false)
              setShow(true)
            }, 500)
            return
          } else if (response.data.check === 'fail') {
            setLoading(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            )

            return
          } else {
            setLoading(false)
            Alert.alert(
              '',
              I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
              [{ text: 'OK', onPress: () => setLoading(false) }],
              {
                cancelable: false,
              }
            )

            return
          }
        }
      })
      .catch(async (error) => {
        setLoading(false)
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove()
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              )

              return
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              )
              return
            }
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          )
          return
        }
      })
  }

  const SelectType = async (val, check) => {
    if (val === 0) {
      await setOrganizer(check)

      if (check === false) {
        if (isSupervisor === true && selectedShift !== null) {
          setCanApply(true)
        } else {
          setCanApply(false)
        }
      } else {
        if (check === true && selectedShift !== null) {
          setCanApply(true)
        } else {
          setCanApply(false)
        }
      }
    } else {
      await setSupervisor(check)

      if (check === false) {
        if (isOrganizer === true && selectedShift !== null) {
          setCanApply(true)
        } else {
          setCanApply(false)
        }
      } else {
        if (check === true && selectedShift !== null) {
          setCanApply(true)
        } else {
          setCanApply(false)
        }
      }
    }

    return
  }

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
                inverted={I18nManager.isRTL && Platform.OS !== 'ios' ? true : false}
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
              <Text style={{ color: 'black' }}>
                {isTime ? isTime + ` (${isHours} ${I18nManager.isRTL ? 'ساعات' : 'Hours'})` : null}
              </Text>
            </Text>
            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftAtta} <Text style={{ color: 'black' }}>{isAttendance}</Text>
            </Text>

            <Text style={styles.titleS}>{SingleJobStrings.Applyingfor}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ alignSelf: 'flex-start' }}>
              <AnimatedButtonSelect
                Shift={isOrganizer}
                onPress={() => SelectType(0, !isOrganizer)}
                Disabled={true}
                FullText={SingleJobStrings.Full}
                Value={AnimatedButtonSelectStrings.organizer}
              />
              <AnimatedButtonSelect
                Shift={isSupervisor}
                onPress={() => SelectType(1, !isSupervisor)}
                Disabled={true}
                FullText={SingleJobStrings.Full}
                Value={AnimatedButtonSelectStrings.supervisor}
              />
            </ScrollView>
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
                ? 'الالتزام بالوقت المحدد لتسجيل الحضور'
                : 'Commitment to the specified time to register attendance'}
            </Text>

            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'في حال التأخير أو عدم الالتزام بوقت العمل المحدد يتم خصم من المستحقات المالية'
                : 'In the event of delay or non-compliance with the specified working time, the financial dues will be deducted'}
            </Text>

            <Text style={styles.TextSelect}>
              {'\u2022' + ' '}
              {I18nManager.isRTL
                ? 'في حالة عدم الالتزام بأيام العمل قد يؤدي إلى خصم من المستحقات المالية أو الفصل من العمل'
                : 'In the event of non-compliance with the working days, it may lead to deduction from financial dues or dismissal from work'}
            </Text>
          </View>
        </View>

        <ModalApplication ShowModal={isShow} onPress={() => setShow(false)} />
        <LoadingModal Loading={isLoading} />
      </ScrollView>
      <View style={styles.ButtonView}>
        {/* <TouchableOpacity style={styles.Button} onPress={() => setShow(true)} disabled={true}>
          <Text style={styles.ButtonText}>{SingleJobStrings.Apply}</Text>
        </TouchableOpacity> */}

        <DisabledButton TextValue={SingleJobStrings.Apply} Check={canApply} onPress={() => Apply()} />
      </View>
    </View>
  )
}

export default inject('store')(observer(Application))
