import React from 'react'
import { View, Text, I18nManager, FlatList } from 'react-native'
import styles from './Style'
import TopCardImage from './TopCardImage'

function TopCard(props) {
  return (
    <FlatList
      data={props.Data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.TopCard}>
          <TopCardImage
            source={{
              uri: item.ImageURL,
            }}
          />
          <View style={styles.TopCardLayer}>
            <Text style={styles.TopCardTitle}>{I18nManager.isRTL ? item.TitleAr : item.Title}</Text>
            <Text style={styles.TopCardTitleStatus}>{I18nManager.isRTL ? 'مستمر' : item.Status}</Text>
            <Text style={styles.TopCardTime}>{I18nManager.isRTL ? item.DateAr : item.Date}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default TopCard
