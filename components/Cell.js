import { memo, useCallback } from "react";

import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

export const Cell = memo(({ pressedAction, checked }) => {
  const getColor = useCallback(() => {
    return checked ? "orange" : "yellow";
  }, [checked]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={pressedAction}>
        <View style={[styles.cell, { backgroundColor: getColor() }]} />
      </TouchableWithoutFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  cell: {
    borderColor: "black",
    borderWidth: 0.5,
    width: 52,
    height: 52,
  },
});
