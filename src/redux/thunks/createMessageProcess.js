import createMessage from './../../api/createMessage.js';

export default function createNoteProcess(message) {
  return (dispatch, getState) => {
    return createMessage(message).then(record => {
      dispatch({ type: 'ON_CREATE_MESSAGE', record });
      return record;
    });
  };
}
