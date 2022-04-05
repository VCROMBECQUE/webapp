import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Row } from "./Row";
import { useState, useCallback, useEffect } from "react";
import { range } from "../utils/filters";
import { patternGenerator } from "../utils/patterngenerator";

const GAME_PENALITY = 15;

export const Game = () => {
  const [gamesize, setGamesize] = useState(1);
  const [backupgame, setBackupgame] = useState(() =>
    patternGenerator(gamesize)
  );
  const [matrice, setMatrice] = useState(backupgame[0]);
  const [solution, setSolution] = useState(backupgame[1]);
  const [click, setClick] = useState(0);
  const [pressedcell, setPressedcell] = useState(null);
  const [iswin, setIswin] = useState(false);
  const [gamecolor, setGamecolor] = useState(backupgame[2]);

  useEffect(() => {
    setMatrice(backupgame[0]);
    setSolution(backupgame[1]);
    setGamecolor(backupgame[2]);
  }, [backupgame, setMatrice, setSolution]);

  const checkMatriceComplete = useCallback(
    (mat) => {
      if (Object.values(mat).every((m) => m)) {
        setGamecolor("#7DB700");
        setIswin(true);
      } else {
        setIswin(false);
      }
    },
    [setGamecolor, setIswin]
  );

  const setColoredCell = useCallback(
    (row, cell_id, penality = 1) => {
      setClick((prevState) => prevState + 1 * penality);
      const cell = cell_id + gamesize * row;
      setPressedcell(cell);

      editSolution(cell);

      const cellsToUpdate = getNormalizedChange(cell, row);
      const updatedMatrice = { ...matrice };
      cellsToUpdate.forEach((cell) => {
        updatedMatrice[cell] = !updatedMatrice[cell];
      });

      setMatrice(updatedMatrice);
      checkMatriceComplete(updatedMatrice);
    },
    [getNormalizedChange, matrice]
  );

  const editSolution = useCallback(
    (cell) => {
      if (solution.includes(cell)) {
        setSolution((prevSol) => prevSol.filter((_sol) => _sol != cell));
      } else {
        setSolution((prevSol) => [...prevSol, cell]);
      }
    },
    [solution, setSolution]
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

  const useHelpToResolveGame = useCallback(() => {
    if (solution == null || iswin) {
      return;
    }

    const sol = [...solution];
    const help = sol[0];
    const helprow = Math.floor(help / gamesize);
    const helpcell = help % gamesize;

    setColoredCell(helprow, helpcell, GAME_PENALITY);
  }, [solution, setColoredCell, setSolution]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginTop: Platform ? (Platform.OS === "android" ? 35 : 0) : 0 },
      ]}
    >
      <Text style={styles.compter}>{click}</Text>

      {[...Array(gamesize)].map((_, i) => (
        <Row
          key={i}
          row={i}
          nbCells={gamesize}
          cells={filterMatriceByRow(i)}
          setColoredCell={iswin ? null : setColoredCell}
          pressedCell={pressedcell}
          cellcolor={gamecolor}
        />
      ))}

      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#007dB7" }]}
          onPress={() => {
            setClick(0);
            setIswin(false);
            setBackupgame(() => patternGenerator(gamesize));
          }}
        >
          <Text style={[styles.textbtn, { color: "white" }]}>New</Text>
        </TouchableOpacity>
        {iswin ? (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#7DB700" }]}
            onPress={() => {
              setGamesize((prevgamesize) => (prevgamesize % 8) + 1);
              setClick(0);
              setIswin(false);
              setBackupgame(() => patternGenerator((gamesize % 8) + 1));
            }}
          >
            <Text style={styles.textbtn}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              useHelpToResolveGame();
            }}
          >
            <Text style={styles.textbtn}>Help</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#B70000" }]}
          onPress={() => {
            setClick(0);
            setIswin(false);
            setGamecolor(backupgame[2]);
            setSolution(backupgame[1]);
            setMatrice(backupgame[0]);
          }}
        >
          <Text style={[styles.textbtn, { color: "white" }]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  btncontainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  compter: {
    fontSize: 120,
    color: "white",
  },
  textbtn: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
