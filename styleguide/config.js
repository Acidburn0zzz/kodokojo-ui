import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/scripts/components/_ui/avatar/Avatar.component.story.js')
  require('../src/scripts/components/_ui/appBar/AppBar.component.story.js')
  require('../src/scripts/components/_ui/colors/colors.story.js')
  require('../src/scripts/components/_ui/layout/Layout.component.story.js')
  require('../src/scripts/components/_ui/panel/Panel.component.story.js')
  require('../src/scripts/components/_ui/content/Content.component.story.js')
  require('../src/scripts/components/_ui/nav/Nav.component.story.js')
  require('../src/scripts/components/_ui/menuItem/MenuItem.component.story.js')
  require('../src/scripts/components/_ui/page/Page.component.story.js')
  require('../src/scripts/components/_ui/typography/typography.story.js')
  require('../src/scripts/components/app/App.component.story.js')
  require('../src/scripts/components/user/User.component.story.js')
  require('../src/scripts/components/brick/Brick.component.story.js')
  require('../src/scripts/components/menu/Menu.component.story')
  require('../src/scripts/pages/Members.page.story')
  require('../src/scripts/pages/Stacks.page.story')
}

configure(loadStories, module)
