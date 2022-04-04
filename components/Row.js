import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Cell } from "./Cell";

export const Row = memo(({ cells, row, setColoredCell, nbCells, pressedCell }) => {
  return (
    <View style={styles.container}>
      {[...Array(nbCells)].map((_, i) => (
        <Cell
          key={i}
          size={nbCells}
          row={row}
          col={i}
          checked={cells[i]}
          pressedAction={() => setColoredCell(row, i)}
          pressedCell={((row+1)*(i+1)-1==pressedCell)}
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
