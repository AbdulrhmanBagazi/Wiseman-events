import React from 'react'
import {
  View,
  Text,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { StatusPageStrings } from '../../../../Config/Strings'
import { width } from '../../../../Config/Layout'
import StatusPicker from './StatusPicker'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { URL } from '../../../../Config/Config'
import axios from 'axios'
//
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'

function Status({ store }) {
  const [Show, setShow] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [TimeStart, setTimeStart] = React.useState(null)
  const [TimeEnd, setTimeEnd] = React.useState(null)
  //
  const { signOut } = React.useContext(AuthContext)

  const [Day, setDay] = React.useState({
    Start: null,
    End: null,
  })
  const [Stat, setStat] = React.useState(null)
  const SetStatus = async () => {
    setLoading(true)
    if (Stat === 'Full-Time') {
      axios
        .post(
          URL + '/user/AddUpdateStatus',
          {
            status: Stat,
            time: null,
            days: null,
          },
          {
            headers: {
              Authorization: store.token,
            },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            if (response.data.check === 'success') {
              if (response.data.status[0] === 1) {
                store.data.status = {
                  status: Stat,
                  time: null,
                  days: null,
                }
              } else {
                store.data.status = response.data.status
              }
              setTimeout(() => {
                setLoading(false)
                setShow(false)
              }, 2000)
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
    } else if (Day.Start === null || Day.End === null || TimeStart === null || TimeEnd === null) {
      // console.log(Day.Start, Day.End, TimeStart, TimeEnd)
      setLoading(false)
      Alert.alert(
        '',
        I18nManager.isRTL ? 'جميع الحقول مطلوبة!' : 'All fields required!',
        [{ text: 'OK', onPress: () => setLoading(false) }],
        {
          cancelable: false,
        }
      )

      return
    } else if (
      Stat !== null &&
      Day.Start !== null &&
      Day.End !== null &&
      TimeStart !== null &&
      TimeEnd !== null
    ) {
      axios
        .post(
          URL + '/user/AddUpdateStatus',
          {
            status: Stat,
            time: TimeStart + ' - ' + TimeEnd,
            days: Day.Start + ' - ' + Day.End,
          },
          {
            headers: {
              Authorization: store.token,
            },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            if (response.data.check === 'success') {
              if (response.data.status[0] === 1) {
                store.data.status = {
                  status: Stat,
                  time: TimeStart + ' - ' + TimeEnd,
                  days: Day.Start + ' - ' + Day.End,
                }
              } else {
                store.data.status = response.data.status
              }
              setTimeout(() => {
                setLoading(false)
                setShow(false)
              }, 2000)
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
      return
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width,
          marginTop: 40,
        }}>
        <Text style={styles.Title}>{StatusPageStrings.Status}</Text>
        {Show ? (
          <TouchableOpacity
            style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setShow(false)}>
            <Text style={styles.Cancel}>{StatusPageStrings.Cancel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.Container}>
        {Show ? (
          <View style={styles.View}>
            <StatusPicker
              onValueChangeStat={(value) => setStat(value)}
              onValueChangeDayFrom={(value) => setDay({ ...Day, Start: value })}
              onValueChangeDayTo={(value) => setDay({ ...Day, End: value })}
              getTimeStart={setTimeStart}
              getTimeEnd={setTimeEnd}
              ShowMore={Stat === null || Stat === 'Full-Time' ? false : true}
            />
          </View>
        ) : (
          <View style={styles.View}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'الحالة' : 'Status'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                {I18nManager.isRTL ? (
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 16,
                      fontWeight: '500',
                      color: store.data.status === null ? '#E8505B' : '#000',
                    }}>
                    {store.data.status === null
                      ? StatusPageStrings.notspecifiedyet
                      : store.data.status.status === 'Full-Time'
                      ? 'متفرغ'
                      : store.data.status.status === 'Student'
                      ? 'طالب'
                      : 'موظف'}
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 16,
                      fontWeight: '500',
                      color: store.data.status === null ? '#E8505B' : '#000',
                    }}>
                    {store.data.status === null
                      ? StatusPageStrings.notspecifiedyet
                      : store.data.status.status}
                  </Text>
                )}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'أيام العمل' : 'Work days'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 16,
                    fontWeight: '500',
                    color: store.data.status === null ? '#E8505B' : '#000',
                  }}>
                  {store.data.status === null ? '' : store.data.status.days}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'وقت العمل' : 'Work time'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 16,
                    fontWeight: '500',
                    color: store.data.status === null ? '#E8505B' : '#000',
                  }}>
                  {store.data.status === null ? '' : store.data.status.time}
                </Text>
              </View>
            </View>
          </View>
        )}

        {Show ? (
          <TouchableOpacity style={styles.ButtonAdd} onPress={() => SetStatus()}>
            <Text style={styles.ButtonText}>{StatusPageStrings.Save}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.AddButton} onPress={() => setShow(true)}>
            <Text style={styles.AddButtonText}>{StatusPageStrings.New}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default inject('store')(observer(Status))
