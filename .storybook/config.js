import { configure } from '@storybook/react';
function loadStories() {
  // Require your stories here...
  require('../src/index.css');
  require('../src/components/MessageComponent.story');
  require('../src/components/MessagesComponent.story');
  require('../src/components/ToolbarComponent.story');
  require('../src/components/InboxPageLayout.story');
}
configure(loadStories, module);
