import React from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, I18nManager, Image } from 'react-native'
import styles from './Style'
import { LevelsPageStrings } from '../../../../Config/Strings'
function Levels() {
  return (
    <ScrollView>
      <View style={styles.Container}>
        <Text style={styles.Title}>{LevelsPageStrings.Title}</Text>
        <Text style={styles.About}>{LevelsPageStrings.About}</Text>

        <View style={styles.LevelView}>
          <Text style={styles.Level}>
            Level <Text style={styles.LevelNumber}>1</Text>
          </Text>
          <Text style={styles.LevelText}>{LevelsPageStrings.LevelText}</Text>
        </View>
        <View style={styles.LevelView}>
          <Text style={styles.Level}>
            Level <Text style={styles.LevelNumber}>2</Text>
          </Text>
          <Text style={styles.LevelText}>{LevelsPageStrings.LevelText}</Text>
        </View>
        <View style={styles.LevelView}>
          <Text style={styles.Level}>
            Level <Text style={styles.LevelNumber}>3</Text>
          </Text>
          <Text style={styles.LevelText}>{LevelsPageStrings.LevelText}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Levels
