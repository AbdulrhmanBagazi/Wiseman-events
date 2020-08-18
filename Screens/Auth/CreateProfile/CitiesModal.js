import React from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  I18nManager,
} from 'react-native'
import styles from './Style'
import { ProfileStrings } from '../../../Config/Strings'
import { Entypo } from '@expo/vector-icons'
import CitiesData from './cities.json'

export default function CitiesModal(props) {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isDATA, setData] = React.useState(false)

  const DATA = CitiesData

  React.useEffect(() => {
    setData(DATA)
    if (modalVisible) {
      setModalVisible(!modalVisible)
    }
  }, [props.CityValue])

  const onChangeText = async (text) => {
    var trim = await text.trim()

    if (I18nManager.isRTL) {
      const newData = DATA.filter((item) => {
        const itemData = `${item.name_ar.toUpperCase()}`
        const textData = trim.toUpperCase()

        return itemData.indexOf(textData) > -1
      })
      setData(newData)
    } else {
      const newData = DATA.filter((item) => {
        const itemData = `${item.name_en.toUpperCase()}`
        const textData = trim.toUpperCase()

        return itemData.indexOf(textData) > -1
      })
      setData(newData)
    }

    return
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <SafeAreaView style={styles.CitiesView}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                ...styles.openButton,
                width: 62,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
            <TextInput
              style={{ width: 48, width: '70%', fontSize: 16 }}
              placeholder={ProfileStrings.Search}
              onChangeText={(text) => onChangeText(text)}
            />
          </View>

          <View style={styles.CitiesModalView}>
            <FlatList
              keyboardShouldPersistTaps="always"
              data={isDATA}
              renderItem={props.ViewCity}
              keyExtractor={(item) => item.city_id.toString()}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.inputDate}
        onPress={() => {
          setModalVisible(true)
        }}>
        {ProfileStrings.City === props.CityValue ? (
          <Text>{ProfileStrings.City}</Text>
        ) : (
          <Text>{props.CityValue}</Text>
        )}
        <Entypo name="chevron-down" size={24} />
      </TouchableOpacity>
    </View>
  )
}
