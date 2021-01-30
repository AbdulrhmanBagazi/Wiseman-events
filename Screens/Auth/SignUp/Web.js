import React from 'react'
import { TouchableOpacity, SafeAreaView, Modal } from 'react-native'
import styles from './Style'
import { WebView } from 'react-native-webview'
import Icon from '../../../Config/Icons'

function Web(props) {
  const [isShow, setShow] = React.useState(false)

  React.useEffect(() => {
    setShow(props.OpenModal)
  }, [props.OpenModal])

  return (
    <Modal animationType="fade" transparent={false} visible={isShow}>
      <SafeAreaView>
        <TouchableOpacity onPress={props.close} style={styles.closebutton}>
          <Icon name="x" size={25} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
      <WebView source={{ uri: props.URL }} style={{ marginTop: 10 }} />
    </Modal>
  )
}

export default Web
