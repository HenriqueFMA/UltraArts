
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#297ac9",
  },
  cabecario: {
    height: 75,
    backgroundColor: "#297ac9",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    marginBottom: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
  },
  conteudo: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 0,
  },
  searchBar: {
    backgroundColor: "#cbcaca",
    borderRadius: 50,
    padding: 10,
    width: "95%",
  },
  scrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
  },
  author: {
    fontStyle: "italic",
    color: "#666",
  },
  size: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#000",
  },
});
