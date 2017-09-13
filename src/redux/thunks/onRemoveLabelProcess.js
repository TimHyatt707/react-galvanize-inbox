import updateMessage from './../../api/updateMessage';

export default function onRemoveLabelProcess(messageId, changes) {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(message => {
      dispatch({ type: 'ON_REMOVE_LABEL', message });
      return message;
    });
  };
}
