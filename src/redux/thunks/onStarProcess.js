import updateMessage from './../../api/updateMessage';

export default function onStarProcess(messageId, changes) {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(message => {
      dispatch({ type: 'ON_STAR', message });
      return message;
    });
  };
}
