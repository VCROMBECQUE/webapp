import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Row } from "./Row";
import { useState, memo, useCallback } from "react";
import { range } from "../filters";
import { patternGenerator } from "../patterngenerator";

// const patterns = [
//   {
//     name: "damiertest2",
//     size: 5,
//     matrice: {},
//   },
// ];

export const Game = () => {
  const [gamesize, setGamesize] = useState(5);
  const [resetmatrice, setResetmatrice] = useState(patternGenerator(gamesize));
  const [matrice, setMatrice] = useState(resetmatrice);
  const [click, setClick] = useState(0);

  const setColoredCell = useCallback(
    (row, cell_id) => {
      setClick((prevState) => prevState + 1);
      const cell = cell_id + gamesize * row;
      const cellsToUpdate = getNormalizedChange(cell, row);
      const updatedMatrice = { ...matrice };
      cellsToUpdate.forEach((cell) => {
        updatedMatrice[cell] = !updatedMatrice[cell];
      });
      setMatrice(updatedMatrice);
    },
    [getNormalizedChange, matrice]
  );

  const getNormalizedChange = useCallback(
    (cell, row) => {
      const result = [cell];
      if (cell - gamesize >= 0) {
        result.push(cell - gamesize);
      }
      if (cell + gamesize < gamesize * gamesize) {
        result.push(cell + gamesize);
      }
      if (cell - 1 >= row * gamesize) {
        result.push(cell - 1);
      }
      if (cell + 1 <= gamesize * (1 + row) - 1) {
        result.push(cell + 1);
      }
      return result;
    },
    [gamesize]
  );

  const filterMatriceByRow = useCallback(
    (row) => {
      const min = row * gamesize;
      const max = (row + 1) * gamesize - 1;
      const between = [...range(min, max)];

      const cells = [];
      between.forEach((cell) => {
        cells.push(matrice[cell]);
      });

      return cells;
    },
    [matrice, gamesize]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>{click}</Text>
      <TouchableOpacity
        onPress={() => {
          setClick(0);
          setMatrice(resetmatrice);
        }}
      >
        <Text>Reset</Text>
      </TouchableOpacity>
      
      {[...Array(gamesize)].map((_, i) => (
        <Row
          key={i}
          row={i}
          nbCells={gamesize}
          cells={filterMatriceByRow(i)}
          setColoredCell={setColoredCell}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
