import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  input: {
    paddingLeft: 10,
    backgroundColor: '#bfbfbf',
    borderRadius: 100,
    width: 380,
    height: 35,
    color: '#000',
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  Arrowbacksharp: {
    marginTop: 0,
    alignSelf: 'flex-start',
  },
});

export default styles;
