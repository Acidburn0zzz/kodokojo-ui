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

import * as userRepository from './user.server.repository'

export const initUser = (request, response) => {
  userRepository
    .initUser()
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const postUser = (request, response) => {
  const params = {
    id: request.params.id,
    email: request.body.email,
    entity: request.body.entity,
    credentials: request.headers.authorization,
    captcha: request.headers['g-recaptcha-response']
  }
  userRepository
      .postUser(params)
      .then(data => response.status(201).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const getUserAccount = (request, response) => {
  userRepository
      .getUserAccount(request.headers.authorization)
      .then(data => response.status(200).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const getUser = (request, response) => {
  userRepository
      .getUser(request.headers.authorization, request.params.userId)
      .then(data => response.status(200).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}
