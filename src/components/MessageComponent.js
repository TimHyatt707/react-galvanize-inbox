import React from 'react';
var classNames = require('classnames');

export default function MessageComponent({
  selected,
  message,
  onMarkReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage,
  selectedMessageIds
}) {
  function onMarkReadMessageClick() {
    let changes = {};
    changes.read = true;
    onMarkReadMessage(message.id, changes);
  }
  function onSelectMessageClick(event) {
    const $checkbox = event.target;
    if ($checkbox.checked) {
      onSelectMessage(message.id);
    } else {
      onDeselectMessage(message.id);
    }
  }
  function onStarMessageClick() {
    let changes = {};
    if (message.starred) {
      changes.starred = false;
      onUnstarMessage(message.id, changes);
    } else {
      changes.starred = true;
      onStarMessage(message.id, changes);
    }
  }
  // function onUnstarMessageClick() {
  //   onUnstarMessage(message.id);
  // }
  let star;
  let classes;
  let checked;
  if (selected) {
    checked = true;
  } else {
    checked = false;
  }
  let labels = message.labels.map(i => {
    return (
      <span className="label label-warning" key={i}>
        {i}
      </span>
    );
  });
  if (message.read) {
    classes = classNames({
      row: true,
      message: true,
      read: message.read,
      selected: selected
    });
  } else {
    classes = classNames({
      row: true,
      message: true,
      unread: true,
      selected: selected
    });
  }
  if (message.starred) {
    star = classNames({
      star: true,
      fa: true,
      'fa-star': true
    });
  } else {
    star = classNames({
      star: true,
      fa: true,
      'fa-star-o': true
    });
  }
  let element = (
    <div className={classes} key={message.id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={checked}
              onClick={onSelectMessageClick}
            />
          </div>
          <div className="col-xs-2">
            <i className={star} onClick={onStarMessageClick} />
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={onMarkReadMessageClick}>
        {labels}
        {message.subject}
      </div>
    </div>
  );
  return element;
}
