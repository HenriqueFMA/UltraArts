import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Input: {
    paddingLeft: 10,
        backgroundColor: '#bfbfbf',
        borderRadius: 100,
        width: 380,
        height: 35,
        color: '#',
        padding: 6,
        fontSize: 16,
        textAlignVertical: 'center',
        marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    marginLeft:"auto",
    marginRight:"auto"  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
    marginTop: "5%",
  },
  Arrowbacksharp: {
    marginTop: 20,

},
});

export default styles;