import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Modal, View, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { width } from '../../../../../Config/Layout'
import { PrimaryColor, GrayColor } from '../../../../../Config/ColorPalette'
import { ProfileStrings } from '../../../../../Config/Strings'

export default function MapUI(props) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={props.MapmodalVisible}>
        <View style={styles.modal}>
          <View style={styles.container}>
            <SafeAreaView style={styles.close}>
              <TouchableOpacity style={styles.button} onPress={props.Close}>
                <Entypo name="cross" size={20} color="white" />
              </TouchableOpacity>
            </SafeAreaView>
            <MapView
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              initialRegion={props.region}
              onPress={props.onRegionChange}>
              {props.coordinate === null ? null : (
                <Marker key={1} coordinate={props.coordinate} pinColor={PrimaryColor}></Marker>
              )}
            </MapView>

            <Text style={styles.LightText}>{ProfileStrings.locationmsg}</Text>

            <TouchableOpacity style={styles.Button} onPress={props.DoneButton}>
              <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: width + 20,
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  close: {
    // flex: 1,
    // padding: 5,
    // marginVertical: 5,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9,
    top: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width,
  },
  bottom: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: PrimaryColor,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Button: {
    backgroundColor: PrimaryColor,
    flexDirection: 'row',
    width,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PrimaryColor,
    height: 50,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    // marginVertical: 20,
    position: 'absolute',
    bottom: 50,
    zIndex: 9,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  LightText: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 5,
    width,
    position: 'absolute',
    bottom: 100,
    zIndex: 9,
    marginVertical: 10,
    padding: 5,
    textAlign: 'left',
    color: GrayColor,
  },
})
