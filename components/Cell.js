import { memo, useEffect, useRef } from "react";

import { Animated, StyleSheet, View, Pressable } from "react-native";

export const Cell = memo(({ pressedAction, checked, pressedCell , cellcolor }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    const fadeIndelay = pressedCell ? 0 : 1
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300*fadeIndelay,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    const fadeOutdelay = pressedCell ? 0 : 1
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300*fadeOutdelay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    checked ? fadeIn() : fadeOut();
  }, [checked]);

  return (
    <View>
      <Pressable style={styles.cell} onPress={pressedAction}>
        <Animated.View style={[styles.animcell, {opacity: fadeAnim , backgroundColor: cellcolor}]}/>
      </Pressable>
    </View>
  );
}); 

const styles = StyleSheet.create({
  cell: {
    borderColor: "black",
    borderWidth: 1,
    width: 51,
    height: 51,
    backgroundColor: "white"
  },
  animcell:{
    width: "100%",
    height: "100%",
  }
});
