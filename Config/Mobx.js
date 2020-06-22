import { observable, decorate, action } from 'mobx'
import { LanguageGet } from './AsyncStorage'

class Store {
  Language = null
  SelectLanguage = null
  SelectGender = null

  setLanguge = async (value) => {
    this.SelectLanguage = value
    return
  }

  setGender = async (value) => {
    this.SelectGender = value
    return
  }

  getLanguge = async () => {
    var getLanguage = await LanguageGet()
    this.Language = getLanguage
    return
  }
}

decorate(Store, {
  Language: observable,
  SelectLanguage: observable,
  SelectGender: observable,
  setGender: action,
  getLanguge: action,
  setLanguge: action,
})

const store = new Store()

export default store
