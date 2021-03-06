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

/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-return-assign */

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import websocketMiddleware, { websocketInit } from './websocket.middleware'
import api from '../commons/config'
import apiConf from '../../../config/shared/api.env'
import {
  WEBSOCKET_REQUEST,
  WEBSOCKET_STOP
} from '../commons/constants'

describe('websocket middleware', () => {
  describe('websocketInit', () => {
    let apiConfSpy
    beforeEach(() => {
      apiConfSpy = sinon.stub(apiConf.conf, 'getIp')
    })
    afterEach(() => {
      apiConf.conf.getIp.restore()
    })

    it('should init websocket with localhost', () => {
      // Given
      apiConfSpy.returns('')

      // When
      const websocketDefault = websocketInit()

      // Then
      expect(websocketDefault).to.deep.equal({
        socket: undefined,
        socketPing: undefined,
        uri: `ws://localhost${api.event}`
      })
      expect(apiConfSpy).to.have.callCount(1)
    })

    it('should init websocket with dns from env', () => {
      // Given
      apiConfSpy.returns('test')

      // When
      const websocketEnv = websocketInit()

      // Then
      expect(websocketEnv).to.deep.equal({
        socket: undefined,
        socketPing: undefined,
        uri: `wss://test${api.event}`
      })
      expect(apiConfSpy).to.have.callCount(2)
    })
  })

  describe('middleware', () => {
    let getStateSpy
    let createFakeStore
    let dispatchWithStoreOf
    let getWebSocketSpy
    let websocketCloseSpy

    beforeEach(() => {
      websocketCloseSpy = sinon.stub()
      getWebSocketSpy = sinon.stub().returns({
        close: getWebSocketSpy
      })
      websocketMiddleware.__Rewire__('getWebSocket', getWebSocketSpy)

      createFakeStore = fakeData => ({
        getState() {
          getStateSpy = sinon.stub().returns(fakeData)
          return getStateSpy
        }
      })

      dispatchWithStoreOf = (storeData, action) => {
        let dispatched = null
        const dispatch = websocketMiddleware(createFakeStore(storeData))(actionAttempt => dispatched = actionAttempt)
        dispatch(action)
        return dispatched
      }
      sinon.stub(apiConf.conf, 'getIp').returns('')
    })

    afterEach(() => {
      websocketMiddleware.__ResetDependency__('getWebSocket')
      websocketMiddleware.__ResetDependency__('websocket')
      apiConf.conf.getIp.restore()
    })

    it('should pass action if not websocket type', () => {
      // Given
      const action = {
        type: 'SOMETHING_ELSE'
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
    })

    it('should set new websocket', () => {
      // Given
      const action = {
        type: WEBSOCKET_REQUEST
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
      expect(getWebSocketSpy).to.have.callCount(1)
      expect(getWebSocketSpy).to.have.been.calledWith(`ws://localhost${api.event}`)
    })

    it('should stop websocket', () => {
      // Given
      const action = {
        type: WEBSOCKET_STOP
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
      // FIXME can't test that.. ?
      // expect(websocketCloseSpy).to.have.callCount(1)
    })
  })
})
