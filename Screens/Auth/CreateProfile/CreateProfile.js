import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Image,
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
} from 'react-native'
import styles from './Style'
import { ProfileStrings, ErrorsStrings } from '../../../Config/Strings'
import DateTimePicker from '@react-native-community/datetimepicker'
import AnimatedButton from './AnimatedButton'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { URL } from '../../../Config/Config'
import CountryUI from './Country'
import CitiesModal from './CitiesModal'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

function CreateProfile({ store }) {
  const { Notification } = React.useContext(AuthContext)
  const [countryCode, setCountryCode] = React.useState('')
  const [country, setCountry] = React.useState('null')
  const [show, setShow] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  //values
  const [Gender, setGender] = React.useState('')
  const [date, setDate] = React.useState(false)
  const [DateValue, setDateValue] = React.useState(new Date())
  const [data, setData] = React.useState({
    Fullname: '',
    Nationality: '',
    City: ProfileStrings.City,
    Location: '',
    Birth: '',
    BirthText: '',
  })

  const HandleCreateProfile = async () => {
    await Keyboard.dismiss()
    setError(' ')
    if (isLoading) {
      return
    }
    if (
      data.Fullname.length < 1 ||
      data.Nationality.length < 1 ||
      data.City.length < 1 ||
      data.Location.length < 1 ||
      data.Birth.length < 1 ||
      Gender.length < 1
    ) {
      setError(ErrorsStrings.Required)
      return
    }
    setLoading(true)
    axios
      .post(
        URL + '/user/createprofile',
        {
          name: data.Fullname,
          nationality: data.Nationality,
          birthdate: data.Birth,
          gender: Gender,
          city: data.City,
          location: data.Location,
          userId: store.data.id,
        },
        {
          headers: { Authorization: store.token },
        }
      )
      .then((response) => {
        if (response.data === 'success') {
          Notification()
          return
        }
        if (response.data === 'exists') {
          Notification()
          return
        } else {
          setError(ErrorsStrings.ErrorOccurred)
          setLoading(false)
          return
        }
      })
      .catch((error) => {
        setError(ErrorsStrings.ErrorOccurred)
        setLoading(false)
        return
      })
  }

  //modal date picker
  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date

    // var year = await moment(currentDate).format('YYYY')
    // var month = await moment(currentDate).format('M')
    // var day = await moment(currentDate).format('D')
    // getAge(new Date(year, month, day))

    var MomentDate = await moment(currentDate).format('YYYY/MM/DD')

    setShow(Platform.OS === 'ios')
    setDate(true)
    setDateValue(currentDate)
    setData({
      ...data,
      Birth: currentDate.toString(),
      BirthText: MomentDate.toString(),
    })

    return
  }

  // const getAge = async (d1) => {
  //   var d2 = new Date()
  //   var diff = d2.getTime() - d1.getTime()
  //   var x = await Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
  //   console.log(x)

  //   return
  // }

  const showDatepickerIOS = () => {
    if (Platform.OS === 'ios') {
      setShow(true)
      setShowModal(true)
    } else {
      setShow(true)
      setShowModal(false)
    }
  }

  const ClosePicker = () => {
    setShow(false)
    setShowModal(false)
  }

  //Country
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setData({
      ...data,
      Nationality: country.name,
    })
  }
  //City
  const onSelectCity = async (city) => {
    await setData({
      ...data,
      City: ProfileStrings.City,
    })
    setData({
      ...data,
      City: city.title,
    })
  }

  // React.useEffect(() => {
  //   console.log(store.data)
  // })

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.Logo}>
          <Image style={styles.tinyLogo} source={require('../../../assets/profileinformation.png')} />
        </View>
        <Text style={styles.Title}>{ProfileStrings.Title}</Text>

        <Text style={styles.error}>{isError}</Text>

        <TextInput
          style={styles.input}
          placeholder={ProfileStrings.Full}
          onChangeText={(text) =>
            setData({
              ...data,
              Fullname: text.trim(),
            })
          }
        />

        <CountryUI style={styles.country} onSelect={(val) => onSelect(val)} countryCode={countryCode} />

        <TouchableOpacity style={styles.inputDate} onPress={showDatepickerIOS}>
          {date ? (
            <Text>{data.BirthText}</Text>
          ) : (
            <Text style={styles.inputDateText}>{ProfileStrings.Birth}</Text>
          )}
          <Feather name="calendar" size={24} color="#4C4F56" />
        </TouchableOpacity>

        {!showModal && show === true ? (
          <DateTimePicker
            style={styles.picker}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        ) : show === true ? (
          <Modal animationType="fade" transparent={true} visible={show}>
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
                <DateTimePicker
                  style={styles.picker}
                  testID="dateTimePicker"
                  value={DateValue}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />

                <TouchableOpacity style={styles.ModalButton} onPress={() => ClosePicker()}>
                  <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}

        <AnimatedButton
          GenderValue={Gender}
          Male={ProfileStrings.Male}
          Female={ProfileStrings.Female}
          onPressMale={() => setGender('male')}
          onPressFemale={() => setGender('female')}
        />
        {/* <TextInput
              style={styles.input}
              placeholder={ProfileStrings.City}
              onChangeText={(text) =>
                setData({
                  ...data,
                  City: text.trim(),
                })
              }
            /> */}

        <CitiesModal
          CityValue={data.City}
          ViewCity={({ item }) => (
            <TouchableOpacity
              style={styles.citiesFlatlistItems}
              Value={item}
              onPress={() => onSelectCity(item)}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <TextInput
          style={styles.input}
          placeholder={ProfileStrings.location}
          onChangeText={(text) =>
            setData({
              ...data,
              Location: text.trim(),
            })
          }
        />

        <TouchableOpacity style={styles.Button} onPress={debounce(() => HandleCreateProfile(), 250)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default inject('store')(observer(CreateProfile))
