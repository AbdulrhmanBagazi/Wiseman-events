import React from 'react'
import { View, Text, Alert, ScrollView, FlatList, I18nManager } from 'react-native'
import styles from './Style'
import { SingleJobStrings } from '../../../../Config/Strings'
import ModalApplication from './ModalApplication'
import AnimatedButton from './AnimatedButton'
import LoadingModal from '../../../Components/Loading/LoadingModal'
import DisabledButton from '../../../Components/DisabledButton/DisabledButton'
import { URL } from '../../../../Config/Config'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
//
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'

function Application({ route, store }) {
  const [selectedShift, setselectedShift] = React.useState(null)
  const [isTime, setTime] = React.useState(null)
  const [isAttendance, setAttendance] = React.useState(null)
  const [isShiftId, setShiftId] = React.useState(null)
  const [canApply, setCanApply] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [isShow, setShow] = React.useState(false)
  //
  const { signOut } = React.useContext(AuthContext)

  const { item } = route.params

  const Select = async (val) => {
    setselectedShift(val)
    setTime(I18nManager.isRTL ? item.eventshifts[val].timeAr : item.eventshifts[val].time)
    setAttendance(I18nManager.isRTL ? item.eventshifts[val].attendanceAr : item.eventshifts[val].attendance)
    setShiftId(item.eventshifts[val].id)
    setCanApply(true)
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
            await store.ReloadData()
            setTimeout(() => {
              setLoading(false)
              setShow(true)
            }, 1000)
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

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ContainerMain}>
          <Text style={styles.title}>{SingleJobStrings.ShiftSelect}</Text>
          <View style={styles.SelectView}>
            <View style={styles.ShiftView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={item.eventshifts}
                horizontal={true}
                renderItem={({ item, index }) => (
                  <AnimatedButton
                    Shift={selectedShift}
                    itemIndex={index}
                    onPress={() => Select(index)}
                    Disabled={item.show}
                    FullText={SingleJobStrings.Full}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>

            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftTime} <Text style={{ color: 'black' }}>{isTime}</Text>
            </Text>
            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftAtta} <Text style={{ color: 'black' }}>{isAttendance}</Text>
            </Text>
          </View>
          <Text style={styles.titleSecond}>{SingleJobStrings.Impor}</Text>
          <View style={styles.SelectViewPoints}>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '} يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
                يتبع له) ليتمكن من
              </Text>
            </View>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '}
                Employee have to report attendence before 30 min of event. Employee have to report attendence
                before 30 min of event. Employee have to report attendence before 30 min of event. Employee
                have to report attendence before 30 min of event. Employee have to report attendence before 30
                min of event.
              </Text>
            </View>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '}
                Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
              </Text>
            </View>
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
