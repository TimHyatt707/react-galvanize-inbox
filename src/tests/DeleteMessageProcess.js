import deleteMessage from './../api/deleteMessage';
import DeleteMessageProcess from './../redux/thunks/DeleteMessageProcess';
jest.mock('./../api/deleteMessage');

let messageId = 3;

describe('DeleteMessageProcess should call the API, delete a message, and dispatch', () => {
  it('calls API,deletes message, dispatch', () => {
    const thunk = DeleteMessageProcess();
    expect(typeof thunk).toBe('function');

    const dispatch = jest.fn();
    const getState = () => ({});
    deleteMessage();
    return thunk(dispatch, getState).then(message => {
      expect(deleteMessage).toBeCalled();
      expect(dispatch).toBeCalledWith({
        type: 'ON_DELETE_MESSAGE',
        messageId: messageId
      });
    });
  });
});
