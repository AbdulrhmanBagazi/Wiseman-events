import { observable, decorate, action } from 'mobx'
import { LanguageGet } from './AsyncStorage'
import { UserTokenStore } from './AsyncStorage'
import { URL } from './Config'
import axios from 'axios'
import { UserTokenGet, UserTokenRemove } from './AsyncStorage'

class Store {
  Language = null
  data = []
  history = []
  banner = []
  fewevents = []
  token = null

  setData = async (Data) => {
    this.data = Data.user
    this.history = Data.user.applications
    this.banner = Data.banner
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

  ReloadData = async () => {
    var Token = await UserTokenGet()
    axios
      .get(URL + '/user/authhenticate', {
        headers: {
          Authorization: Token,
        },
      })
      .then(async (response) => {
        // console.log(response)
        if (response.status === 200) {
          this.history = response.data.user.applications
        } else {
          return
        }
      })
      .catch(async (error) => {
        return
      })
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
  fewevents: observable.ref,
  setfewevents: action,
  history: observable.ref,
  ReloadData: action,
})

const store = new Store()

export default store
