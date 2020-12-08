import React from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  I18nManager,
  TextInput,
  Alert,
  Modal,
  Animated,
  StyleSheet,
} from 'react-native'
import styles from './Style'
import { IBANPageStrings } from '../../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { URL } from '../../../../Config/Config'
import axios from 'axios'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { width } from '../../../../Config/Layout'
//
import { AuthContext } from '../../../../Hooks/Context'
import { UserTokenRemove } from '../../../../Config/AsyncStorage'
import RNPickerSelect from 'react-native-picker-select'

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    height: 45,
    width: width - 20,
    borderColor: '#4C4F56',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    // marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  viewContainer: {
    backgroundColor: '#fff',
    height: 45,
    width: width - 20,
    borderColor: '#4C4F56',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputAndroid: {
    color: '#000',
    textAlign: 'center',
  },
})

function IBAN({ store }) {
  const [one] = React.useState(new Animated.Value(0))
  const [two] = React.useState(new Animated.Value(0))
  const [Match] = React.useState(new Animated.Value(0))
  const [Show, setShow] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  //
  const { signOut } = React.useContext(AuthContext)

  const MatchColor = Match.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })
  const IBANColor = one.interpolate({
    inputRange: [0, 100],
    outputRange: ['#4C4F56', '#E8505B'],
  })

  const NameColor = two.interpolate({
    inputRange: [0, 100],
    outputRange: ['#4C4F56', '#E8505B'],
  })

  const [Data, setData] = React.useState({
    IBAN: '',
    ReIBAN: '',
    AcountName: '',
    Bank: '',
  })

  const IBAMInput = (val) => {
    setData({
      ...Data,
      IBAN: val.trim(),
    })
  }

  const AcountNameInput = (val) => {
    setData({
      ...Data,
      AcountName: val,
    })
  }

  const ReIBANInput = (val) => {
    setData({
      ...Data,
      ReIBAN: val.trim(),
    })
    if (Data.IBAN === val) {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  }

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632
    })
  }

  const Add = async () => {
    if (Data.IBAN.length < 22 || Data.IBAN.length > 22) {
      Animated.timing(one, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(one, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }

    if (Data.IBAN !== Data.ReIBAN) {
      Animated.timing(one, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(one, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }

    if (Data.AcountName.length < 1) {
      Animated.timing(two, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(two, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }

    if (
      Data.IBAN.length === 22 &&
      Data.AcountName.length > 1 &&
      Data.IBAN === Data.ReIBAN &&
      Data.Bank.length > 1
    ) {
      setLoading(true)

      var IBANen = await convertToArabicNumber(Data.IBAN)
      axios
        .post(
          URL + '/user/AddIBAN',
          {
            IBAN: 'SA' + IBANen,
            AccountName: Data.AcountName,
            Bank: Data.Bank,
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
              store.data.iban = response.data.iban
              setTimeout(() => {
                setLoading(false)
                setShow(false)
                setData({
                  ...Data,
                  ReIBAN: '',
                })
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

  React.useEffect(() => {
    if (store.data.iban !== null) {
      setData({
        IBAN: store.data.iban.IBAN.substring(2),
        AcountName: store.data.iban.AccountName,
        Bank: store.data.iban.Bank,
      })
    }
  }, [])

  // console.log(store.data)

  const getArabic = (status) => {
    switch (status) {
      case 'The National Commercial Bank':
        return 'البنك الأهلي التجاري'
      case 'The Saudi British Bank (SABB)':
        return 'بنك ساب'
      case 'Saudi Investment Bank':
        return 'البنك السعودي للاستثمار'
      case 'Alinma bank':
        return 'مصرف الإنماء'
      case 'Banque Saudi Fransi':
        return 'البنك السعودي الفرنسي'
      case 'Riyad Bank':
        return 'بنك الرياض'
      case 'Samba Financial Group (Samba)':
        return 'مجموعة سامبا المالية (سامبا)'
      case 'Alawwal bank':
        return 'البنك الأول'
      case 'Al Rajhi Bank':
        return 'مصرف الراجحي'
      case 'Arab National Bank':
        return 'البنك العربي الوطني'
      case 'Bank AlBilad':
        return 'بنك البلاد'
      case 'Bank AlJazira':
        return 'بنك الجزيرة'
      case 'Gulf International Bank Saudi Arabia (GIB-SA)':
        return 'بنك الخليج الدولي'
      default:
        return ''
    }
  }

  const Banks = I18nManager.isRTL
    ? [
        { label: 'البنك الأهلي التجاري', value: 'The National Commercial Bank' },
        { label: 'بنك ساب', value: 'The Saudi British Bank (SABB)' },
        { label: 'البنك السعودي للاستثمار', value: 'Saudi Investment Bank' },
        { label: 'مصرف الإنماء', value: 'Alinma bank' },
        { label: 'البنك السعودي الفرنسي', value: 'Banque Saudi Fransi' },
        { label: 'بنك الرياض', value: 'Riyad Bank' },
        { label: 'مجموعة سامبا المالية (سامبا)', value: 'Samba Financial Group (Samba)' },
        { label: 'البنك الأول', value: 'Alawwal bank' },
        { label: 'مصرف الراجحي', value: 'Al Rajhi Bank' },
        { label: 'البنك العربي الوطني', value: 'Arab National Bank' },
        { label: 'بنك البلاد', value: 'Bank AlBilad' },
        { label: 'بنك الجزيرة', value: 'Bank AlJazira' },
        { label: 'بنك الخليج الدولي', value: 'Gulf International Bank Saudi Arabia (GIB-SA)' },
      ]
    : [
        { label: 'The National Commercial Bank', value: 'The National Commercial Bank' },
        { label: 'The Saudi British Bank (SABB)', value: 'The Saudi British Bank (SABB)' },
        { label: 'Saudi Investment Bank', value: 'Saudi Investment Bank' },
        { label: 'Alinma bank', value: 'Alinma bank' },
        { label: 'Banque Saudi Fransi', value: 'Banque Saudi Fransi' },
        { label: 'Riyad Bank', value: 'Riyad Bank' },
        { label: 'Samba Financial Group (Samba)', value: 'Samba Financial Group (Samba)' },
        { label: 'Alawwal bank', value: 'Alawwal bank' },
        { label: 'Al Rajhi Bank', value: 'Al Rajhi Bank' },
        { label: 'Arab National Bank', value: 'Arab National Bank' },
        { label: 'Bank AlBilad', value: 'Bank AlBilad' },
        { label: 'Bank AlJazira', value: 'Bank AlJazira' },
        {
          label: 'Gulf International Bank Saudi Arabia (GIB-SA)',
          value: 'Gulf International Bank Saudi Arabia (GIB-SA)',
        },
      ]

  return (
    <ScrollView>
      {store.data.iban === null ? (
        !Show ? (
          <View style={styles.Container}>
            <Text style={styles.Title}>{IBANPageStrings.Title}</Text>
            <Text style={styles.About}>{IBANPageStrings.About}</Text>
            <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
              <Text style={styles.ButtonText}>{IBANPageStrings.Button}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.Container}>
            <Text style={styles.TitleAdd}>{IBANPageStrings.Title}</Text>

            <Animated.View
              style={{
                backgroundColor: '#fff',
                height: 45,
                width: width - 20,
                borderColor: IBANColor,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>SA</Text>
              </View>
              <TextInput
                placeholder={IBANPageStrings.IBAN}
                style={styles.input}
                onChangeText={(text) => IBAMInput(text)}
                value={Data.IBAN}
                keyboardType={'number-pad'}
              />
            </Animated.View>

            <Animated.View
              style={{
                backgroundColor: '#fff',
                height: 45,
                width: width - 20,
                borderColor: IBANColor,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>SA</Text>
              </View>
              <TextInput
                contextMenuHidden={true}
                placeholder={IBANPageStrings.RepeatIBAN}
                style={styles.input}
                onChangeText={(text) => ReIBANInput(text)}
                value={Data.ReIBAN}
                keyboardType={'number-pad'}
              />
            </Animated.View>
            <View style={styles.CheckMatch}>
              <Animated.Text style={{ color: MatchColor }}>{IBANPageStrings.Match}</Animated.Text>
            </View>

            <Animated.View
              style={{
                backgroundColor: '#fff',
                height: 45,
                width: width - 20,
                borderColor: NameColor,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                placeholder={IBANPageStrings.AccountName}
                style={styles.inputName}
                onChangeText={(text) => AcountNameInput(text)}
                value={Data.AcountName}
              />
            </Animated.View>

            <RNPickerSelect
              onValueChange={(text) =>
                setData({
                  ...Data,
                  Bank: text,
                })
              }
              style={{
                ...pickerSelectStyles,
              }}
              placeholder={{
                label: I18nManager.isRTL ? 'البنك' : 'Bank',
                value: '',
              }}
              items={Banks}
              Icon={() => null}
              value={Data.Bank}
            />

            <TouchableOpacity style={styles.ButtonAdd} onPress={() => Add()}>
              <Text style={styles.ButtonText}>{IBANPageStrings.Save}</Text>
            </TouchableOpacity>
          </View>
        )
      ) : Show ? (
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width,
              marginTop: 40,
            }}>
            <Text style={styles.TitleTwo}>{IBANPageStrings.Title}</Text>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => setShow(false)}>
              <Text style={styles.Cancel}>{IBANPageStrings.Cancel}</Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={{
              backgroundColor: '#fff',
              height: 45,
              width: width - 20,
              borderColor: IBANColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              marginBottom: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>SA</Text>
            </View>
            <TextInput
              placeholder={IBANPageStrings.IBAN}
              style={styles.input}
              onChangeText={(text) => IBAMInput(text)}
              value={Data.IBAN}
              keyboardType={'number-pad'}
            />
          </Animated.View>
          <Animated.View
            style={{
              backgroundColor: '#fff',
              height: 45,
              width: width - 20,
              borderColor: IBANColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              marginBottom: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>SA</Text>
            </View>
            <TextInput
              contextMenuHidden={true}
              placeholder={IBANPageStrings.RepeatIBAN}
              style={styles.input}
              onChangeText={(text) => ReIBANInput(text)}
              value={Data.ReIBAN}
              keyboardType={'number-pad'}
            />
          </Animated.View>
          <View style={styles.CheckMatch}>
            <Animated.Text style={{ color: MatchColor }}>{IBANPageStrings.Match}</Animated.Text>
          </View>

          <Animated.View
            style={{
              backgroundColor: '#fff',
              height: 45,
              width: width - 20,
              borderColor: NameColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              marginBottom: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder={IBANPageStrings.AccountName}
              style={styles.inputName}
              onChangeText={(text) => AcountNameInput(text)}
              value={Data.AcountName}
            />
          </Animated.View>

          <RNPickerSelect
            onValueChange={(text) =>
              setData({
                ...Data,
                Bank: text,
              })
            }
            style={{
              ...pickerSelectStyles,
            }}
            placeholder={{
              label: I18nManager.isRTL ? 'البنك' : 'Bank',
              value: '',
            }}
            items={Banks}
            Icon={() => null}
            value={Data.Bank}
          />

          <TouchableOpacity style={styles.ButtonAdd} onPress={() => Add()}>
            <Text style={styles.ButtonText}>{IBANPageStrings.Save}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.Container}>
          <Text style={styles.Title}>{IBANPageStrings.Title}</Text>

          <View style={styles.View}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ViewText}>{I18nManager.isRTL ? 'الآيبان' : 'IBAN'}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>{store.data.iban.IBAN}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={styles.ViewText}>{I18nManager.isRTL ? 'الإسم' : 'Name'}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>{store.data.iban.AccountName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={styles.ViewText}>{I18nManager.isRTL ? 'البنك' : 'Bank'}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>
                {I18nManager.isRTL ? getArabic(store.data.iban.Bank) : store.data.iban.Bank}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.AddButton} onPress={() => setShow(true)}>
            <Text style={styles.AddButtonText}>{IBANPageStrings.New}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default inject('store')(observer(IBAN))
