import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import {
  PrimaryColor,
  SecondaryColor,
  SecondaryText,
  PrimaryBorder,
  PrimaryText,
} from '../../../Config/ColorPalette';
import styles from './Style';
import { inject, observer } from 'mobx-react';
import { ProfileStrings } from '../../../Config/Strings';

function AnimatedButton(props) {
  const [M] = React.useState(new Animated.Value(0));
  const [F] = React.useState(new Animated.Value(0));

  const MColor = M.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  });
  const FColor = F.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', SecondaryColor],
  });
  const MBorder = M.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryText, PrimaryBorder],
  });
  const FBorder = F.interpolate({
    inputRange: [0, 100],
    outputRange: [SecondaryText, PrimaryBorder],
  });

  const MText = M.interpolate({
    inputRange: [0, 100],
    outputRange: [PrimaryText, PrimaryColor],
  });
  const FText = F.interpolate({
    inputRange: [0, 100],
    outputRange: [PrimaryText, PrimaryColor],
  });

  const MShadow = M.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  });
  const FShadow = F.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(M, {
        toValue: props.GenderValue === 'male' ? 100 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(F, {
        toValue: props.GenderValue === 'female' ? 100 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [props.GenderValue]);

  return (
    <View style={styles.Gender}>
      <TouchableOpacity
        onPress={props.onPressMale}
        style={styles.TouchableOpacityContainer}
      >
        <Animated.View
          style={[
            styles.TouchableOpacityFirst,
            {
              backgroundColor: MColor,
              borderColor: MBorder,
              shadowRadius: MShadow,
              elevation: MShadow,
            },
          ]}
        >
          <Animated.Text style={{ color: MText }}>
            {ProfileStrings.Male}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onPressFemale}
        style={styles.TouchableOpacityContainer}
      >
        <Animated.View
          style={[
            styles.TouchableOpacity,
            {
              backgroundColor: FColor,
              borderColor: FBorder,
              shadowRadius: FShadow,
              elevation: FShadow,
            },
          ]}
        >
          <Animated.Text style={{ color: FText }}>
            {ProfileStrings.Female}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

export default inject('store')(observer(AnimatedButton));
