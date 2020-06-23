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
} from 'react-native'
import styles from './Style'
import { ProfileStrings } from '../../../Config/Strings'
import DateTimePicker from '@react-native-community/datetimepicker'
import AnimatedButton from './AnimatedButton'
import { AuthContext } from '../../../Hooks/Context'

function CreateProfile() {
  const { Notification } = React.useContext(AuthContext)
  const [date, setDate] = React.useState(new Date(1598051730000))
  const [show, setShow] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isCreated, setCreated] = React.useState(false)
  const [Gender, setGender] = React.useState('')

  React.useEffect(() => {
    if (isCreated) {
      Notification()
      return
    }

    return
  }, [isCreated])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
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

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo}>
              <Image style={styles.tinyLogo} source={require('../../../assets/profileinformation.png')} />
            </View>
            <Text style={styles.Title}>{ProfileStrings.Title}</Text>

            <TextInput style={styles.input} placeholder={ProfileStrings.Full} />
            <TextInput style={styles.input} placeholder={ProfileStrings.Nationality} />

            <TouchableOpacity style={styles.inputDate} onPress={showDatepickerIOS}>
              <Text style={styles.inputDateText}>{ProfileStrings.Birth + date}</Text>
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
                      value={date}
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

            {/* <TextInput style={styles.input} placeholder={ProfileStrings.Male} /> */}
            <AnimatedButton
              GenderValue={Gender}
              Male={ProfileStrings.Male}
              Female={ProfileStrings.Female}
              onPressMale={() => setGender('male')}
              onPressFemale={() => setGender('female')}
            />
            <TextInput style={styles.input} placeholder={ProfileStrings.City} />
            <TextInput style={styles.input} placeholder={ProfileStrings.location} />

            <TouchableOpacity style={styles.Button} onPress={() => setCreated(true)}>
              <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CreateProfile
