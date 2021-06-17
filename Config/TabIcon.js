import * as React from 'react';
import { Feather } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { PrimaryColor } from './ColorPalette';

function TabIcon(props) {
  const [ImageLoadE] = React.useState(new Animated.Value(0));
  const [ImageLoadN] = React.useState(new Animated.Value(0));
  const [ImageLoadH] = React.useState(new Animated.Value(0));
  const [isE, setE] = React.useState(0);
  const [isN, setN] = React.useState(0);
  const [isH, setH] = React.useState(0);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(ImageLoadE, {
        toValue: props.store.EarningsBadge ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ImageLoadN, {
        toValue: props.store.NotificationMain ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ImageLoadH, {
        toValue: props.store.HistoryBadge ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    setE(props.store.EarningsBadgeNumber);
    setN(props.store.HistoryBadgeNumber);
    setH(props.store.NotificationMainNumber);
  }, [
    props.store.EarningsBadge,
    props.store.NotificationMain,
    props.store.HistoryBadge,
    props.store.EarningsBadgeNumber,
    props.store.HistoryBadgeNumber,
    props.store.NotificationMainNumber,
  ]);

  return (
    <View>
      <Feather
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style}
      />
      {props.name === 'home' ? null : props.name === 'user' ? (
        <Animated.View style={[styles.one, { opacity: ImageLoadE }]}>
          <Text style={styles.text}>{isE <= 0 ? '' : isE}</Text>
        </Animated.View>
      ) : props.name === 'bell' ? (
        <Animated.View style={[styles.two, { opacity: ImageLoadN }]}>
          <Text style={styles.text}>{isH <= 0 ? '' : isH}</Text>
        </Animated.View>
      ) : props.name === 'clipboard' ? (
        <Animated.View style={[styles.three, { opacity: ImageLoadH }]}>
          <Text style={styles.text}>{isN <= 0 ? '' : isN}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  one: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: PrimaryColor,
    borderRadius: 15 / 2,
    width: 15,
    height: 15,
    // padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  two: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: PrimaryColor,
    borderRadius: 15 / 2,
    width: 15,
    height: 15,
    // padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  three: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: PrimaryColor,
    borderRadius: 15 / 2,
    width: 15,
    height: 15,
    // padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
});

export default inject('store')(observer(TabIcon));
