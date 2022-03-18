import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Cell } from "./Cell";

export const Row = memo(({ cells, row, setColoredCell, nbCells }) => {
  return (
    <View style={styles.container}>
      {[...Array(nbCells)].map((_, i) => (
        <Cell
          key={i}
          col={i}
          checked={cells.includes(i + nbCells * row)}
          pressedAction={() => setColoredCell(row, i)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
