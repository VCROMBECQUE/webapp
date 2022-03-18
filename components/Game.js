import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Row } from "./Row";
import { useState, memo, useCallback } from "react";
import { range } from "../filters";

const patterns = [
  {
    name: "damiertest",
    size: 3,
    matrice: [],
  },
  {
    name: "damier",
    size: 5,
    matrice: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
  },
  {
    name: "damier2",
    size: 7,
    matrice: [
      0, 1, 3, 5, 6, 7, 8, 10, 12, 13, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27,
      30, 31, 32, 35, 36, 38, 40, 41, 42, 43, 45, 47, 48,
    ],
  },
  {
    name: "damier3",
    size: 7,
    matrice: [
      0, 1, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 22, 26, 29, 30, 31,
      32, 33, 35, 36, 37, 39, 40, 41, 42, 45, 48,
    ],
  },
  {
    name: "damier4",
    size: 7,
    matrice: [
      1, 5, 8, 9, 10, 11, 12, 15, 16, 18, 19, 21, 22, 23, 24, 25, 26, 27, 29,
      31, 33, 35, 36, 37, 39, 40, 41, 43, 47,
    ],
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
      const newchange = getNormalizedChange(cell, row);
      const updatedMatrice = [...matrice];
      newchange.forEach((elem_newchange) => {
        if (elem_newchange >= 0) {
          if (updatedMatrice.includes(elem_newchange)) {
            updatedMatrice.splice(updatedMatrice.indexOf(elem_newchange), 1);
          } else {
            updatedMatrice.push(elem_newchange);
          }
        }
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
      const copyMatrice = [...matrice];
      const filter = copyMatrice.filter((current) => between.includes(current));
      return filter;
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
