import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from './Style';
import { PrimaryColor } from '../../../../Config/ColorPalette';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

function AnimatedButtonSelect(props) {
  const [First] = React.useState(new Animated.Value(0));
  const FirstColor = First.interpolate({
    inputRange: [0, 100],
    outputRange: ['#fff', PrimaryColor],
  });

  React.useEffect(() => {
    Animated.timing(First, {
      toValue: props.Shift ? 100 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [props.Shift]);

  return (
    <View>
      {props.Disabled ? (
        <AnimatedTouchableOpacity disabled={true} style={styles.ShiftButton}>
          <Animated.Text style={styles.shift}>{props.FullText}</Animated.Text>
        </AnimatedTouchableOpacity>
      ) : (
        <AnimatedTouchableOpacity
          onPress={props.onPress}
          style={styles.ShiftButtonSelect}
        >
          <AnimatedTouchableOpacity
            onPress={props.onPress}
            style={[styles.SelectCircle]}
          >
            <AnimatedTouchableOpacity
              onPress={props.onPress}
              style={[
                styles.SelectCircleSmall,
                { backgroundColor: FirstColor },
              ]}
            />
          </AnimatedTouchableOpacity>
          <Animated.Text style={[styles.shift]}>{props.Value}</Animated.Text>
        </AnimatedTouchableOpacity>
      )}
    </View>
  );
}

export default AnimatedButtonSelect;
