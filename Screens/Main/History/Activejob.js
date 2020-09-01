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
      <View style={styles.Logo}>
        <Image style={styles.tinyLogo} source={require('../../../assets/activejobillustrations.png')} />
      </View>
      <FlatList
        data={isData}
        showsVerticalScrollIndicator={false}
        refreshControl={props.refreshControl}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <View style={styles.ActivejobView}>
            <View style={styles.ActivejobHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={index === 0 ? styles.ImageActive : styles.Image}></View>
                <View style={styles.spaceActive}></View>
                <Text style={styles.ActivejobHeaderTextLight}>
                  {I18nManager.isRTL ? item.event.NameAr : item.event.Name}
                </Text>
              </View>
              <Text style={styles.ActivejobHeaderText}>
                10sar<Text style={styles.ActivejobHeaderTextLight}>/h</Text>
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
                {index === 0 ? (
                  <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
                    <MaterialCommunityIcons name="qrcode-scan" size={40} color={PrimaryColor} />
                  </TouchableOpacity>
                ) : null}
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
                      {I18nManager.isRTL ? item.eventshift.attendanceAr : item.eventshift.attendance}
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
                    <CalSalary Values={item.attendances} />
                  </View>
                </View>
                <View style={styles.ActivejobBoxBottom}>
                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>
                      {I18nManager.isRTL ? 'تاريخ البدء' : 'Start Date'}
                    </Text>
                    <Text style={styles.dataTextActive}>
                      {moment(item.event.Start).format('D MMMM, YYYY')}
                    </Text>
                  </View>

                  <View style={styles.Activejobsplit}>
                    <Text style={styles.GrayColorText}>
                      {I18nManager.isRTL ? 'تاريخ الانتهاء' : 'End Date'}
                    </Text>
                    <Text style={styles.dataTextActive}>{moment(item.event.End).format('D MMMM, YYYY')}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* {isData.length > 1 && index === 0 ? (
                  <View style={styles.ActiveSoon}>
                    <Text style={styles.ActiveSoonText}>
                      {I18nManager.isRTL ? 'وظائفك القادمة' : 'Your upcoming jobs'}
                    </Text>
                  </View>
                ) : null} */}

            {index === 0 ? (
              <Modal animationType="fade" transparent={true} key={index} visible={isShow}>
                <TouchableOpacity style={styles.modal} onPress={() => setShow(false)} activeOpacity={0.5}>
                  <View style={styles.modalContainer}>
                    <QrcodeGen
                      value={item.userId + ',' + item.eventId + ',' + item.eventshiftId + ',' + item.id}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            ) : null}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Activejob
