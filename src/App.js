import React from 'react';
import './App.css';
import getMessagesProcess from './redux/thunks/getMessagesProcess';
import markAsReadProcess from './redux/thunks/markAsReadProcess';
import onStarProcess from './redux/thunks/onStarProcess';
import onUnstarProcess from './redux/thunks/onUnstarProcess';
import onMarkAsReadProcess from './redux/thunks/onMarkAsReadProcess';
import onMarkAsUnreadProcess from './redux/thunks/onMarkAsUnreadProcess';
import onApplyLabelProcess from './redux/thunks/onApplyLabelProcess';
import onRemoveLabelProcess from './redux/thunks/onRemoveLabelProcess';
import DeleteMessageProcess from './redux/thunks/DeleteMessageProcess';
import createMessageProcess from './redux/thunks/createMessageProcess';
import InboxPageLayout from './components/InboxPageLayout';
import ToolbarComponent from './components/ToolbarComponent';
import MessagesComponent from './components/MessagesComponent';
import ComposeFormComponent from './components/ComposeFormComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    };
    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }
  componentDidMount() {
    this.props.store.dispatch(getMessagesProcess());
  }
  render() {
    return (
      <InboxPageLayout
        messages={this.state.messages}
        selectedMessageIds={this.state.selectedMessageIds}>
        <ToolbarComponent
          messages={this.state.messages}
          selectedMessageCount={this.state.selectedMessageCount}
          onOpenComposeForm={this._onOpenComposeForm.bind(this)}
          onSelectAllMessages={this._onSelectAllMessages.bind(this)}
          onDeselectAllMessages={this._onDeselectAllMessages.bind(this)}
          onMarkAsReadSelectedMessages={this._onMarkAsReadSelectedMessages.bind(
            this
          )}
          onMarkAsUnreadSelectedMessages={this._onMarkAsUnreadSelectedMessages.bind(
            this
          )}
          onApplyLabelSelectedMessages={this._onApplyLabelSelectedMessages.bind(
            this
          )}
          onRemoveLabelSelectedMessages={this._onRemoveLabelSelectedMessages.bind(
            this
          )}
          onDeleteSelectedMessages={this._onDeleteSelectedMessages.bind(this)}
        />
        <MessagesComponent
          messages={this.state.messages}
          selectedMessageIds={this.state.selectedMessageIds}
          onMarkReadMessage={this._onMarkReadMessage.bind(this)}
          onSelectMessage={this._onSelectMessage.bind(this)}
          onDeselectMessage={this._onDeselectMessage.bind(this)}
          onStarMessage={this._onStarMessage.bind(this)}
          onUnstarMessage={this._onUnstarMessage.bind(this)}
        />
        <ComposeFormComponent
          onSubmit={this._onSubmit.bind(this)}
          onCancel={this._onCancel.bind(this)}
          showComposeForm={this.state.showComposeForm}
        />
      </InboxPageLayout>
    );
  }

  _onMarkReadMessage(messageId) {
    let updatedMessage = {};
    updatedMessage.read = true;
    // updatedMessage.id = messageId;
    this.props.store.dispatch(markAsReadProcess(messageId, updatedMessage));
  }
  _onSelectMessage(messageId) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (
        this.state.messages[i].id === messageId &&
        this.state.selectedMessageIds.indexOf(messageId) === -1
      ) {
        this.props.store.dispatch({ type: 'ON_SELECT', messageId });
      }
    }
  }
  _onDeselectMessage(messageId) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].id === messageId) {
        this.props.store.dispatch({ type: 'ON_DESELECT', messageId });
      }
    }
  }
  _onStarMessage(messageId) {
    let updatedMessage = {};
    updatedMessage.starred = true;
    this.props.store.dispatch(onStarProcess(messageId, updatedMessage));
  }

  _onUnstarMessage(messageId) {
    let updatedMessage = {};
    updatedMessage.starred = false;
    this.props.store.dispatch(onUnstarProcess(messageId, updatedMessage));
  }
  _onSelectAllMessages() {
    let array = [];
    for (let i = 0; i < this.state.messages.length; i++) {
      array.push(this.state.messages[i].id);
    }
    this.props.store.dispatch({ type: 'ON_SELECT_ALL', array });
  }
  _onDeselectAllMessages() {
    this.props.store.dispatch({ type: 'ON_DESELECT_ALL' });
  }
  _onMarkAsReadSelectedMessages() {
    let array = this.state.messages;
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        let obj = {};
        array[i].read = true;
        obj.read = true;
        this.props.store.dispatch(
          onMarkAsReadProcess(this.state.messages[i].id, obj)
        );
      }
    }
  }

  _onMarkAsUnreadSelectedMessages() {
    let array = this.state.messages;
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        let obj = {};
        array[i].read = false;
        obj.read = false;
        this.props.store.dispatch(
          onMarkAsUnreadProcess(this.state.messages[i].id, obj)
        );
      }
    }
  }

  _onApplyLabelSelectedMessages(label) {
    let array = this.state.messages;
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        let obj = {};
        array[i].labels.push(label);
        obj.labels = array[i].labels.join(',');
        this.props.store.dispatch(onApplyLabelProcess(array[i].id, obj));
      }
    }
  }

  _onRemoveLabelSelectedMessages(label) {
    let array = this.state.messages;
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        let obj = {};
        let labelIndex = this.state.messages[i].labels.indexOf(label);
        array[i].labels.splice(labelIndex, 1);
        obj.labels = array[i].labels.join(',');
        this.props.store.dispatch(onRemoveLabelProcess(array[i].id, obj));
      }
    }
  }

  _onDeleteSelectedMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        this.props.store.dispatch(
          DeleteMessageProcess(this.state.messages[i].id)
        );
      }
    }
  }
  _onOpenComposeForm() {
    this.props.store.dispatch({ type: 'OPEN_FORM' });
  }
  _onSubmit(subject, body) {
    let newMsg = {};
    newMsg.subject = subject;
    newMsg.body = body;
    this.props.store.dispatch(createMessageProcess(newMsg));
  }

  _onCancel() {
    this.props.store.dispatch({ type: 'CLOSE_FORM' });
  }
}
