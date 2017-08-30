import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import InboxPageLayout from './components/InboxPageLayout';
import ToolbarComponent from './components/ToolbarComponent';
import MessagesComponent from './components/MessagesComponent';
import ComposeFormComponent from './components/ComposeFormComponent';

let showComposeForm = null;
const selectedMessageIds = [];
let selectedMessageCount = 0;

let data = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal']
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: []
  }
];

function onMarkReadMessage(messageId) {
  if (data[messageId - 1].read === false) {
    data[messageId - 1].read = true;
    renderApp();
  }
}
function onSelectMessage(messageId) {
  let index = selectedMessageIds.indexOf(messageId);
  if (selectedMessageIds[index]) {
    return false;
  } else {
    selectedMessageIds.push(messageId);
    selectedMessageCount++;
    renderApp();
  }
}
function onDeselectMessage(messageId) {
  let index = selectedMessageIds.indexOf(messageId);
  selectedMessageIds.splice(index, 1);
  selectedMessageCount--;
  renderApp();
}
function onStarMessage(messageId) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === messageId) {
      data[i].starred = true;
      renderApp();
    }
  }
}

function onUnstarMessage(messageId) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === messageId) {
      data[i].starred = false;
      renderApp();
    }
  }
}

function onOpenComposeForm() {
  showComposeForm = true;
  renderApp();
}

function onSelectAllMessages() {
  for (let i = 0; i < data.length; i++) {
    data[i].selected = true;
    onSelectMessage(data[i].id);
  }
  renderApp();
}

function onDeselectAllMessages() {
  for (let i = 0; i < data.length; i++) {
    data[i].selected = false;
    onDeselectMessage(data[i].id);
  }
  renderApp();
}

function onMarkAsReadSelectedMessages() {
  for (let i = 0; i < data.length; i++) {
    let index = selectedMessageIds.indexOf(data[i].id);
    if (data[i].id === selectedMessageIds[index]) {
      data[i].read = true;
      data[i].unread = false;
    }
  }
  renderApp();
}

function onMarkAsUnreadSelectedMessages() {
  for (let i = 0; i < data.length; i++) {
    let index = selectedMessageIds.indexOf(data[i].id);
    if (data[i].id === selectedMessageIds[index]) {
      data[i].unread = true;
      data[i].read = false;
    }
  }
  renderApp();
}

function onApplyLabelSelectedMessages(label) {
  for (let i = 0; i < data.length; i++) {
    let index = selectedMessageIds.indexOf(data[i].id);
    if (data[i].id === selectedMessageIds[index]) {
      data[i].labels.push(label);
    }
  }
  renderApp();
}

function onRemoveLabelSelectedMessages(label) {
  for (let i = 0; i < data.length; i++) {
    let index = selectedMessageIds.indexOf(data[i].id);
    if (data[i].id === selectedMessageIds[index]) {
      let labelIndex = data[i].labels.indexOf(label);
      data[i].labels.splice(labelIndex, 1);
    }
  }
  renderApp();
}

function onDeleteSelectedMessages() {
  for (let i = 0; i < data.length; i++) {
    let index = selectedMessageIds.indexOf(data[i].id);
    if (data[i].id === selectedMessageIds[index]) {
      data.splice(i, 1);
    }
  }
  console.log(data);
  renderApp();
}

function onSubmit(subject, body) {
  console.log(onSubmit);
  let newMsg = {};
  newMsg.id = data.length + 1;
  newMsg.subject = subject;
  newMsg.labels = [];
  data.push(newMsg);
  renderApp();
}

function onCancel() {
  showComposeForm = null;
  renderApp();
}

function renderApp() {
  ReactDOM.render(
    <InboxPageLayout messages={data} selectedMessageIds={selectedMessageIds}>
      <ToolbarComponent
        messages={data}
        selectedMessageCount={selectedMessageCount}
        onOpenComposeForm={onOpenComposeForm}
        onSelectAllMessages={onSelectAllMessages}
        onDeselectAllMessages={onDeselectAllMessages}
        onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
        onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
        onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
        onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
        onDeleteSelectedMessages={onDeleteSelectedMessages}
      />
      <MessagesComponent
        messages={data}
        selectedMessageIds={selectedMessageIds}
        onMarkReadMessage={onMarkReadMessage}
        onSelectMessage={onSelectMessage}
        onDeselectMessage={onDeselectMessage}
        onStarMessage={onStarMessage}
        onUnstarMessage={onUnstarMessage}
      />
      <ComposeFormComponent
        onSubmit={onSubmit}
        onCancel={onCancel}
        showComposeForm={showComposeForm}
      />
    </InboxPageLayout>,
    document.getElementById('root')
  );
}
renderApp();
registerServiceWorker();
