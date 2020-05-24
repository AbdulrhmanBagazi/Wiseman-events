import { observable, decorate, action } from 'mobx'
import { AsyncStorage } from 'react-native'

class Store {
  Language = null
  name = 'hello'

  ChangeLanguge = async () => {
    var L = await AsyncStorage.getItem('@Wiseman-events:Language')
    this.Language = L

    return
  }
}

decorate(Store, {
  Language: observable,
  ChangeLanguge: action,
})

const store = new Store()

export default store
