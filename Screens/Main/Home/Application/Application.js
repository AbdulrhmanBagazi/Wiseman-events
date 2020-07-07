import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native'
import styles from './Style'
import { SingleJobStrings } from '../../../../Config/Strings'
import { PrimaryColor, SecondaryColor } from '../../../../Config/ColorPalette'
import ModalApplication from './ModalApplication'

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

function Application({ route }) {
  const [First] = React.useState(new Animated.Value(0))
  const [Second] = React.useState(new Animated.Value(0))
  const [Third] = React.useState(new Animated.Value(0))
  const [isShow, setShow] = React.useState(false)
  const { item } = route.params

  const FirstColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const FirstDarkColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ccc', PrimaryColor],
  })

  const SecondColor = Second.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const SecondDarkColor = Second.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ccc', PrimaryColor],
  })

  const ThirdColor = Third.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  })
  const ThirdDarkColor = Third.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ccc', PrimaryColor],
  })

  const SelectShift = async (val) => {
    Animated.parallel([
      Animated.timing(First, {
        toValue: val === 1 ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(Second, {
        toValue: val === 2 ? 100 : 0,
        duration: 500,
      }),
      Animated.timing(Third, {
        toValue: val === 3 ? 100 : 0,
        duration: 500,
      }),
    ]).start()
  }

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ContainerMain}>
          <Text style={styles.title}>{SingleJobStrings.ShiftSelect}</Text>
          <View style={styles.SelectView}>
            <View style={styles.ShiftView}>
              {item.Shifts >= 1 ? (
                <AnimatedButton
                  onPress={() => SelectShift(1)}
                  style={[styles.ShiftButton, { borderColor: FirstDarkColor, backgroundColor: FirstColor }]}>
                  <Animated.Text style={[styles.shift, { color: FirstDarkColor }]}>1st Shift</Animated.Text>
                </AnimatedButton>
              ) : null}

              {item.Shifts >= 2 ? (
                <AnimatedButton
                  onPress={() => SelectShift(2)}
                  style={[
                    styles.ShiftButton,
                    { borderColor: SecondDarkColor, backgroundColor: SecondColor },
                  ]}>
                  <Animated.Text style={[styles.shift, { color: SecondDarkColor }]}>2nd Shift</Animated.Text>
                </AnimatedButton>
              ) : null}

              {item.Shifts >= 3 ? (
                <AnimatedButton
                  onPress={() => SelectShift(3)}
                  style={[styles.ShiftButton, { borderColor: ThirdDarkColor, backgroundColor: ThirdColor }]}>
                  <Animated.Text style={[styles.shift, { color: ThirdDarkColor }]}>3rd Shift</Animated.Text>
                </AnimatedButton>
              ) : null}
            </View>

            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftTime} <Text style={{ color: 'black' }}>10am - 2pm</Text>
            </Text>
            <Text style={styles.TimeandA}>
              {SingleJobStrings.ShiftAtta} <Text style={{ color: 'black' }}>9:30am</Text>
            </Text>
          </View>
          <Text style={styles.titleSecond}>{SingleJobStrings.Impor}</Text>
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
          </View>
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
