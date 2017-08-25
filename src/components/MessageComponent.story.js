import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';

storiesOf('MessageComponent', module).add('Selected', () => {
  return (
    <MessageComponent
      selected={true}
      message={{
        id: 2,
        subject:
          "connecting the system won't do anything, we need to input the mobile AI panel!",
        read: false,
        starred: false,
        labels: []
      }}
    />
  );
});

storiesOf('MessageComponent', module).add('NotSelected', () => {
  return (
    <MessageComponent
      message={{
        id: 3,
        subject:
          'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
        read: false,
        starred: true,
        labels: ['dev']
      }}
    />
  );
});

storiesOf('MessageComponent', module).add('Read', () => {
  return (
    <MessageComponent
      message={{
        id: 3,
        subject:
          'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
        read: true,
        starred: true,
        labels: ['dev']
      }}
    />
  );
});

storiesOf('MessageComponent', module).add('Unread', () => {
  return (
    <MessageComponent
      message={{
        id: 3,
        subject:
          'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
        read: false,
        starred: true,
        labels: ['dev']
      }}
    />
  );
});

storiesOf('MessageComponent', module).add('With Labels', () => {
  return (
    <MessageComponent
      message={{
        id: 7,
        subject: 'We need to index the mobile PCI bus!',
        read: true,
        starred: false,
        labels: ['dev', 'personal']
      }}
    />
  );
});
