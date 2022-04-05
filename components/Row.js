import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Cell } from "./Cell";

export const Row = memo(({ cells, row, setColoredCell, nbCells, pressedCell, cellcolor }) => {
  return (
    <View style={styles.container}>
      {[...Array(nbCells)].map((_, i) => (
        <Cell
          key={i}
          col={i}
          checked={cells[i]}
          pressedAction={setColoredCell ? (() => setColoredCell(row, i)) : null}
          pressedCell={((row+1)*(i+1)-1==pressedCell)}
          cellcolor={cellcolor}
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
