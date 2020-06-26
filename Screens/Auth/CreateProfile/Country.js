import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

export default function CountryUI(props) {
  const [withCountryNameButton] = useState(true)
  const [withFlag] = useState(true)
  const [withEmoji] = useState(true)
  const [withFilter] = useState(true)
  const [withAlphaFilter] = useState(false)
  const [withCallingCode] = useState(false)
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }
  return (
    <View>
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
        visible={false}
        countryCode={props.countryCode}
        onSelect={props.onSelect}
        style={props.style}
      />
    </View>
  )
}
