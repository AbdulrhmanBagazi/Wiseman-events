import React from 'react'
import { View, Image, Text, ImageBackground } from 'react-native'
import styles from './Style'

function TopCard({ props }) {
  return (
    <View style={styles.TopCard}>
      <ImageBackground source={require('../../../assets/one.png')} style={styles.TopCardImage}>
        <View style={styles.TopCardLayer}>
          <Text style={styles.TopCardTitle}>Riyadh Season Ongoing</Text>
          <Text style={styles.TopCardTime}>23 November to 6 March</Text>
          {/* <Image style={styles.TopCardImage} source={require('../../../assets/one.png')} /> */}
        </View>
      </ImageBackground>
    </View>
  )
}

export default TopCard
