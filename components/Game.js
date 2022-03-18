import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Row } from "./Row";
import { useState, memo, useCallback } from "react";
import { range } from "../filters";

const patterns = [
  {
    name: "damiertest",
    size: 7,
    matrice: {
      0 : false,
      1 : false,
      2 : false,
      3 : false,
      4 : false,
      5 : false,
      6 : false,
      7 : false,
      8 : false,
      9 : false,
      10 : false,
      11 : false,
      12 : false,
      13 : false,
      14 : false,
      15 : false,
      16 : false,
      17 : false,
      18 : false,
      19 : false,
      20 : false,
      21 : false,
      22 : false,
      23 : false,
      24 : false,
      25 : false,
      26 : false,
      27 : false,
      28 : false,
      29 : false,
      30 : false,
      31 : false,
      32 : false,
      33 : false,
      34 : false,
      35 : false,
      36 : false,
      37 : false,
      38 : false,
      39 : false,
      40 : false,
      41 : false,
      42 : false,
      43 : false,
      44 : false,
      45 : false,
      46 : false,
      47 : false,
      48 : false,
    },
  },
];

export const Game = () => {
  const [matrice, setMatrice] = useState(patterns[0].matrice);
  const [click, setClick] = useState(0);
  const [SIZE, setSIZE] = useState(patterns[0].size);

  const setColoredCell = useCallback(
    (row, cell_id) => {
      setClick((prevState) => prevState + 1);
      const cell = cell_id + SIZE * row;
      const cellsToUpdate = getNormalizedChange(cell, row);
      const updatedMatrice = {...matrice}
      cellsToUpdate.forEach((cell) => {
        updatedMatrice[cell] = !updatedMatrice[cell]
      });
      setMatrice(updatedMatrice);
    },
    [getNormalizedChange, matrice]
  );

  const getNormalizedChange = useCallback(
    (cell, row) => {
      const result = [cell];
      if (cell - SIZE >= 0) {
        result.push(cell - SIZE);
      }
      if (cell + SIZE < SIZE * SIZE) {
        result.push(cell + SIZE);
      }
      if (cell - 1 >= row * SIZE) {
        result.push(cell - 1);
      }
      if (cell + 1 <= SIZE * (1 + row) - 1) {
        result.push(cell + 1);
      }
      return result;
    },
    [SIZE]
  );

  const filterMatriceByRow = useCallback(
    (row) => {
      const min = row * SIZE;
      const max = (row + 1) * SIZE - 1;
      const between = [...range(min, max)];

      const cells = []
      between.forEach(cell => {
        cells.push(matrice[cell])
      })

      return cells;
    },
    [matrice, SIZE]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>{click}</Text>
      {patterns.map((pattern, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setClick(0);
              setSIZE(pattern.size);
              setMatrice(pattern.matrice);
            }}
          >
            <Text>{pattern.name}</Text>
          </TouchableOpacity>
        );
      })}

      {[...Array(SIZE)].map((_, i) => (
        <Row
          key={i}
          row={i}
          nbCells={SIZE}
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
