import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({
  messages,
  selectedMessageIds,
  onMarkReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage
}) {
  let selected;
  let checked;
  return (
    <div>
      {messages.map(message => {
        let index = selectedMessageIds.indexOf(message.id);
        if (message.id === selectedMessageIds[index]) {
          selected = true;
          checked = true;
        } else {
          selected = false;
          checked = false;
        }
        return (
          <MessageComponent
            message={message}
            checked={checked}
            selected={selected}
            key={message.id}
            onMarkReadMessage={onMarkReadMessage}
            onSelectMessage={onSelectMessage}
            onDeselectMessage={onDeselectMessage}
            onStarMessage={onStarMessage}
            onUnstarMessage={onUnstarMessage}
            selectedMessageIds={selectedMessageIds}
          />
        );
      })}
    </div>
  );
}
