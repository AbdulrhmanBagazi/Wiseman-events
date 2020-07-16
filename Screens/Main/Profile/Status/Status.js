import React from 'react'
import { View, Text, ScrollView, I18nManager, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { StatusPageStrings } from '../../../../Config/Strings'
import { width } from '../../../../Config/Layout'
import StatusPicker from './StatusPicker'
import { PrimaryColor } from '../../../../Config/ColorPalette'

function Status({ store }) {
  const [Show, setShow] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width,
          marginTop: 40,
        }}>
        <Text style={styles.Title}>{StatusPageStrings.Status}</Text>
        {Show ? (
          <TouchableOpacity
            style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setShow(false)}>
            <Text style={styles.Cancel}>{StatusPageStrings.Cancel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.Container}>
        {Show ? (
          <View style={styles.View}>
            <StatusPicker />
          </View>
        ) : (
          <View style={styles.View}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'الحالة' : 'Status'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: '#E8505B' }}>
                  {store.data.status === null ? StatusPageStrings.notspecifiedyet : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'أيام العمل' : 'Work days'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: '#E8505B' }}>
                  {store.data.status === null ? '' : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                <Text style={styles.ViewText}>{I18nManager.isRTL ? 'وقت العمل' : 'Work time'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: '#E8505B' }}>
                  {store.data.status === null ? '' : ''}
                </Text>
              </View>
            </View>
          </View>
        )}

        {Show ? (
          <TouchableOpacity style={styles.ButtonAdd} onPress={() => setLoading(true)}>
            <Text style={styles.ButtonText}>{StatusPageStrings.Save}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.AddButton} onPress={() => setShow(true)}>
            <Text style={styles.AddButtonText}>{StatusPageStrings.New}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </ScrollView>
  )
}

export default inject('store')(observer(Status))
