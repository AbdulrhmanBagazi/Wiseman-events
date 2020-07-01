import React from 'react'
import { View, Text } from 'react-native'
import styles from './Style'
import { Entypo } from '@expo/vector-icons'

function Description(props) {
  return (
    <View style={styles.Pager}>
      <Text style={styles.TitleSelect}>About Event</Text>
      <Text style={styles.TextSelect}>
        Tattooed cliche wayfarers jianbing letterpress jean shorts. Vice tumeric enamel pin lumbersexual lomo.
        Before they sold out pour-over affogato kogi vice, sustainable man bun aesthetic bushwick chicharrones
        selfies health goth williamsburg.
      </Text>
      <Text style={styles.TitleSelect}>Responsibility</Text>
      <View style={styles.PointsView}>
        <Text style={styles.TextSelect}>
          <Entypo name="dot-single" size={14} color="black" />
          Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
        </Text>
        <Text style={styles.TextSelect}>
          <Entypo name="dot-single" size={14} color="black" />
          Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
        </Text>
        <Text style={styles.TextSelect}>
          <Entypo name="dot-single" size={14} color="black" />
          Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
        </Text>
      </View>
    </View>
  )
}

export default Description
