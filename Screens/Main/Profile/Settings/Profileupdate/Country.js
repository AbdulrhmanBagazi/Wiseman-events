import React, { useState } from 'react'
import { TouchableOpacity, View, I18nManager } from 'react-native'
import { ProfileStrings } from '../../../../../Config/Strings'
import { Entypo } from '@expo/vector-icons'
import CountryPicker, { FlagButton, CountryFilter } from 'react-native-country-picker-modal'
import { width, height } from '../../../../../Config/Layout'

export default function CountryUI(props) {
  const [isvisible, setvisible] = useState(false)

  const OpenClose = async (val) => {
    setvisible(val)
  }

  return (
    <CountryPicker
      placeholder={ProfileStrings.Nationality}
      onClose={() => OpenClose(false)}
      theme={{
        fontSize: 14,
      }}
      withEmoji
      withAlphaFilter
      translation={I18nManager.isRTL ? 'ara' : 'common'}
      visible={isvisible}
      renderFlagButton={(flagData) => (
        <TouchableOpacity style={props.style} onPress={() => OpenClose(true)} activeOpacity={0.7}>
          <View style={{ flex: 1 }}>
            <FlagButton
              {...flagData}
              placeholder={I18nManager.isRTL ? 'اختر جنسية' : 'Select a nationality'}
            />
          </View>
          <Entypo name="chevron-down" size={24} />
        </TouchableOpacity>
      )}
      renderCountryFilter={(modalData) => (
        <CountryFilter
          style={{
            textAlign: 'right',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            flex: 0.9,
            padding: 5,
          }}
          {...modalData}
          placeholder={I18nManager.isRTL ? 'بحث' : 'Search'}
        />
      )}
      withCountryNameButton
      withFilter
      excludeCountries={['IR', 'IL', 'EH']}
      countryCode={props.countryCode}
      onSelect={props.onSelect}
    />
  )
}
