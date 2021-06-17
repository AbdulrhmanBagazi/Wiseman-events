import React from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import {
  PrimaryColor,
  SecondaryColor,
  GrayColor,
  LightBorder,
  PrimaryBorder,
} from '../../../Config/ColorPalette';
import styles from './Style';
import { inject, observer } from 'mobx-react';

const TO = Animated.createAnimatedComponent(TouchableOpacity);

function AnimatedButton(props) {
  const [AR] = React.useState(new Animated.Value(0));
  const [EN] = React.useState(new Animated.Value(0));

  const ArColor = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, SecondaryColor],
  });
  const EnColor = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, SecondaryColor],
  });
  const ArBorder = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [LightBorder, PrimaryBorder],
  });
  const EnBorder = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [LightBorder, PrimaryBorder],
  });

  const ArCircle = AR.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, PrimaryColor],
  });
  const EnCircle = EN.interpolate({
    inputRange: [0, 100],
    outputRange: [GrayColor, PrimaryColor],
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(AR, {
        toValue: props.Language === 'ar' ? 100 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(EN, {
        toValue: props.Language === 'en' ? 100 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [props.Language]);

  return (
    <View>
      <TO
        onPress={props.onPressArabic}
        style={[
          styles.TouchableOpacity,
          {
            backgroundColor: ArColor,
            borderColor: ArBorder,
          },
        ]}
      >
        <Text style={styles.TouchableOpacityText}>عربي</Text>
        <Animated.View style={[styles.Circle, { backgroundColor: ArCircle }]} />
      </TO>
      <TO
        onPress={props.onPressEnglish}
        style={[
          styles.TouchableOpacity,
          {
            backgroundColor: EnColor,
            borderColor: EnBorder,
          },
        ]}
      >
        <Text style={styles.TouchableOpacityText}>English</Text>
        <Animated.View style={[styles.Circle, { backgroundColor: EnCircle }]} />
      </TO>
    </View>
  );
}

export default inject('store')(observer(AnimatedButton));
