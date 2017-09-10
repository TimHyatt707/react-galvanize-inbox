import React from 'react';
import { shallow, mount } from 'enzyme';

import MessageComponent from './../components/MessageComponent.js';

let selected = true;

let checked = true;

let message = {
  id: 3,
  subject:
    'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
  read: false,
  starred: true,
  labels: ['dev']
};

let message2 = {
  id: 3,
  subject:
    'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
  read: true,
  starred: false,
  labels: ['dev']
};

const shallowWrapper = shallow(
  <MessageComponent selected={selected} checked={checked} message={message} />
);

describe('<MessageComponent/>', () => {
  const onMarkReadMessage = jest.fn();

  const onSelectMessage = jest.fn();

  const onDeselectMessage = jest.fn();

  const onStarMessage = jest.fn();

  const onUnstarMessage = jest.fn();
  it('snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
  it('subject line should render', () => {
    expect(shallowWrapper.find('div.col-xs-11').childAt(0)).toHaveLength(1);
  });
  it('read CSS class is present when read is true', () => {
    expect(
      mount(<MessageComponent message={message2} />).find('.read')
    ).toBeTruthy();
  });
  it('unread CSS class is present when read is false', () => {
    expect(
      mount(<MessageComponent message={message} />).find('.unread')
    ).toBeTruthy();
  });
  it('read CSS class is present starrred', () => {
    expect(
      mount(<MessageComponent message={message} />).find('i.star')
    ).toBeTruthy();
  });
  it('read CSS class is present selected', () => {
    expect(
      mount(<MessageComponent message={message} selected={true} />).find(
        'div.selected'
      )
    ).toBeTruthy();
  });
  it('read CSS class is present selected', () => {
    expect(
      mount(<MessageComponent message={message} selected={true} />).find(
        'div.checked'
      )
    ).toBeTruthy();
  });
  it('onMarkAsReadMessage callback is fired when clicked', () => {
    mount(
      <MessageComponent
        message={message}
        selected={true}
        onMarkReadMessage={onMarkReadMessage}
      />
    )
      .find('div.col-xs-11')
      .simulate('click');
    expect(onMarkReadMessage).toBeCalled();
  });
  //
  it('onSelectMessage callback is fired when clicked', () => {
    mount(
      <MessageComponent
        message={message}
        selected={false}
        checked={false}
        onSelectMessage={onSelectMessage}
        onDeselectMessage={onDeselectMessage}
      />
    )
      .find('input')
      .simulate('click');
    expect(onDeselectMessage).toBeCalled();
  });
  //
  it('onDeselectMessage callback is fired when clicked', () => {
    mount(
      <MessageComponent
        message={message}
        selected={true}
        onSelectMessage={onSelectMessage}
        onDeselectMessage={onDeselectMessage}
      />
    )
      .find('input')
      .simulate('click');
    expect(onDeselectMessage).toBeCalled();
  });
  //
  it('onStarMessage callback is fired when clicked', () => {
    mount(<MessageComponent message={message2} onStarMessage={onStarMessage} />)
      .find('i')
      .simulate('click');
    expect(onStarMessage).toBeCalled();
  });
  //
  it('onUnstarMessage callback is fired when clicked', () => {
    mount(
      <MessageComponent message={message} onUnstarMessage={onUnstarMessage} />
    )
      .find('i')
      .simulate('click');
    expect(onUnstarMessage).toBeCalled();
  });
});
