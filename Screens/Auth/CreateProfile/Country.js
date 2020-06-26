import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { ProfileStrings } from '../../../Config/Strings'
import { width } from '../../../Config/Layout'
import { Entypo } from '@expo/vector-icons'

export default function CountryUI(props) {
  const [withCountryNameButton] = useState(true)
  const [withFlag] = useState(true)
  const [withEmoji] = useState(false)
  const [withFilter] = useState(true)
  const [withAlphaFilter] = useState(false)
  const [withCallingCode] = useState(false)
  const [isvisible, setvisible] = useState(false)
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    return
  }

  const OpenClose = async (val) => {
    setvisible(val)
  }

  return (
    <TouchableOpacity style={props.style} onPress={() => OpenClose(true)}>
      <View style={{ height: 40, width, position: 'absolute', zIndex: 99 }}></View>
      <CountryPicker
        {...{
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={isvisible}
        countryCode={props.countryCode}
        onSelect={props.onSelect}
        // containerButtonStyle={props.style}
        containerButtonStyle={{ marginBottom: 5 }}
        placeholder={ProfileStrings.Nationality}
        onClose={() => OpenClose(false)}
        theme={{
          fontSize: 14,
          // primaryColor: '#ccc',
          // onBackgroundTextColor: '#ccc',
          // primaryColorVariant: '#ccc',
        }}
      />
      <Entypo name="chevron-down" size={24} />
    </TouchableOpacity>
  )
}
