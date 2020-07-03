import React from 'react'
import { View, Text, I18nManager } from 'react-native'
import styles from './Style'
import { SingleJobStrings } from '../../../../Config/Strings'

function Tranining(props) {
  return (
    <View style={styles.Pager}>
      <View style={styles.TextSelectView}>
        <Text style={styles.TextSelect}>
          <Text style={styles.TextSelect}>
            {I18nManager.isRTL
              ? 'يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي يتبع له) ليتمكن من الإلتحاق بالكلية التي يرغب بها. يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي يتبع له) ليتمكن من الإلتحاق بالكلية التي يرغب بها. يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي يتبع له) ليتمكن من الإلتحاق بالكلية التي يرغب بها.'
              : 'Tattooed cliche wayfarers jianbing letterpress jean shorts. Vice tumeric enamel pin lumbersexual lomo. Before they sold out pour-over affogato kogi vice, sustainable man bun aesthetic bushwick chicharrones selfies health goth williamsburg.'}
          </Text>
        </Text>
      </View>

      <View style={styles.PointsView}>
        <Text style={styles.TitleSelect}>{SingleJobStrings.TraniningRules}</Text>
        {I18nManager.isRTL ? (
          <View style={styles.TextPointsView}>
            <Text style={styles.TextSelectPoint}>
              {'\u2022' + ' '} يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
              يتبع له) ليتمكن من
            </Text>
          </View>
        ) : (
          <View style={styles.TextPointsView}>
            <Text style={styles.TextSelectPoint}>
              {'\u2022' + ' '} Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooedVinyl
              next level heirloom snackwave banh mi kombucha brooklyn tattooedVinyl next level heirloom
              snackwave banh mi kombucha brooklyn tattooedVinyl next level heirloom snackwave banh mi kombucha
              brooklyn tattooedVinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
            </Text>
          </View>
        )}
        {I18nManager.isRTL ? (
          <View style={styles.TextPointsView}>
            <Text style={styles.TextSelectPoint}>
              {'\u2022' + ' '} يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
              يتبع له) ليتمكن من يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
              يتبع له) ليتمكن من يجب على الطالب في برنامج الإعداد الجامعي إكمال هذه المتطلبات (حسب المسار الذي
              يتبع له) ليتمكن من
            </Text>
          </View>
        ) : (
          <View style={styles.TextPointsView}>
            <Text style={styles.TextSelectPoint}>
              {'\u2022' + ' '} Vinyl next level heirloom snackwave banh mi kombucha brooklyn tattooed
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Tranining
