import React from 'react'
import { View, Animated, Text, ImageBackground, I18nManager, FlatList } from 'react-native'
import styles from './Style'

function TopCard(props) {
  const [ImageLoad] = React.useState(new Animated.Value(0))

  const Start = async () => {
    setTimeout(() => {
      Animated.timing(ImageLoad, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, 1000)
  }

  return (
    <FlatList
      data={props.Data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.TopCard}>
          <Animated.Image
            onLoadEnd={() => Start()}
            source={{
              uri: item.ImageURL,
            }}
            style={[styles.TopCardImage, { opacity: ImageLoad }]}
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
