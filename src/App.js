import React from 'react';
// import logo from './logo.svg';
import './App.css';
import getMessages from './api/getMessages';
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
    console.log('index selectedMessageCount:', this.state.selectedMessageCount);
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
    console.log('selectedmessagefunction');
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
        this.setState({ messages: value });
      }
    }
  }

  _onUnstarMessage(messageId) {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].id === messageId) {
        const value = this.state.messages;
        value[i].starred = false;
        this.setState({ messages: value });
      }
    }
  }

  _onOpenComposeForm() {
    const val = true;
    this.setState({ showComposeForm: val });
  }

  _onSelectAllMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      if (!this.state.messages[i].selected) {
        this._onSelectMessage(this.state.messages[i].id);
        this.render();
      }
    }
  }
  _onDeselectAllMessages() {
    this.setState({ selectedMessageCount: 0 });
    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].selected) {
        this._onDeselectMessage(this.state.messages[i].id);
        this.render();
      }
    }
  }

  _onMarkAsReadSelectedMessages() {
    for (let i = 0; i < this.state.messages.length; i++) {
      let index = this.state.selectedMessageIds.indexOf(
        this.state.messages[i].id
      );
      if (this.state.messages[i].id === this.state.selectedMessageIds[index]) {
        const value = this.state.messages;
        value[i].read = true;
        value[i].unread = false;
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
        value[i].unread = true;
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
        value[i].labels.push(label);
        this.setState({ messages: value });
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
        this.setState({ messages: value });
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
      }
    }
  }

  _onSubmit(subject, body) {
    const value = this.state.messages;
    let newMsg = {};
    newMsg.id = this.state.messages.length + 1;
    newMsg.subject = subject;
    newMsg.body = body;
    newMsg.labels = [];
    value.push(newMsg);
    this.setState({ messages: value });
  }

  _onCancel() {
    this.setState({ showComposeForm: null });
  }
}
