import React from 'react';
// import logo from './logo.svg';
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
  state = {
    messages: [],
    showComposeForm: null,
    selectedMessageIds: [],
    selectedMessageCount: 0
  };

  componentDidMount() {
    getMessages().then(records => this.setState({ messages: records }));
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
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].id === messageId) {
        const value = this.state.messages;
        value[i].read = true;
        this.setState({ messages: value });
        this.render();
      }
    }
  }
  _onSelectMessage(messageId) {
    let index = this.state.selectedMessageIds.indexOf(messageId);
    if (this.state.selectedMessageIds[index]) {
      return false;
    } else {
      const value = this.state.selectedMessageIds;
      let num = this.state.selectedMessageCount;
      num++;
      value.push(messageId);
      this.setState({ selectedMessageIds: value });
      this.setState({ selectedMessageCount: num });
    }
  }
  _onDeselectMessage(messageId) {
    let index = this.state.selectedMessageIds.indexOf(messageId);
    const value = this.state.selectedMessageIds;
    let num = this.state.selectedMessageCount;
    value.splice(index, 1);
    num--;
    this.setState({ selectedMessageIds: value });
    this.setState({ selectedMessageCount: num });
  }
  _onStarMessage(messageId) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].id === messageId) {
        const value = this.state.messages;
        value[i].starred = true;
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = value[i].starred;
        obj.subject = value[i].subject;
        obj.body = value[i].body;
        this.setState({ messages: value });
        updateMessage(this.state.messages[i].id, obj);
      }
    }
  }

  _onUnstarMessage(messageId) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].id === messageId) {
        const value = this.state.messages;
        value[i].starred = false;
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = value[i].starred;
        obj.subject = value[i].subject;
        obj.body = value[i].body;
        this.setState({ messages: value });
        updateMessage(this.state.messages[i].id, obj);
      }
    }
  }

  _onOpenComposeForm() {
    const val = true;
    this.setState({ showComposeForm: val });
  }

  _onSelectAllMessages() {
    const value = this.state.selectedMessageIds;
    let num = this.state.selectedMessageCount;
    num = this.state.messages.length;
    for (let i = 0; i < this.state.messages.length; i++) {
      if (!this.state.messages[i].selected) {
        value.push(this.state.messages[i].id);
      }
    }
    this.setState({
      selectedMessageIds: value,
      selectedMessageCount: num
    });
  }
  _onDeselectAllMessages() {
    const num = 0;
    const value = [];
    this.setState({
      selectedMessageIds: value,
      selectedMessageCount: num
    });
  }

  _onMarkAsReadSelectedMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        const value = this.state.messages;
        value[i].read = true;
        // value[i].unread = false;
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = value[i].starred;
        obj.subject = value[i].subject;
        obj.body = value[i].body;
        updateMessage(this.state.messages[i].id, obj);
        this.setState({ messages: value });
      }
    }
  }

  _onMarkAsUnreadSelectedMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        const value = this.state.messages;
        value[i].read = false;
        let obj = {};
        obj.read = this.state.messages[i].read;
        obj.starred = value[i].starred;
        obj.subject = value[i].subject;
        obj.body = value[i].body;
        // value[i].unread = true;
        updateMessage(this.state.messages[i].id, obj);
        this.setState({ messages: value });
      }
    }
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
    this.setState({ showComposeForm: null });
  }
}
