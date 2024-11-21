import { StyleSheet } from 'react-native';

export const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    width: '100%',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 24,
  },
  body: {
    flex: 1,
    backgroundColor: '#297ac9',
    
  },
  header: {
    backgroundColor:"#297ac9",
    alignItems: 'center',
    justifyContent: 'center',
  },
  Arrowbacksharp: {
    marginTop: 0,
    alignSelf: 'flex-start',
    backgroundColor:"#297ac9",

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '90%',
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    flex: 1, // Faz o TextInput ocupar o restante do espaço
    height: '100%',
    fontSize: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  containerList:{

    flex: 1,
    padding: 10,
  }
});
