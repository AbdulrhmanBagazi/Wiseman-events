import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import styles from './Style'
import { SingleJobStrings } from '../../../../Config/Strings'
import ModalApplication from './ModalApplication'
import AnimatedButton from './AnimatedButton'

function Application({ route }) {
  const [isShow, setShow] = React.useState(false)
  const [selectedShift, setselectedShift] = React.useState(null)
  const [isTime, setTime] = React.useState(null)
  const [isAttendance, setAttendance] = React.useState(null)
  const { item } = route.params

  const Select = async (val) => {
    setselectedShift(val)
    setTime(item.eventshifts[val].time)
    setAttendance(item.eventshifts[val].attendance)

    return
  }

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ContainerMain}>
          <Text style={styles.title}>{SingleJobStrings.ShiftSelect}</Text>
          <View style={styles.SelectView}>
            <View style={styles.ShiftView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={item.eventshifts}
                horizontal={true}
                renderItem={({ item, index }) => (
                  <AnimatedButton Shift={selectedShift} itemIndex={index} onPress={() => Select(index)} />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>

            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftTime} <Text style={{ color: 'black' }}>{isTime}</Text>
            </Text>
            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftAtta} <Text style={{ color: 'black' }}>{isAttendance}</Text>
            </Text>
          </View>
          {/* <Text style={styles.titleSecond}>{SingleJobStrings.Impor}</Text>
          <View style={styles.SelectViewPoints}>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '} يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
                يتبع له) ليتمكن من
              </Text>
            </View>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '}
                Employee have to report attendence before 30 min of event. Employee have to report attendence
                before 30 min of event. Employee have to report attendence before 30 min of event. Employee
                have to report attendence before 30 min of event. Employee have to report attendence before 30
                min of event.
              </Text>
            </View>
            <View style={styles.TextPointsView}>
              <Text style={styles.TextSelect}>
                {'\u2022' + ' '}
                Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
              </Text>
            </View>
          </View> */}
        </View>

        <ModalApplication ShowModal={isShow} />
      </ScrollView>
      <View style={styles.ButtonView}>
        <TouchableOpacity style={styles.Button} onPress={() => setShow(true)}>
          <Text style={styles.ButtonText}>{SingleJobStrings.Apply}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Application
