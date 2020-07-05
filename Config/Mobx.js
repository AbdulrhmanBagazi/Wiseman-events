import { observable, decorate, action } from 'mobx'
import { LanguageGet } from './AsyncStorage'
import { UserTokenStore } from './AsyncStorage'

class Store {
  Language = null
  data = []
  banner = []
  section = []
  fewevents = []
  token = null

  setData = async (Data) => {
    this.data = Data.user
    this.banner = Data.banner
    this.section = Data.section
    return
  }

  setfewevents = async (Data) => {
    this.fewevents = Data

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
  banner: observable.ref,
  section: observable.ref,
  fewevents: observable.ref,
  setfewevents: action,
})

const store = new Store()

export default store
