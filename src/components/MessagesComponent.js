import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({
  messages,
  selectedMessageIds,
  onMarkReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage
}) {
  let selectedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    for (let j = 0; j < selectedMessageIds.length; j++) {
      if (messages[i].id === selectedMessageIds[j]) {
        selectedMessages.push(messages[i]);
      }
    }
  }
  if (selectedMessages.length === 0) {
    return (
      <div>
        {messages.map(message => {
          return (
            <MessageComponent
              message={message}
              selected={false}
              key={message.id}
              onMarkReadMessage={onMarkReadMessage}
              onSelectMessage={onSelectMessage}
              onDeselectMessage={onDeselectMessage}
              onStarMessage={onStarMessage}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {selectedMessages.map(x => {
          return (
            <MessageComponent
              message={x}
              selected={true}
              onMarkReadMessage={onMarkReadMessage}
              onSelectMessage={onSelectMessage}
              onDeselectMessage={onDeselectMessage}
              onStarMessage={onStarMessage}
            />
          );
        })}
      </div>
    );
  }
}
