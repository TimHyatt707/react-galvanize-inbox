import updateMessage from './../../api/updateMessage';

export default function onMarkAsReadProcess(messageId, changes) {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(message => {
      dispatch({ type: 'ON_UPDATE', message });
      return message;
    });
  };
}
