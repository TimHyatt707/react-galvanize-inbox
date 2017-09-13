import updateMessage from './../../api/updateMessage';

export default function onMarkAsUnreadProcess(messageId, changes) {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(message => {
      dispatch({ type: 'ON_MARK_UNREAD_SELECTED', message });
      return message;
    });
  };
}
