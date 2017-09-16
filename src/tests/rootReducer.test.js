import React from 'react';
// import { shallow, mount } from 'enzyme';

import rootReducer from './../redux/reducers/rootReducer';

let messages = [
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  }
];

let initialState = rootReducer(undefined, {});
let newState = {
  messages: messages,
  showComposeForm: null,
  selectedMessageIds: [],
  selectedMessageCount: 0
};

describe('test reducer', () => {
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should return initial state', () => {
    expect(initialState).toEqual({
      messages: [],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle SET_MESSAGES', () => {
    expect(
      rootReducer(initialState, { type: 'SET_MESSAGES', messages })
    ).toEqual({
      messages: messages,
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_UPDATE', () => {
    let message = {
      id: 3,
      subject:
        'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
      read: true,
      starred: true,
      labels: ['dev']
    };
    expect(rootReducer(newState, { type: 'ON_UPDATE', message })).toEqual({
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: true,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_SELECT', () => {
    let messageId = 3;
    expect(rootReducer(newState, { type: 'ON_SELECT', messageId })).toEqual({
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [3],
      selectedMessageCount: 1
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_DESELECT', () => {
    let messageId = 3;
    let selectedState = {
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [3],
      selectedMessageCount: 1
    };
    expect(
      rootReducer(selectedState, { type: 'ON_DESELECT', messageId })
    ).toEqual({
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle OPEN_FORM', () => {
    expect(rootReducer(initialState, { type: 'OPEN_FORM' })).toEqual({
      messages: [],
      showComposeForm: true,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle CLOSE_FORM', () => {
    expect(rootReducer(initialState, { type: 'CLOSE_FORM' })).toEqual({
      messages: [],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_SELECT_ALL', () => {
    let messageId = 3;
    expect(
      rootReducer(newState, { type: 'ON_SELECT_ALL', messageId })
    ).toEqual({
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [3],
      selectedMessageCount: 1
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_SELECT_ALL', () => {
    let messageId = 3;
    expect(
      rootReducer(newState, { type: 'ON_DESELECT_ALL', messageId })
    ).toEqual({
      messages: [
        {
          id: 3,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_DELETE_MESSAGE', () => {
    let messageId = 3;
    expect(
      rootReducer(newState, { type: 'ON_DELETE_MESSAGE', messageId })
    ).toEqual({
      messages: [],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle ON_CREATE_MESSAGE', () => {
    let record = {
      id: 0,
      subject:
        'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
      read: false,
      starred: true,
      labels: ['dev']
    };
    expect(
      rootReducer(initialState, { type: 'ON_CREATE_MESSAGE', record })
    ).toEqual({
      messages: [
        {
          id: 0,
          subject:
            'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
          read: false,
          starred: true,
          labels: ['dev']
        }
      ],
      showComposeForm: null,
      selectedMessageIds: [0],
      selectedMessageCount: 1
    });
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  it('should handle reference error', () => {
    expect(rootReducer(initialState, { type: 'TUPAC_BACK' })).toEqual({
      messages: [],
      showComposeForm: null,
      selectedMessageIds: [],
      selectedMessageCount: 0
    });
  });
});
