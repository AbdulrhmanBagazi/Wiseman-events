import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import styles from './Style'
import { SupportPageStrings } from '../../../../Config/Strings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

function Support() {
  const [isText, setText] = React.useState('')
  const [isShow, setShow] = React.useState(false)

  const Input = async (val) => {
    setText(val)

    return
  }

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <Text style={styles.Title}>{SupportPageStrings.Title}</Text>
        <Text style={styles.About}>{SupportPageStrings.About}</Text>
        <Text style={styles.Message}>{SupportPageStrings.Message}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={200}
          editable
          style={styles.TextInput}
          placeholder={SupportPageStrings.PlaceHolder}
          onChangeText={(text) => Input(text)}
          value={isText}
        />
        <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
          <Text style={styles.ButtonText}>{SupportPageStrings.Send}</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={isShow}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.Logo}>
              <Image style={styles.tinyLogo} source={require('../../../../assets/supportIcon.png')} />
            </View>
            <Text style={styles.Slogan}>{SupportPageStrings.ModalAbout}</Text>

            <TouchableOpacity style={styles.ModalButton} onPress={() => setShow(false)}>
              <Text style={styles.ButtonText}>{SupportPageStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  )
}

export default Support
