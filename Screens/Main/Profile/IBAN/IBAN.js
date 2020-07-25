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
} from 'react-native'
import styles from './Style'
import { IBANPageStrings } from '../../../../Config/Strings'
import { inject, observer } from 'mobx-react'
import { URL } from '../../../../Config/Config'
import axios from 'axios'
import { PrimaryColor } from '../../../../Config/ColorPalette'
import { width } from '../../../../Config/Layout'

function IBAN({ store }) {
  const [one] = React.useState(new Animated.Value(0))
  const [two] = React.useState(new Animated.Value(0))
  const [Match] = React.useState(new Animated.Value(0))
  const [Show, setShow] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

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
      AcountName: val.trim(),
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
      }).start()
    } else {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
      }).start()
    }
  }

  const Add = async () => {
    if (Data.IBAN.length < 24 || Data.IBAN.length > 24) {
      Animated.timing(one, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(one, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (Data.IBAN !== Data.ReIBAN) {
      Animated.timing(one, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(one, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (Data.AcountName.length < 1) {
      Animated.timing(two, {
        toValue: 100,
        duration: 500,
      }).start()
    } else {
      Animated.timing(two, {
        toValue: 0,
        duration: 500,
      }).start()
    }

    if (Data.IBAN.length === 24 && Data.AcountName.length > 1 && Data.IBAN === Data.ReIBAN) {
      setLoading(true)
      axios
        .post(
          URL + '/user/AddIBAN',
          {
            IBAN: Data.IBAN,
            AccountName: Data.AcountName,
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

          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          )

          return
        })

      return
    }
  }

  React.useEffect(() => {
    if (store.data.iban !== null) {
      setData({
        IBAN: store.data.iban.IBAN,
        AcountName: store.data.iban.AccountName,
      })
    }
  }, [])

  // console.log(store.data)

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
              }}>
              <TextInput
                placeholder={IBANPageStrings.IBAN}
                style={styles.input}
                onChangeText={(text) => IBAMInput(text)}
                value={Data.IBAN}
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
              }}>
              <TextInput
                contextMenuHidden={true}
                placeholder={IBANPageStrings.RepeatIBAN}
                style={styles.input}
                onChangeText={(text) => ReIBANInput(text)}
                value={Data.ReIBAN}
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
                style={styles.input}
                onChangeText={(text) => AcountNameInput(text)}
                value={Data.AcountName}
              />
            </Animated.View>

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
            }}>
            <TextInput
              placeholder={IBANPageStrings.IBAN}
              style={styles.input}
              onChangeText={(text) => IBAMInput(text)}
              value={Data.IBAN}
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
            }}>
            <TextInput
              contextMenuHidden={true}
              placeholder={IBANPageStrings.RepeatIBAN}
              style={styles.input}
              onChangeText={(text) => ReIBANInput(text)}
              value={Data.ReIBAN}
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
              style={styles.input}
              onChangeText={(text) => AcountNameInput(text)}
              value={Data.AcountName}
            />
          </Animated.View>

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
