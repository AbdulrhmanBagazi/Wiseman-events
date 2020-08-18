import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Image,
  ActivityIndicator,
  Keyboard,
  I18nManager,
  StyleSheet,
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
import MapUI from './map'
import { width, height } from '../../../Config/Layout'
import RNPickerSelect from 'react-native-picker-select'
import { SecondaryText, PrimaryColor } from '../../../Config/ColorPalette'

const ASPECT_RATIO = width / height

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    // marginBottom: 10,
    padding: 5,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '#000',
  },
  viewContainer: {
    backgroundColor: '#fff',
    height: 45,
    width,
    borderColor: SecondaryText,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    // padding: 5,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    justifyContent: 'center',
  },
  inputAndroid: {
    color: '#000',
  },
})

const Stat = I18nManager.isRTL
  ? [
      { label: 'مبتدئ', value: 'Beginner' },
      { label: 'متوسط', value: 'Intermediate' },
      { label: 'فصيح', value: 'Fluent' },
    ]
  : [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Fluent', value: 'Fluent' },
    ]

//beginner, intermediate,  fluent

function CreateProfile({ store }) {
  const { Notification } = React.useContext(AuthContext)
  const [countryCode, setCountryCode] = React.useState('')
  const [country, setCountry] = React.useState('null')
  const [show, setShow] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(' ')
  const [isShowMap, setShowMap] = React.useState(false)
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
    English: '',
    Latitude: '',
    Longitude: '',
  })
  const [CityDataEn, setCityDataEn] = React.useState('')
  //Map
  const [isSelectMapValue, setSelectMapValue] = React.useState(false)
  const [region, setregion] = React.useState({
    latitude: 24.774265,
    longitude: 46.738586,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922 * ASPECT_RATIO,
  })
  const [Cord, setCord] = React.useState({
    latitude: 24.774265,
    longitude: 46.738586,
  })
  const onDragMapPress = (e) => {
    setCord({
      latitude: e.latitude,
      longitude: e.longitude,
    })
    setData({
      ...data,
      Latitude: e.latitude,
      Longitude: e.longitude,
    })
    setregion({
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: e.latitudeDelta,
      longitudeDelta: e.longitudeDelta,
    })
  }
  const DoneButton = () => {
    setSelectMapValue(true)
    setShowMap(false)
    return
  }
  //

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
      data.Birth.length < 1 ||
      Gender.length < 1 ||
      data.English.length < 1 ||
      isSelectMapValue === false
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
          city: CityDataEn,
          location: data.Latitude + ',' + data.Longitude,
          english: data.English,
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
  // var year = await moment(currentDate).format('YYYY')
  // var month = await moment(currentDate).format('M')
  // var day = await moment(currentDate).format('D')
  // getAge(new Date(year, month, day))
  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date
    var MomentDate = await moment(currentDate).format('YYYY-MM-DD')

    if (Platform.OS === 'ios') {
      setShow(Platform.OS === 'ios')
      setDate(true)
      setDateValue(currentDate)
      setData({
        ...data,
        Birth: MomentDate.toString(),
        BirthText: MomentDate.toString(),
      })
    } else {
      if (event.type === 'dismissed') {
        setShow(false)
        setShowModal(false)
      } else if (event.type === 'set') {
        setShow(false)
        setShowModal(false)
        setShow(Platform.OS === 'ios')
        setDate(true)
        setDateValue(currentDate)
        setData({
          ...data,
          Birth: MomentDate.toString(),
          BirthText: MomentDate.toString(),
        })
      }
    }

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

  const ClosePicker = async () => {
    const currentDate = DateValue
    var MomentDate = await moment(currentDate).format('YYYY-MM-DD')
    setShow(false)
    setShowModal(false)
    setDate(true)
    setDateValue(currentDate)
    setData({
      ...data,
      Birth: MomentDate.toString(),
      BirthText: MomentDate.toString(),
    })
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
    // await setData({
    //   ...data,
    //   City: ProfileStrings.City,
    // })
    if (I18nManager.isRTL) {
      setData({
        ...data,
        City: city.name_ar,
      })
      setCityDataEn(city.name_en)
    } else {
      setData({
        ...data,
        City: city.name_en,
      })
      setCityDataEn(city.name_en)
    }
  }

  // React.useEffect(() => {
  //   console.log(store.data)
  // })

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
            value={DateValue}
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
              <Text style={{ fontSize: 16 }}>{I18nManager.isRTL ? item.name_ar : item.name_en}</Text>
            </TouchableOpacity>
          )}
        />

        {/* <TextInput
          style={styles.input}
          placeholder={ProfileStrings.location}
          onChangeText={(text) =>
            setData({
              ...data,
              Location: text.trim(),
            })
          }
        /> */}

        <TouchableOpacity style={styles.inputDate} onPress={() => setShowMap(true)}>
          <Text>{isSelectMapValue ? ProfileStrings.locationset : ProfileStrings.location}</Text>
          <Feather name="map" size={24} color={isSelectMapValue ? PrimaryColor : '#000'} />
        </TouchableOpacity>

        <RNPickerSelect
          onValueChange={(text) =>
            setData({
              ...data,
              English: text,
            })
          }
          style={{
            ...pickerSelectStyles,
          }}
          placeholder={{
            label: I18nManager.isRTL ? 'حدد مستواك في اللغة الإنجليزية' : 'Select your english level',
            value: '',
          }}
          items={Stat}
          Icon={() => null}
        />

        <TouchableOpacity style={styles.Button} onPress={debounce(() => HandleCreateProfile(), 250)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
          )}
        </TouchableOpacity>
      </View>

      <MapUI
        onRegionChange={(e) => onDragMapPress(e)}
        region={region}
        coordinate={Cord}
        MapmodalVisible={isShowMap}
        Close={() => setShowMap(false)}
        DoneButton={() => DoneButton()}
      />

      <View style={{ height: 25 }}></View>
    </KeyboardAwareScrollView>
  )
}

export default inject('store')(observer(CreateProfile))
