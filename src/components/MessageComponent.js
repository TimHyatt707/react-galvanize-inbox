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
    onMarkReadMessage(message.id);
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
    if (message.starred) {
      onUnstarMessage(message.id);
    } else {
      onStarMessage(message.id);
    }
  }
  // function onUnstarMessageClick() {
  //   onUnstarMessage(message.id);
  // }
  let star;
  let classes;
  let labels = message.labels.map(i => {
    return (
      <span className="label label-warning" key={i}>
        {i}
      </span> || ''
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
    <div className={classes}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onClick={onSelectMessageClick} />
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
