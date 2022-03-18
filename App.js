import { StyleSheet } from "react-native";
import { Game } from "./components/Game"


export default function App() {
  return (
    <Game style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
