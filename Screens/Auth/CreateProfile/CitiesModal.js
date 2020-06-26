import React from 'react'
import { View, Modal, TouchableOpacity, Text, SafeAreaView, TextInput, FlatList } from 'react-native'
import styles from './Style'
import { ProfileStrings } from '../../../Config/Strings'
import Profile from '../../Main/Profile/ProfileScreen'

export default function CitiesModal(props) {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isDATA, setData] = React.useState(false)

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ]

  React.useEffect(() => {
    setData(DATA)
    if (modalVisible) {
      setModalVisible(!modalVisible)
    }
  }, [props.CityValue])

  const onChangeText = async (text) => {
    var trim = await text.trim()

    const newData = DATA.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`
      const textData = trim.toUpperCase()

      return itemData.indexOf(textData) > -1
    })

    setData(newData)

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
              keyExtractor={(item) => item.id}
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
          <Text style={styles.inputDateText}>{ProfileStrings.City}</Text>
        ) : (
          <Text>{props.CityValue}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
