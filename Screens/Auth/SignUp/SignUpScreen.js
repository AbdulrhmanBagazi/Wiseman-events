import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  I18nManager,
} from 'react-native'
import styles from './Style'
import { Register, ErrorsStrings } from '../../../Config/Strings'
import Inputpassowrd from '../../Components/PasswordInput/Password'
import InputPhone from '../../Components/PhoneInput/Phone'
import { AuthContext } from '../../../Hooks/Context'
import { URL } from '../../../Config/Config'
import axios from 'axios'
import store from '../../../Config/Mobx'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Entypo } from '@expo/vector-icons'
import { PrimaryColor } from '../../../Config/ColorPalette'

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext)
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  //
  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
  })
  const [isCheck, setCheck] = React.useState('')
  const [isPhoneCheck, setPhoneCheck] = React.useState('')
  const [isAgreeCheck, setAgreeCheck] = React.useState(false)
  const [Agree] = React.useState(new Animated.Value(0))
  const [AgreeText] = React.useState(new Animated.Value(0))
  const AgreeColor = Agree.interpolate({
    inputRange: [0, 100],
    outputRange: ['#F8F8F9', PrimaryColor],
  })
  const AgreeColorText = AgreeText.interpolate({
    inputRange: [0, 100],
    outputRange: ['#E8505B', '#25AC71'],
  })

  const AgreeHandler = async () => {
    Animated.parallel([
      Animated.timing(Agree, {
        toValue: !isAgreeCheck === false ? 0 : 100,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(AgreeText, {
        toValue: !isAgreeCheck === false ? 0 : 100,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start()

    if (isAgreeCheck === true) {
      setAgreeCheck(false)
    } else {
      setAgreeCheck(true)
    }

    return
  }

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632
    })
  }

  const PhoneInput = async (val) => {
    var phone = await convertToArabicNumber(val)
    setData({
      ...data,
      Phone: phone.trim(),
    })
    if (phone === '') {
      setPhoneCheck('')
      return
    }
    if (isNaN(phone) === true && phone.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (phone.length > 10 || phone.length < 10) {
      setPhoneCheck('Error')
      return
    }
    if (isNaN(phone) === false && phone.length === 10) {
      setPhoneCheck('Success')
      return
    }
    return
  }
  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
    if (val === '') {
      setCheck('')
    } else if (data.RePassword === val) {
      setCheck('Success')
    } else {
      setCheck('Error')
    }
    return
  }
  const RePasswordInput = (val) => {
    setData({
      ...data,
      RePassword: val,
    })
    if (val === '') {
      setCheck('')
    }
    if (data.Password === val) {
      setCheck('Success')
    } else {
      setCheck('Error')
    }
    return
  }

  //Aa123123
  const RegisterAccount = async (val) => {
    await Keyboard.dismiss()
    if (isLoading) {
      return
    }
    await setLoading(true)
    if (
      val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/) &&
      isCheck === 'Success' &&
      isPhoneCheck === 'Success' &&
      isAgreeCheck === true
    ) {
      axios
        .post(URL + '/user/signup', {
          phone: val.Phone,
          password: val.Password,
        })
        .then((response) => {
          if (response.data.error === 'exists') {
            // console.log(response.data.error)
            setError(ErrorsStrings.MobileUsed)
            setLoading(false)
            return
          } else if (response.status === 200) {
            setError(' ')
            store.setDataSignup(response.data.user)
            store.setToken(response.data.token)
            Verify()
            return
          }
        })
        .catch((error) => {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        })
      return
    }

    await setLoading(false)
    return
  }

  // React.useEffect(() => {
  //   if (isRegister) {
  //     Verify()

  //     return
  //   }

  //   return
  // }, [isRegister])

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.Logo} />
        <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

        <Text style={styles.error}>{isError}</Text>

        <InputPhone
          placeholder={Register.Phone}
          style={styles.input}
          onChangeText={(text) => PhoneInput(text)}
          keyboardType={'number-pad'}
          CheckPhone={isPhoneCheck}
        />

        <Inputpassowrd
          placeholderpassword={Register.Password}
          passwordstyle={styles.PasswordInput}
          change={(text) => PasswordInput(text)}
          placeholder={Register.RePassword}
          style={styles.PasswordInput}
          onChangeText={(text) => RePasswordInput(text)}
          MatchString={Register.Match}
          Check={isCheck}
          PasswordValue={data.Password}
        />

        <View style={styles.Terms}>
          <View>
            <TouchableOpacity onPress={() => AgreeHandler()}>
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  padding: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  // borderColor: AgreeColor,
                  backgroundColor: AgreeColor,
                  marginHorizontal: 5,
                }}>
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, textAlign: 'left' }}>
            <Text>{Register.Iagreeto}</Text>
            <TouchableOpacity>
              <Animated.Text style={{ color: AgreeColorText }}>{Register.Terms}</Animated.Text>
            </TouchableOpacity>
            <Text style={styles.and}> & </Text>
            <TouchableOpacity>
              <Animated.Text style={{ color: AgreeColorText }}>{Register.Privacy}</Animated.Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.Button} onPress={() => RegisterAccount(data)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{Register.Continue}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.Register}>
          <Text style={styles.Member}>{Register.HaveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.RegisterText}>{Register.Log}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SignUp
