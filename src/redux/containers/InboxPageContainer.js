import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import InboxPage from '../../components/InboxPage';
import getMessagesProcess from './../thunks/getMessagesProcess';
import markAsReadProcess from './../thunks/markAsReadProcess';
import onStarProcess from './../thunks/onStarProcess';
import onUnstarProcess from './../thunks/onUnstarProcess';
import onMarkAsReadProcess from './../thunks/onMarkAsReadProcess';
import onMarkAsUnreadProcess from './../thunks/onMarkAsUnreadProcess';
import onApplyLabelProcess from './../thunks/onApplyLabelProcess';
import onRemoveLabelProcess from './../thunks/onRemoveLabelProcess';
import DeleteMessageProcess from './../thunks/DeleteMessageProcess';
import createMessageProcess from './../thunks/createMessageProcess';

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    showComposeForm: state.showComposeForm,
    selectedMessageIds: state.selectedMessageIds,
    selectedMessageCount: state.selectedMessageCount
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(getMessagesProcess()),
    onMarkReadMessage: (messageId, changes) =>
      dispatch(markAsReadProcess(messageId, changes)),
    onSelectMessage: messageId => dispatch({ type: 'ON_SELECT', messageId }),
    onDeselectMessage: messageId =>
      dispatch({ type: 'ON_DESELECT', messageId }),
    onStarMessage: (messageId, changes) =>
      dispatch(onStarProcess(messageId, changes)),
    onUnstarMessage: (messageId, changes) =>
      dispatch(onUnstarProcess(messageId, changes)),
    onSelectAllMessages: () => dispatch({ type: 'ON_SELECT_ALL' }),
    onDeselectAllMessages: () => dispatch({ type: 'ON_DESELECT_ALL' }),
    onMarkAsReadSelectedMessages: (messageId, changes) =>
      dispatch(onMarkAsReadProcess(messageId, changes)),
    onMarkAsUnreadSelectedMessages: (messageId, changes) =>
      dispatch(onMarkAsUnreadProcess(messageId, changes)),
    onApplyLabelSelectedMessages: (messageId, changes) =>
      dispatch(onApplyLabelProcess(messageId, changes)),
    onRemoveLabelSelectedMessages: (messageId, changes) =>
      dispatch(onRemoveLabelProcess(messageId, changes)),
    onDeleteSelectedMessage: messageId =>
      dispatch(DeleteMessageProcess(messageId)),
    onOpenComposeForm: () => dispatch({ type: 'OPEN_FORM' }),
    onCancel: () => dispatch({ type: 'CLOSE_FORM' }),
    onSubmit: newMsg => dispatch(createMessageProcess(newMsg))
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
});

export default compose(connectToStore, onDidMount)(InboxPage);
