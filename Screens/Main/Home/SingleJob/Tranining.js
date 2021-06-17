import React from 'react';
import { View, Text, I18nManager } from 'react-native';
import styles from './Style';
import { SingleJobStrings } from '../../../../Config/Strings';

function Tranining(props) {
  return (
    <View style={styles.Pager}>
      <View style={styles.TextSelectView}>
        <Text style={styles.TextSelect}>
          <Text style={styles.TextSelect}>{props.Training}</Text>
        </Text>
      </View>

      <View style={styles.PointsView}>
        <Text style={styles.TitleSelect}>
          {SingleJobStrings.TraniningRules}
        </Text>
        {I18nManager.isRTL
          ? props.Data.map((data, index) => {
              return (
                <View style={styles.TextPointsView} key={index}>
                  <Text style={styles.TextSelectPoint}>
                    {'\u2022' + ' ' + data}
                  </Text>
                </View>
              );
            })
          : props.Data.map((data, index) => {
              return (
                <View style={styles.TextPointsView} key={index}>
                  <Text style={styles.TextSelectPoint}>
                    {'\u2022' + ' ' + data}
                  </Text>
                </View>
              );
            })}
      </View>
    </View>
  );
}

export default Tranining;
