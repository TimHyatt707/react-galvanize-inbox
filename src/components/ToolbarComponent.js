import React from 'react';
var classNames = require('classnames');

export default function ToolbarComponent({
  messages,
  selectedMessageCount,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages
}) {
  let counter = 0;
  let classes;
  let btn;
  let select;
  function onSelectAllMessagesHandler() {
    if (selectedMessageCount !== messages.length) {
      onSelectAllMessages();
    } else {
      onDeselectAllMessages();
    }
  }
  function onMarkAsReadSelectedMessagesHandler() {
    onMarkAsReadSelectedMessages();
  }
  function onMarkAsUnreadSelectedMessagesHandler() {
    onMarkAsUnreadSelectedMessages();
  }
  function onApplyLabelSelectedMessagesHandler(event) {
    const $label = event.target;
    onApplyLabelSelectedMessages($label.value);
  }
  function onRemoveLabelSelectedMessagesHandler(event) {
    const $label = event.target;
    onRemoveLabelSelectedMessages($label.value);
  }
  function onDeleteSelectedMessagesHandler() {
    onDeleteSelectedMessages();
  }
  function onOpenComposeFormHandler() {
    onOpenComposeForm();
  }
  console.log('selectedMessageCount:', selectedMessageCount);
  console.log('messages.length:', messages.length);

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
  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].read) {
      counter++;
    }
  }
  let element = (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge" />
          {counter} unread messages
        </p>
        <a className="btn btn-danger" onClick={onOpenComposeFormHandler}>
          <i className="fa fa-plus" />
        </a>

        <button className={btn} onClick={onSelectAllMessagesHandler}>
          <i className={classes} />
        </button>

        <button className={btn} onClick={onMarkAsReadSelectedMessagesHandler}>
          Mark As Read
        </button>

        <button className={btn} onClick={onMarkAsUnreadSelectedMessagesHandler}>
          Mark As Unread
        </button>

        <select
          className={select}
          onChange={onApplyLabelSelectedMessagesHandler}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className={select}
          onChange={onRemoveLabelSelectedMessagesHandler}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className={btn} onClick={onDeleteSelectedMessagesHandler}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
  return element;
}
