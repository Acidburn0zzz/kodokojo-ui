import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { LAYOUT } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import layoutTheme from './layout.scss'

/**
 * UI: Layout component
 *
 */
export class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <div className={ layoutTheme.layout }>
        { children }
      </div>
    )
  }
}

export default themr(LAYOUT, layoutTheme)(Layout)
