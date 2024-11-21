import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  newCommentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 5,
  },
});

export default styles;