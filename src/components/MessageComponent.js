import React from 'react';
var classNames = require('classnames');

export default function MessageComponent({ selected, message }) {
  let star;
  let labels = message.labels.map(i => {
    return (
      <span className="label label-warning">
        {i}
      </span> || ''
    );
  });
  let classes = classNames({
    row: true,
    message: true,
    read: message.read,
    selected: selected
  });
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
            <input type="checkbox" checked="checked" />
          </div>
          <div className="col-xs-2">
            <i className={star} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels}
        {message.subject}
      </div>
    </div>
  );
  return element;
}
