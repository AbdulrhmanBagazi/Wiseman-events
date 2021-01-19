import React from 'react'
import { View, Text, FlatList, TouchableOpacity, I18nManager, Linking, Image, Modal } from 'react-native'
import styles from './Style'
import Icon from '../../../Config/Icons'
import { PrimaryColor } from '../../../Config/ColorPalette'
import moment from 'moment'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import QrcodeGen from './QrcodeGen'
import CalHours from './CalHours'
import CalSalary from './CalSalay'
import { HistoryPageStrings } from '../../../Config/Strings'

function Activejob(props) {
  const [isData, setData] = React.useState([])
  const [isShow, setShow] = React.useState(false)

  React.useEffect(() => {
    var newArray = props.Data.filter((item) => {
      // console.log(item)
      return item.Status === 'approved'
    })

    setData(newArray)
  }, [props.Data])

  return (
    <View style={styles.AllJobCard}>
      {isData.length <= 0 ? (
        <View style={styles.Logo}>
          <Image style={styles.tinyLogo} source={require('../../../assets/activejobillustrations.png')} />
        </View>
      ) : null}
      <FlatList
        data={isData}
        showsVerticalScrollIndicator={false}
        refreshControl={props.refreshControl}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 0 }}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <View style={styles.ActivejobView}>
            <View style={styles.ActivejobHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.Image}></View>
                <View style={styles.spaceActive}></View>
                <Text style={styles.ActivejobHeaderTextLight}>
                  {I18nManager.isRTL ? item.event.NameAr : item.event.Name}
                </Text>
              </View>
              <Text style={styles.ActivejobHeaderText}>
                {item.Type === 'organizer' ? item.event.Salary : item.event.SalarySupervisor}
                {I18nManager.isRTL ? 'ريال ' : ' SAR'}
                <Text style={styles.ActivejobHeaderTextLight}>/{I18nManager.isRTL ? 'الساعة' : 'Hour'}</Text>
              </Text>
            </View>
            <View style={styles.ActivejobBody}>
              <View style={styles.SplitBodyHOne}>
                <Text style={styles.ActivejobBodyText}>
                  {I18nManager.isRTL ? item.event.TitleAr : item.event.Title}
                </Text>
                <TouchableOpacity
                  style={styles.SingleJobDetailsLocationView}
                  onPress={() => Linking.openURL(item.event.LocationURL)}>
                  <Icon name="map-pin" size={14} color="#000" />
                  <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                    {I18nManager.isRTL ? item.event.LocationAr : item.event.Location}
                  </Text>
                  <Icon name="external-link" size={14} color={PrimaryColor} />
                </TouchableOpacity>
              </View>
              <View style={styles.SplitBodyH}>
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={() =>
                    props.onPressWork('WorkScheduleUser', { eventId: item.eventId, applicationId: item.id })
                  }>
                  <Icon name="calendar" size={40} color={PrimaryColor} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ActivejobBoxContainer}>
              <View style={styles.ActivejobBox}>
                <View style={styles.ActivejobBoxTop}>
                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>{I18nManager.isRTL ? 'الوردية' : 'Shift'}</Text>
                    <Text style={styles.dataTextActive}>{item.eventshift.shift}</Text>
                  </View>

                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>
                      {I18nManager.isRTL ? 'وقت الحضور' : 'Attendance Time'}
                    </Text>
                    <Text style={styles.dataTextActive}>
                      {moment(item.eventshift.attendance, 'hh:mm').format('hh:mma')}
                    </Text>
                  </View>
                </View>
                <View style={styles.ActivejobBoxTop}>
                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>
                      {I18nManager.isRTL ? 'مجموع الساعات' : 'Total Hours'}
                    </Text>
                    {/* <Text style={styles.dataTextActive}>{item.attendances[0].TotalHours}</Text> */}
                    <CalHours Values={item.attendances} />
                  </View>

                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>
                      {I18nManager.isRTL ? 'إجمالي الأرباح' : 'Total Earning'}
                    </Text>
                    {/* <Text style={styles.dataTextActive}>0 sar</Text> */}
                    <CalSalary
                      Meal={item.event.ProvideAmeal}
                      MealPlus={item.event.ProvideAnAllowance}
                      Values={item.attendances}
                      Rate={item}
                    />
                  </View>
                </View>
                <View style={styles.ActivejobBoxBottom}>
                  {item.Start && item.End ? (
                    <View style={styles.Activejobsplit}>
                      <Text style={styles.GrayColorText}>
                        {I18nManager.isRTL ? 'اليوم الأول' : 'First day'}
                      </Text>
                      <Text style={styles.dataTextActive}>{moment(item.Start).format('D MMMM, YYYY')}</Text>
                    </View>
                  ) : (
                    <Text style={styles.NoDateSetText}>{HistoryPageStrings.Soon}</Text>
                  )}

                  {item.Start && item.End ? (
                    <View style={styles.Activejobsplit}>
                      <Text style={styles.GrayColorText}>
                        {I18nManager.isRTL ? 'اليوم الأخير' : 'Last day'}
                      </Text>
                      <Text style={styles.dataTextActive}>{moment(item.End).format('D MMMM, YYYY')}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal animationType="fade" transparent={true} visible={isShow}>
        <TouchableOpacity style={styles.modal} onPress={() => setShow(false)} activeOpacity={0.5}>
          <View style={styles.modalContainer}>
            <QrcodeGen value={props.Secret + ',' + props.userId} />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.work}>
        <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
          <MaterialCommunityIcons name="qrcode" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Activejob
