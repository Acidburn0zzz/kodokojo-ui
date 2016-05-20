import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/scripts/components/app/App.story')
  require('../src/scripts/components/_ui/appBar/AppBar.story')
  require('../src/scripts/components/_ui/layout/Layout.story')
  require('../src/scripts/components/_ui/panel/Panel.story')
  require('../src/scripts/components/_ui/navDrawer/NavDrawer.story')
  require('../src/scripts/components/_ui/page/Page.story')
  require('../src/scripts/components/user/User.story')
}

configure(loadStories, module)
