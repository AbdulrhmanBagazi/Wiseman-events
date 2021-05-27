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

  EarningsBadge = false
  HistoryBadge = false
  NotificationMain = false

  EarningsBadgeNumber = 0
  HistoryBadgeNumber = 0
  NotificationMainNumber = 0
  CalendarMainIDs = []

  resetDate = null

  setCalendarIds = async (old, val) => {
    this.CalendarMainIDs = [...old, val]

    return
  }

  removeCalendarIds = async (old, val) => {
    arr = old.filter((item) => item !== val)

    this.CalendarMainIDs = [...arr]

    return
  }

  updEarningsBadgeage = async (num, val) => {
    this.EarningsBadge = val
    this.EarningsBadgeNumber = num

    return
  }

  updageHistoryBadge = async (num, val) => {
    this.HistoryBadge = val
    this.HistoryBadgeNumber = num

    return
  }

  updageNotificationMain = async (num, val) => {
    this.NotificationMain = val
    this.NotificationMainNumber = num

    return
  }

  setNotificationMainPage = async () => {
    this.NotificationMainPage = false

    return
  }

  setNotificationMainPageBack = async () => {
    this.NotificationMainPage = true

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
    if (Data.user.profile) {
      this.profileImage = Data.user.profile.profile_image
    }

    this.banner = Data.banner
    return
  }

  setBanner = async (Data) => {
    this.banner = Data
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

  setresetDate = async () => {
    var date = new Date()

    this.resetDate = date

    return
  }
}

decorate(Store, {
  Language: observable,
  getLanguge: action,
  data: observable.ref,
  setData: action,
  setBanner: action,
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
  setNotificationMainPageBack: action,
  HistoryPage: observable,
  setHistoryPage: action,
  setHistoryPageBack: action,
  setResetPages: action,
  profileImage: observable,
  updateimage: action,
  resetDate: observable,
  setresetDate: action,
  EarningsBadge: observable,
  HistoryBadge: observable,
  NotificationMain: observable,
  updEarningsBadgeage: action,
  updageHistoryBadge: action,
  updageNotificationMain: action,
  EarningsBadgeNumber: observable,
  HistoryBadgeNumber: observable,
  NotificationMainNumber: observable,
  CalendarMainIDs: observable.ref,
  setCalendarIds: action,
  removeCalendarIds: action,
})

const store = new Store()

export default store
