import deleteMessage from './../../api/deleteMessage';

export default function DeleteMessageProcess(messageId) {
  return (dispatch, getState) => {
    return deleteMessage(messageId).then(
      dispatch({ type: 'ON_DELETE_MESSAGE', messageId })
    );
  };
}
