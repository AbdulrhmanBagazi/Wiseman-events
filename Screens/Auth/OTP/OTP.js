import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { OTPStrings, ErrorsStrings } from '../../../Config/Strings'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { width } from '../../../Config/Layout'
import { PrimaryColor } from '../../../Config/ColorPalette'
import { AuthContext } from '../../../Hooks/Context'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import CountDown from 'react-native-countdown-component'
import debounce from 'lodash/debounce'

function OTP({ store }) {
  const { Profile } = React.useContext(AuthContext)
  const [isResend, setResend] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  const [isLoading, setLoading] = React.useState(false)
  const [isShow, setShow] = React.useState(false)

  const VeridyCode = async (code) => {
    await Keyboard.dismiss()
    if (isLoading) {
      return
    }
    setLoading(true)
    axios
      .post(
        URL + '/user/VerifyOTP',
        {
          code: code,
        },
        {
          headers: { Authorization: store.token },
        }
      )
      .then((response) => {
        if (response.data === 'success') {
          Profile()
          return
        } else {
          setError(ErrorsStrings.WrongCode)
          setLoading(false)
          return
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.WrongCodeCheck)
        setLoading(false)
        return
      })
  }

  React.useEffect(() => {
    if (isLoading) {
      return
    }
    if (isShow) {
      return
    }
    axios
      .get(URL + '/user/SendOTP', {
        headers: {
          Authorization: store.token,
        },
      })
      .then((response) => {
        if (response.data === 'success') {
          setShow(true)
          return
        } else {
          setError(ErrorsStrings.OTPCode)
          setShow(true)
          return
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.OTPCode)
        setShow(true)
        return
      })
    return
  }, [isResend])

  const ChangeState = async () => {
    setTimeout(() => {
      setShow(false)
    }, 1500)

    return
  }

  return (
    <View style={styles.container}>
      <View style={styles.Logo} />
      <Text style={styles.Title}>{OTPStrings.Title}</Text>
      <Text style={styles.Slogan}>{OTPStrings.Slogan}</Text>

      <Text style={styles.error}>{isError}</Text>

      <View>
        <OTPInputView
          pinCount={4}
          style={{ width: width / 1.5, height: 100 }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          autoFocusOnLoad={false}
          onCodeFilled={(code) => {
            VeridyCode(code)
          }}
        />
      </View>

      {isShow ? (
        isLoading ? (
          <ActivityIndicator size="small" color={PrimaryColor} />
        ) : (
          <CountDown
            until={30}
            digitStyle={{ backgroundColor: 'transparent' }}
            digitTxtStyle={{ color: '#AF0029' }}
            onFinish={() => ChangeState()}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            size={20}
          />
        )
      ) : (
        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(() => setResend(isResend ? false : true), 200)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{OTPStrings.Resend}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default inject('store')(observer(OTP))
