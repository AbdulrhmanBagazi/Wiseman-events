import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import styles from './Style'
import { ProfileStrings } from '../../../Config/Strings'

function CreateProfile() {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.Scroll} keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.Logo} />
            <Text style={styles.Title}>{ProfileStrings.Title}</Text>

            <TextInput style={styles.input} placeholder={ProfileStrings.Full} />
            <TextInput style={styles.input} placeholder={ProfileStrings.Nationality} />
            <TextInput style={styles.input} placeholder={ProfileStrings.Birth} />
            <TextInput style={styles.input} placeholder={ProfileStrings.Male} />
            <TextInput style={styles.input} placeholder={ProfileStrings.City} />
            <TextInput style={styles.input} placeholder={ProfileStrings.location} />

            <TouchableOpacity style={styles.Button} onPress={() => setVerify(true)}>
              <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CreateProfile
