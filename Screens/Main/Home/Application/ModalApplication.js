import React from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import styles from './Style'
import { SingleJobStrings } from '../../../../Config/Strings'

function ModalApplication(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.ShowModal}>
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <Image style={styles.tinyLogo} source={require('../../../../assets/check.png')} />

          <Text style={styles.Title}>{SingleJobStrings.successful}</Text>
          <Text style={styles.Slogan}>{SingleJobStrings.submitted}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.ModalButton} onPress={props.onPress}>
              <Text style={styles.ButtonText}>{SingleJobStrings.Done}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ModalButtonHome} onPress={props.onPressHome}>
              <Text style={styles.ButtonTextHome}>{SingleJobStrings.GoHome}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalApplication
