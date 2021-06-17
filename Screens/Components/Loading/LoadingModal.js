import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import styles from './Style';
import { PrimaryColor } from '../../../Config/ColorPalette';

function LoadingModal(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.Loading}>
      <View style={styles.modal}>
        <ActivityIndicator size="large" color={PrimaryColor} />
      </View>
    </Modal>
  );
}

export default LoadingModal;
