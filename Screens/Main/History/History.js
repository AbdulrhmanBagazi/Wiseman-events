import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native'
import styles from './Style'
import { inject, observer } from 'mobx-react'
import { width } from '../../../Config/Layout'
import AnimatedTopTab from './AnimatedTopTab'
import Card from './Card'

const Data = []

function History({ store }) {
  const Scroll = React.useRef(null)
  const [isSelected, setSelected] = React.useState(4)

  const check = async (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10
    const currentPage = await Math.floor(xOffset / width)

    if (currentPage === -1) {
      return
    }
    if (currentPage !== isSelected) {
      // console.log(currentPage)
      setSelected(currentPage)
      return
    }

    return
  }

  const ScrollTo = async (val) => {
    const currentPage = await Math.floor(val * (width + 20))
    const xOffset = currentPage
    const currentPagetwo = await Math.floor(xOffset / width)

    if (currentPagetwo === -1) {
      return
    }
    if (currentPagetwo !== isSelected) {
      // console.log(currentPagetwo)
      Scroll.current.scrollTo({ x: currentPage })
      return
    }

    return
  }

  React.useEffect(() => {
    ScrollTo(1)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <AnimatedTopTab
        Value={isSelected}
        onPressOne={() => ScrollTo(0)}
        onPressTwo={() => ScrollTo(1)}
        onPressThird={() => ScrollTo(2)}
      />
      <ScrollView
        pagingEnabled={true}
        scrollEventThrottle={16}
        horizontal={true}
        onScroll={(e) => check(e)}
        ref={Scroll}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text>1</Text>
        </View>
        <View style={styles.Container}>
          <Card Data={store.data.applications} />
        </View>
        <View style={styles.Container}>
          <Text>3</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default inject('store')(observer(History))
