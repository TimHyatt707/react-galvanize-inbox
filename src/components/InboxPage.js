import React from 'react';
import InboxPageLayout from './InboxPageLayout';
import ToolbarComponent from './ToolbarComponent';
import MessagesComponent from './MessagesComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  messages,
  showComposeForm,
  selectedMessageCount,
  selectedMessageIds,
  onOpenComposeForm,
  onSelectMessage,
  onDeselectMessage,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onStarMessage,
  onUnstarMessage,
  onMarkReadMessage,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessage,
  onSubmit,
  onCancel
}) {
  return (
    <InboxPageLayout>
      <ToolbarComponent
        messages={messages}
        selectedMessageIds={selectedMessageIds}
        selectedMessageCount={selectedMessageCount}
        onOpenComposeForm={onOpenComposeForm}
        onSelectAllMessages={onSelectAllMessages}
        onDeselectAllMessages={onDeselectAllMessages}
        onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
        onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
        onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
        onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
        onDeleteSelectedMessage={onDeleteSelectedMessage}
      />
      <MessagesComponent
        messages={messages}
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
    </InboxPageLayout>
  );
}
