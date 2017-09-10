import React from 'react';
import { shallow, mount } from 'enzyme';

import MessagesComponent from './../components/MessagesComponent.js';

const data = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal']
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: []
  }
];

let selectedMessageIds = [2, 4];

// const shallowWrapper = shallow(<MessagesComponent messages={messages} selectedMessageIds={selectedMessageIds}/>);

describe('<MessagesComponent/>', () => {
  const onMarkReadMessage = jest.fn();
  const onSelectMessage = jest.fn();
  const onDeselectMessage = jest.fn();
  const onStarMessage = jest.fn();
  const onUnstarMessage = jest.fn();
  it('number of message components should be same as messages', () => {
    expect(
      mount(
        <MessagesComponent
          messages={data}
          selectedMessageIds={selectedMessageIds}
        />
      ).children()
    ).toHaveLength(data.length);
  });
  it('onMarkReadMessage should fire when clicked', () => {
    mount(
      <MessagesComponent
        messages={data}
        selectedMessageIds={selectedMessageIds}
        onMarkReadMessage={onMarkReadMessage}
      />
    )
      .childAt(1)
      .find('div.col-xs-11')
      .simulate('click');
    expect(onMarkReadMessage).toBeCalled();
  });
  // it('onSelectMessage should fire when clicked', () => {
  //   mount(
  //     <MessagesComponent
  //       messages={data}
  //       selected={false}
  //       checked={false}
  //       selectedMessageIds={selectedMessageIds}
  //       onSelectMessage={onSelectMessage}
  //     />
  //   )
  //     .childAt(0)
  //     .find('input')
  //     .simulate('click');
  //   expect(onSelectMessage).toBeCalled();
  // });
  // it('onDeselectMessage should fire when clicked', () => {
  //   mount(
  //     <MessagesComponent
  //       messages={data}
  //       selected={true}
  //       checked={true}
  //       selectedMessageIds={selectedMessageIds}
  //       onDeselectMessage={onDeselectMessage}
  //     />
  //   )
  //     .childAt(1)
  //     .find('input')
  //     .simulate('click');
  //   expect(onDeselectMessage).toBeCalled();
  // });
  it('onStarMessage should fire when clicked', () => {
    mount(
      <MessagesComponent
        messages={data}
        selectedMessageIds={selectedMessageIds}
        onStarMessage={onStarMessage}
      />
    )
      .childAt(3)
      .find('i')
      .simulate('click');
    expect(onStarMessage).toBeCalled();
  });
  it('onUnstarMessage should fire when clicked', () => {
    mount(
      <MessagesComponent
        messages={data}
        selectedMessageIds={selectedMessageIds}
        onUnstarMessage={onUnstarMessage}
      />
    )
      .childAt(0)
      .find('i')
      .simulate('click');
    expect(onUnstarMessage).toBeCalled();
  });
});
