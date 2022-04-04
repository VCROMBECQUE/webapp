import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Row } from "./Row";
import { useState, useCallback, useEffect } from "react";
import { range } from "../utils/filters";
import { patternGenerator } from "../utils/patterngenerator";
import ConfettiCannon from 'react-native-confetti-cannon';

export const Game = () => {
  const [gamesize, setGamesize] = useState(5);
  const [resetmatrice, setResetmatrice] = useState(() => patternGenerator(gamesize));
  const [matrice, setMatrice] = useState(resetmatrice);
  const [click, setClick] = useState(0);
  const [pressedcell, setPressedcell] = useState(null);
  const [iswin, setIswin] = useState(false)

  useEffect(() => {
    setMatrice(resetmatrice)
  }, [resetmatrice,setMatrice]);

  useEffect(() => {
    if (Object.values(matrice).every(m => m) ) {
      setIswin(true)
    }
    else {
      setIswin(false)
    }
  }, [matrice]);

  const setColoredCell = useCallback(
    (row, cell_id) => {
      setClick((prevState) => prevState + 1);
      const cell = cell_id + gamesize * row;
      setPressedcell(cell)
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
      <Text style={styles.white}>{click}</Text>
      <TouchableOpacity
        onPress={() => {
          setClick(0);
          setMatrice(resetmatrice);
        }}
      >
        <Text style={styles.white}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setClick(0);
          setResetmatrice(() => patternGenerator(gamesize));
        }}
      >
        <Text style={styles.white}>New map</Text>
      </TouchableOpacity>
      {[...Array(gamesize)].map((_, i) => (
        <Row
          key={i}
          row={i}
          nbCells={gamesize}
          cells={filterMatriceByRow(i)}
          setColoredCell={setColoredCell}
          pressedCell={pressedcell}
        />
      ))}
      {/* {iswin?<ConfettiCannon count={100} origin={{x: -10, y: 0}} onAnimationEnd={setIswin(false)}/>:null} */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  white: {
    color: "white",
  },
});
