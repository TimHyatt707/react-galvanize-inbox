import React from 'react';
import './App.css';
import getMessages from './api/getMessages';
import updateMessage from './api/updateMessage';
import deleteMessage from './api/deleteMessage';
import createMessage from './api/createMessage';
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
    getMessages().then(messages =>
      this.props.store.dispatch({ type: 'SET_MESSAGES', messages })
    );
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
    updateMessage.id = messageId;
    updateMessage(messageId, updatedMessage).then(message => {
      this.props.store.dispatch({ type: 'ON_MARK_READ', message });
    });
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
    updateMessage.id = messageId;
    updateMessage(messageId, updatedMessage).then(message => {
      this.props.store.dispatch({ type: 'ON_STAR', message });
    });
  }

  _onUnstarMessage(messageId) {
    let updatedMessage = {};
    updatedMessage.starred = false;
    updateMessage.id = messageId;
    updateMessage(messageId, updatedMessage).then(message => {
      this.props.store.dispatch({ type: 'ON_STAR', message });
    });
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
        updateMessage(this.state.messages[i].id, obj);
      }
    }
    this.props.store.dispatch({ type: 'ON_MARK_READ_SELECTED', array });
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
        updateMessage(this.state.messages[i].id, obj);
      }
    }
    this.props.store.dispatch({ type: 'ON_MARK_UNREAD_SELECTED', array });
  }

  _onApplyLabelSelectedMessages(label) {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        const value = this.state.messages;
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = this.state.messages[i].starred;
        obj.subject = this.state.messages[i].subject;
        obj.body = this.state.messages[i].body;
        value[i].labels.push(label);
        obj.labels = value[i].labels.join(',');
        this.setState({ messages: value });
        updateMessage(value[i].id, obj);
      }
    }
  }

  _onRemoveLabelSelectedMessages(label) {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        let labelIndex = this.state.messages[i].labels.indexOf(label);
        const value = this.state.messages;
        value[i].labels.splice(labelIndex, 1);
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = this.state.messages[i].starred;
        obj.subject = this.state.messages[i].subject;
        obj.body = this.state.messages[i].body;
        obj.labels = value[i].labels.join(',');
        this.setState({ messages: value });
        updateMessage(this.state.messages[i].id, obj);
      }
    }
  }

  _onDeleteSelectedMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        const value = this.state.messages;
        value.splice(i, 1);
        this.setState({ messages: value });
        deleteMessage(this.state.messages[i].id);
      }
    }
  }
  _onOpenComposeForm() {
    this.props.store.dispatch({ type: 'OPEN_FORM' });
  }
  _onSubmit(subject, body) {
    const value = this.state.messages;
    let newMsg = {};
    newMsg.subject = subject;
    newMsg.labels = '';
    createMessage(newMsg).then(record => {
      value.push(newMsg);
    });
    this.setState({ messages: value });
  }

  _onCancel() {
    this.props.store.dispatch({ type: 'CLOSE_FORM' });
  }
}
