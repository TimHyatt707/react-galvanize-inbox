import getMessages from './../../api/getMessages.js';

export default function getMessagesProcess() {
  return (dispatch, getState) => {
    return getMessages().then(messages => {
      dispatch({ type: 'SET_MESSAGES', messages });
      return messages;
    });
  };
}
