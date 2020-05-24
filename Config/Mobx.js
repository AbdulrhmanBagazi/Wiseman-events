import { observable, decorate, action } from 'mobx'
import { AsyncStorage } from 'react-native'

class Store {
  Language = null

  ChangeLanguge = async () => {
    var L = await AsyncStorage.getItem('@Wiseman-events:Language')
    this.Language = L
  }
}

decorate(Store, {
  Language: observable,
  ChangeLanguge: action,
})

const store = new Store()

export default store
