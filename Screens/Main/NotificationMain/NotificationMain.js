import React from 'react'
import { View, Text, ScrollView, ActivityIndicator, I18nManager } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment'
import { PrimaryColor } from '../../../Config/ColorPalette'

function NotificationMain({ navigation }) {
  const [isLoading, setLoading] = React.useState(false)
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few sec',
      ss: '%d sec',
      m: 'a min',
      mm: '%d mins',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      w: 'a week',
      ww: '%d weeks',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  })

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false)
      Start()
    })

    return unsubscribe
  }, [navigation])

  const Start = () => {
    setTimeout(() => {
      setLoading(true)
    }, 500)
    return
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.NotificationBoxFirst}>
          {/** styles.NotificationBox   <Icon name="bell" size={30} color="#9CA2B0" />*/}
          <View style={styles.IconView}>
            <FontAwesome name="dollar" size={30} color="#9CA2B0" />
          </View>
          <View style={styles.CenterView}>
            <View style={styles.TimeView}>
              <Text style={styles.title}>{I18nManager.isRTL ? 'تحديث الدفع' : 'Payment update'}</Text>
              {isLoading ? (
                <Text style={styles.TimeText}>{moment('2020-07-18T18:07:16.149Z').fromNow()}</Text>
              ) : (
                <ActivityIndicator size="small" color={PrimaryColor} />
              )}
            </View>
            <View style={styles.BodyTextView}>
              <Text style={styles.bodyText}>
                {I18nManager.isRTL
                  ? 'هو ببساطة نص وهمي لصناعة الطباعة والتنضيد. كان لوريم إيبسوم هو النص الوهمي القياسي للصناعة منذ القرن الخامس عشر ، عندما أخذت طابعة غير معروفة مجموعة من الأنواع وخلطتها لعمل كتاب من نوع العينة. لقد نجا ليس فقط خمسة قرون ، ولكن أيضًا قفزة في التنضيد الإلكتروني ، وبقي دون تغيير بشكل أساسي. تم تعميمه في الستينيات مع إصدار أوراق Letraset التي تحتوي على مقاطع Lorem Ipsum ، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker بما في ذلك إصدارات Lorem Ipsum.'
                  : 'Company name share the location and date where you can have your payment.Company name share the location and date where you can have your payment.'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default NotificationMain
