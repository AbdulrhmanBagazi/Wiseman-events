import React from 'react'
import { View, Modal, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native'
import styles from './Style'
import { ProfileStrings } from '../../../Config/Strings'

export default function CitiesModal(props) {
  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <SafeAreaView style={styles.CitiesView}>
          <ScrollView style={styles.CitiesModalView}>
            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <Text style={styles.textStyle}> X</Text>
            </TouchableOpacity>
          </ScrollView>
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
