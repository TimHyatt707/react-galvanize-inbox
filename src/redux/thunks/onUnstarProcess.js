import updateMessage from './../../api/updateMessage';

export default function onUnstarProcess(messageId, changes) {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(message => {
      dispatch({ type: 'ON_UNSTAR', message });
      return message;
    });
  };
}
