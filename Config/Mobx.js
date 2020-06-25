import { observable, decorate, action } from 'mobx'
import { LanguageGet } from './AsyncStorage'
import { UserTokenStore } from './AsyncStorage'

class Store {
  Language = null
  data = []
  token = null

  setData = async (userData) => {
    this.data = userData
    return
  }

  setToken = async (token) => {
    this.token = token
    await UserTokenStore(token)
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
  getLanguge: action,
  data: observable.ref,
  setData: action,
  token: observable,
  setToken: action,
})

const store = new Store()

export default store
