export default function rootReducer(
  currentState = {
    messages: [],
    showComposeForm: null,
    selectedMessageIds: [],
    selectedMessageCount: 0
  },
  action
) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...currentState, messages: action.messages };
    case 'ON_MARK_READ':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_SELECT':
      let selectCounter = currentState.selectedMessageCount;
      return {
        ...currentState,
        selectedMessageIds: [
          ...currentState.selectedMessageIds,
          action.messageId
        ],
        selectedMessageCount: selectCounter + 1
      };
    case 'ON_DESELECT':
      let deselectCounter = currentState.selectedMessageCount;
      return {
        ...currentState,
        selectedMessageIds: currentState.selectedMessageIds.filter(
          Id => Id !== action.messageId
        ),
        selectedMessageCount: deselectCounter - 1
      };
    case 'ON_STAR':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_UNSTAR':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'OPEN_FORM':
      return {
        ...currentState,
        showComposeForm: true
      };
    case 'CLOSE_FORM':
      return {
        ...currentState,
        showComposeForm: null
      };
    case 'ON_SELECT_ALL':
      return {
        ...currentState,
        selectedMessageIds: action.array,
        selectedMessageCount: currentState.messages.length
      };
    case 'ON_DESELECT_ALL':
      return {
        ...currentState,
        selectedMessageIds: [],
        selectedMessageCount: 0
      };
    case 'ON_MARK_READ_SELECTED':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_MARK_UNREAD_SELECTED':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_APPLY_LABEL':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_REMOVE_LABEL':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'ON_DELETE_MESSAGE':
      return {
        ...currentState,
        messages: currentState.messages.filter(
          message => message.id !== action.messageId
        )
      };
    case 'ON_CREATE_MESSAGE':
      return {
        ...currentState,
        messages: [...currentState.messages, action.record],
        selectedMessageIds: [
          ...currentState.selectedMessageIds,
          action.record.id
        ],
        selectedMessageCount: currentState.selectedMessageCount + 1
      };
    default:
      return currentState;
  }
}
