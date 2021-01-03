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
  alerts = []
  banner = []
  fewevents = []
  token = null
  profileImage = null

  HistoryPage = true
  NotificationMainPage = true
  MainPage = true

  setNotificationMainPage = async () => {
    this.NotificationMainPage = false

    return
  }

  setHistoryPage = async () => {
    this.HistoryPage = false

    return
  }

  setHistoryPageBack = async () => {
    this.HistoryPage = true

    return
  }

  setResetPages = async () => {
    this.HistoryPage = true
    this.NotificationMainPage = true
    this.MainPage = true

    return
  }

  setData = async (Data) => {
    this.data = Data.user
    // this.history = Data.user.applications
    // this.alerts = Data.user.alerts.reverse()
    this.profileImage = Data.user.profile.profile_image

    this.banner = Data.banner
    return
  }

  updateimage = async (Data) => {
    this.profileImage = Data

    return
  }

  setDataSignup = async (Data) => {
    this.data = Data.user
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
      .get(URL + '/user/getApplication', {
        headers: {
          Authorization: Token,
        },
      })
      .then(async (response) => {
        // console.log(response)
        if (response.status === 200) {
          if (response.data.check === 'success') {
            this.history = response.data.application

            return
          } else if (response.data.check === 'fail') {
            return
          }
        } else {
          return
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              return
            } else {
              return
            }
          }
        } else {
          return
        }
      })
  }

  setHistoryData = async (data) => {
    this.history = data
    return
  }

  setAlertsData = async (data) => {
    this.alerts = data.reverse()
    return
  }

  setProfile = async (data, profile) => {
    var data = data

    data.profile = profile

    this.data = data
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
  fewevents: observable.ref,
  setfewevents: action,
  history: observable.ref,
  ReloadData: action,
  setHistoryData: action,
  alerts: observable.ref,
  setAlertsData: action,
  setDataSignup: action,
  NotificationMainPage: observable,
  setNotificationMainPage: action,
  HistoryPage: observable,
  setHistoryPage: action,
  setHistoryPageBack: action,
  setResetPages: action,
  profileImage: observable,
  updateimage: action,
})

const store = new Store()

export default store
