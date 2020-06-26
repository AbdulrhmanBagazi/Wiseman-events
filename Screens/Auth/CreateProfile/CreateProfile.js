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

function CreateProfile({ store }) {
  const { Notification } = React.useContext(AuthContext)
  const [countryCode, setCountryCode] = React.useState('SA')
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
    Nationality: 'Saudi Arabia',
    City: ProfileStrings.City,
    Location: '',
    Birth: '',
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
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(true)
    setDateValue(currentDate)
    setData({
      ...data,
      Birth: currentDate.toString(),
    })
  }

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

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 50}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
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

            <View style={styles.inputNat} onPress={showDatepickerIOS}>
              <Text style={styles.inputDateText}>{ProfileStrings.Nationality} </Text>
              <CountryUI style={styles.input} onSelect={(val) => onSelect(val)} countryCode={countryCode} />
            </View>

            <TouchableOpacity style={styles.inputDate} onPress={showDatepickerIOS}>
              {date ? (
                <Text>{data.Birth}</Text>
              ) : (
                <Text style={styles.inputDateText}>{ProfileStrings.Birth}</Text>
              )}
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default inject('store')(observer(CreateProfile))
