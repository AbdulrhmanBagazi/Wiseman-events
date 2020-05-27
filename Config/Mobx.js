import { observable, decorate, action } from 'mobx'
import { LanguageGet } from './AsyncStorage'

class Store {
  Language = null

  getLanguge = async () => {
    var getLanguage = await LanguageGet()
    this.Language = getLanguage
    return
  }
}

decorate(Store, {
  Language: observable,
  getLanguge: action,
})

const store = new Store()

export default store
