import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { AuthContext } from '../../../Hooks/Context'
import { inject, observer } from 'mobx-react'
import styles from './Style'
//Strings
import { SignInStrings } from '../../../Config/Strings'
//Icons
import AnimatedIcon from './HidePassword'

function SignIn({ navigation, store }) {
  const { signIn } = React.useContext(AuthContext)
  const [data, setData] = React.useState({
    UserName: '',
    Password: '',
  })

  const UserNameInput = (val) => {
    setData({
      ...data,
      UserName: val,
    })
  }

  const PasswordInput = (val) => {
    setData({
      ...data,
      Password: val,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.Logo}></View>
      <Text style={styles.Title}>Welcome to App</Text>
      <Text style={styles.Slogan}>It's great opportunity to work on part time job and earch extra money</Text>
      <TextInput
        placeholder={SignInStrings.Phone}
        style={styles.input}
        onChangeText={(text) => UserNameInput(text)}
      />

      <AnimatedIcon
        placeholder={SignInStrings.Password}
        style={styles.inputPassword}
        onChangeText={(text) => PasswordInput(text)}
      />

      <View style={styles.ForgotContainer}>
        <TouchableOpacity>
          <Text style={styles.ForgotText}>{SignInStrings.Forgot}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonText}>{SignInStrings.Login}</Text>
      </TouchableOpacity>
      <View style={styles.Register}>
        <Text style={styles.Member}>{SignInStrings.Member}</Text>
        <TouchableOpacity onPress={() => navigation.push('Language')}>
          <Text style={styles.RegisterText}>{SignInStrings.Register}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default inject('store')(observer(SignIn))
