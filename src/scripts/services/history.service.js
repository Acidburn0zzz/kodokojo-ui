/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { initMenu, updateMenuPath } from '../components/menu/menu.actions'

const historyService = {}

// TODO could handle analytics in the future
historyService.handleHistoryChange = (location) => dispatch => {
  console.log('history service detect change: ', location) // eslint-disable-line no-console

  if (location === '/stacks' || location === '/members') {
    return dispatch(updateMenuPath(location))
  }
  return dispatch(initMenu(location))
}

// public API
export const handleHistoryChange = historyService.handleHistoryChange

export default historyService
