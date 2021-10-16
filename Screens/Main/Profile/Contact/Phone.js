import React from 'react';
import { Animated, TextInput, StyleSheet } from 'react-native';
import { width } from '../../../../Config/Layout';

function AnimatedPhone(props) {
  const [Match] = React.useState(new Animated.Value(0));
  const PhoneCheck = Match.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#4C4F56', '#E8505B', '#25AC71'],
  });

  React.useEffect(() => {
    if (props.CheckPhone === 'Success') {
      Animated.timing(Match, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (props.CheckPhone === 'Error') {
      Animated.timing(Match, {
        toValue: 50,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(Match, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [props.CheckPhone]);

  return (
    <Animated.View
      style={[
        styles.ViewStyle,
        {
          borderColor: PhoneCheck,
        },
      ]}
    >
      <TextInput {...props} />
    </Animated.View>
  );
}

export default AnimatedPhone;

const styles = StyleSheet.create({
  ViewStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    height: 45,
    marginBottom: 10,
    justifyContent: 'center',
    width: width - 30,
  },
});
