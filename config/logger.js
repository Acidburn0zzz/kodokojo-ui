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

import winston from 'winston'

const loggerTransports = [new winston.transports.Console({
  handleExceptions: true,
  level: 'debug',
  timestamp: () => new Date().toISOString(),
  colorize: true
})]

const logger = new (winston.Logger)({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  transports: loggerTransports,
  exitOnError: false
})

export default logger
