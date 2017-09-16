import updateMessage from './../api/updateMessage';
import updateMessageProcess from './../redux/thunks/updateMessageProcess';
jest.mock('./../api/updateMessage');

let messageId = 2;
let changes = {};

describe('updateMessageProcess should call the API, change data, and dispatch', () => {
  //>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('calls API', () => {
    const thunk = updateMessageProcess();
    expect(typeof thunk).toBe('function');
    changes.starred = true;

    const dispatch = jest.fn();
    const getState = () => ({});
    updateMessage.mockReturnValueOnce(Promise.resolve(messageId, changes));
    return thunk(dispatch, getState).then(message => {
      expect(updateMessage).toBeCalled();
      expect(messageId).toEqual(messageId);
      expect(dispatch).toBeCalledWith({
        type: 'ON_UPDATE',
        message: message
      });
    });
  });
});
