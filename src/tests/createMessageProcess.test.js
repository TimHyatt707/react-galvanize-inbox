import createMessage from './../api/createMessage';
import createMessageProcess from './../redux/thunks/createMessageProcess';
jest.mock('./../api/createMessage');

let record = {
  id: 2,
  subject:
    "connecting the system won't do anything, we need to input the mobile AI panel!",
  read: false,
  starred: false,
  labels: []
};

describe('createMessageProcess should call the API, get correct data, and dispatch', () => {
  it('calls API,return data, dispatch', () => {
    const thunk = createMessageProcess();
    expect(typeof thunk).toBe('function');

    const dispatch = jest.fn();
    const getState = () => ({});
    createMessage.mockReturnValueOnce(Promise.resolve(record));
    return thunk(dispatch, getState).then(message => {
      expect(createMessage).toBeCalled();
      expect(message).toEqual(record);
      expect(dispatch).toBeCalledWith({
        type: 'ON_CREATE_MESSAGE',
        record: record
      });
    });
  });
});
