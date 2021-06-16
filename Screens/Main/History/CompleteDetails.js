import React from 'react'
import { ScrollView, Text, View, I18nManager, Alert, ActivityIndicator } from 'react-native'
import styles from './Style'
import { CompleteDetailsStrings } from '../../../Config/Strings'
import moment from 'moment'
import CalHours from './Details/CalHours'
import CalSalary from './Details/CalSalay'
import CalHoursSuper from './Details/CalHoursSuper'
import { PrimaryColor } from '../../../Config/ColorPalette'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import { AuthContext } from '../../../Hooks/Context'
import { UserTokenRemove } from '../../../Config/AsyncStorage'
import { inject, observer } from 'mobx-react'
import Paymentdata from './Details/Paymentdata'

function CompleteDetails({ route, store }) {
  const { signOut } = React.useContext(AuthContext)
  const [Super, setSuper] = React.useState([])
  const [Organizer, setOrganizer] = React.useState([])
  const [isData, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)

  const { item } = route.params

  React.useEffect(() => {
    var data = item.attendances
    var newArrayO = data.filter((item) => {
      // console.log(item.attendances.length)
      return item.Type === 'organizer' && item.Status === 'completed'
    })

    var newArrayS = data.filter((item) => {
      // console.log(item.attendances.length)
      return item.Type === 'supervisor' && item.Status === 'completed'
    })
    setSuper(newArrayS)
    setOrganizer(newArrayO)

    axios
      .post(
        URL + '/user/Getusersinglepayment',
        {
          applicationId: item.id,
        },
        {
          headers: {
            Authorization: store.token,
            'Cache-Control': 'no-cache',
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.check === 'success') {
            setData(response.data.payments)
            setTimeout(() => {
              setLoading(false)
            }, 500)
            // console.log(response.data.payments)
            return
          } else if (response.data.check === 'fail') {
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
      .catch(async (error) => {
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
  }, [])

  //   values: ['pending', 'paid', 'not-paid'],

  const getColor = (status) => {
    switch (status) {
      case 'paid':
        return 'rgba(46, 184, 92, 0.25)'
      case 'pending':
        return 'rgba(249, 177, 21, 0.25)'
      case 'not-paid':
        return 'rgba(229, 83, 83, 0.25)'
      case 'partially-paid':
        return 'rgba(249, 177, 21, 0.25)'
    }
  }

  const getColorBorder = (status) => {
    switch (status) {
      case 'paid':
        return '#2eb85c'
      case 'wait-list':
        return '#321fdb'
      case 'pending':
        return '#f9b115'
      case 'inactive':
        return '#e55353'
      case 'declined':
        return '#e55353'
      case 'canceled':
        return '#e55353'
      case 'completed':
        return '#2eb85c'
      case 'terminated':
        return '#e55353'
      case 'withdrawal':
        return '#e55353'
    }
  }

  const getArabic = (status) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار'
      case 'bank':
        return 'تحويل'
      case 'cash':
        return 'نقد'
      case 'paid':
        return 'مدفوع'
      case 'not-paid':
        return 'غير مدفوع'
      case 'partially-paid':
        return 'مدفوعة جزئيا'
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <ScrollView style={styles.CompleteDetailsView}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <View style={styles.CompleteDetailsHeader}>
              <View style={styles.CompleteDetailsHeaderView}>
                <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Start}</Text>
                <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                  {moment(item.Start).format('D MMMM, YYYY')}
                </Text>
              </View>
              <View style={styles.CompleteDetailsHeaderView}>
                <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Ended}</Text>
                <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                  {moment(item.End).format('D MMMM, YYYY')}
                </Text>
              </View>
            </View>

            <View style={styles.CompleteDetailsHeaderHour}>
              {Organizer.length >= 1 ? (
                <View style={styles.CompleteDetailsHeaderViewSalary}>
                  <Text style={styles.CompleteDetailsHeaderViewText}>
                    {CompleteDetailsStrings.SalaryOrganizer}
                  </Text>
                  <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                    {item.event.Salary}
                    {I18nManager.isRTL ? 'ريال ' : ' SAR'}
                    <Text style={styles.CompleteDetailsHeaderViewText}>
                      /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
                    </Text>
                  </Text>
                </View>
              ) : null}

              {Super.length >= 1 ? (
                <View style={styles.CompleteDetailsHeaderViewSalary}>
                  <Text style={styles.CompleteDetailsHeaderViewText}>{CompleteDetailsStrings.Salary}</Text>
                  <Text style={styles.CompleteDetailsHeaderViewTextValue}>
                    {item.event.SalarySupervisor}
                    {I18nManager.isRTL ? 'ريال ' : ' SAR'}
                    <Text style={styles.CompleteDetailsHeaderViewText}>
                      /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
                    </Text>
                  </Text>
                </View>
              ) : null}
            </View>

            <View>
              <Text style={styles.CompleteDetailsbodyTitle}>{CompleteDetailsStrings.workHistory}</Text>
              <View style={styles.CompleteDetailsbodyContainer}>
                {Organizer.length >= 1 ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.Attended}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{Organizer.length}</Text>
                    </View>
                  </View>
                ) : null}

                {Super.length >= 1 ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.AttendedSuper}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataTextValue}>{Super.length}</Text>
                    </View>
                  </View>
                ) : null}

                {Organizer.length >= 1 ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.TotalhoursO}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <CalHours Values={item.attendances} />
                    </View>
                  </View>
                ) : null}

                {Super.length >= 1 ? (
                  <View style={styles.CompleteDetailsbodyContainerData}>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.CompleteDetailsbodyContainerDataText}>
                        {CompleteDetailsStrings.TotalhoursS}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <CalHoursSuper Values={item.attendances} />
                    </View>
                  </View>
                ) : null}

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Late}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} Late={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.absence}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} absence={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.incomplete}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} incomplete={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Totalearning}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <CalSalary
                      Values={item.attendances}
                      Rate={item}
                      Meal={item.event.ProvideAmeal}
                      MealPlus={item.event.ProvideAnAllowance}
                    />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Fees}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} Fees={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.deduction}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} deduction={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.bonus}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} bonus={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Received}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Paymentdata Values={isData} paid={true} />
                  </View>
                </View>

                <View style={styles.CompleteDetailsbodyContainerData}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.CompleteDetailsbodyContainerDataText}>
                      {CompleteDetailsStrings.Paymentstatus}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View
                      style={[
                        styles.CompleteDetailStatusBox,
                        {
                          backgroundColor: getColor(item.PaymentStatus),
                          borderColor: getColorBorder(item.PaymentStatus),
                        },
                      ]}>
                      <Text
                        style={[
                          styles.CompleteDetailsbodyContainerDataTextValue,
                          { color: getColorBorder(item.PaymentStatus) },
                        ]}>
                        {I18nManager.isRTL ? getArabic(item.PaymentStatus) : item.PaymentStatus}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.msg}>{CompleteDetailsStrings.msg}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default inject('store')(observer(CompleteDetails))
