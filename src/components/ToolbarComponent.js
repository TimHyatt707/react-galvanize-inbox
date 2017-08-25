import React from 'react';
var classNames = require('classnames');

export default function ToolbarComponent({ messages, selectedMessageCount }) {
  let classes;
  let btn;
  let select;
  if (messages.length === selectedMessageCount && messages.length >= 1) {
    classes = classNames({
      fa: true,
      'fa-check-square-o': true
    });
    btn = classNames({
      btn: true,
      'btn-default': true,
      disabled: false
    });
    select = classNames({
      'form-control': true,
      'label-select': true,
      disabled: false
    });
  } else if (selectedMessageCount >= 1) {
    classes = classNames({
      fa: true,
      'fa-minus-square-o': true
    });
    btn = classNames({
      btn: true,
      'btn-default': true,
      disabled: false
    });
    select = classNames({
      'form-control': true,
      'label-select': true,
      disabled: false
    });
  } else {
    classes = classNames({
      fa: true,
      'fa-square-o': true
    });
    btn = classNames({
      btn: true,
      'btn-default': true,
      disabled: true
    });
    select = classNames({
      'form-control': true,
      'label-select': true,
      disabled: true
    });
  }
  let element = (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>
        <a className="btn btn-danger">
          <i className="fa fa-plus" />
        </a>

        <button className={btn}>
          <i className={classes} />
        </button>

        <button className={btn}>Mark As Read</button>

        <button className={btn}>Mark As Unread</button>

        <select className={select}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className={select}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className={btn}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
  return element;
}
