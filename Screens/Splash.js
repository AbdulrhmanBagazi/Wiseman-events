import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthContext } from '../Hooks/Context'
import i18n from 'i18n-js'

@inject('store')
@observer
class SplashUI extends React.Component {
  async componentDidMount() {
    await this.props.store.ChangeLanguge()

    i18n.locale = this.props.store.Language
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    )
  }
}

function Splash() {
  const { signOut } = React.useContext(AuthContext)

  React.useEffect(() => {
    setTimeout(() => {
      signOut()
    }, 1000)
  })

  return <SplashUI />
}

export default Splash
