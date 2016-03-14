import fetch from 'isomorphic-fetch'

import { EMAIL_INIT, EMAIL_SENT } from '../../commons/constants'
import api from '../../commons/config'

export function emailSend(email) {
  return {
    type: EMAIL_INIT,
    email: email
  }
}

export function emailSent(email) {
  return {
    type: EMAIL_SENT,
    payload: {
      email: email
    }
  }
}

export function sendEmail(email) {

  return dispatch => {
    dispatch(emailSend(email))

    // TODO remove basic auth
    return fetch(`http://${window.location.host}${api.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46c3VwZXJBZA=='
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error('Server error')
      }
      return response.text()

    }).then(data => dispatch(emailSent(email, data)))
  }

}
