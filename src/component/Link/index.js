/**
 * Created by wangct on 2019/1/19.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import PathToRegExp from 'path-to-regexp';

@connect(({global}) => ({pathname:global.pathname}))
export default class LinkBox extends PureComponent {
  state = {
    filterFields:['filterFields','dispatch']
  };

  getRealState() {
    return {
      ...this.state,
      ...this.props
    }
  }

  getProps(){
    const state = this.getRealState();
    state.filterFields.forEach(field => {
      delete state[field];
    });
    return state
  }

  render() {
    const state = this.getRealState();
    const isActive = PathToRegExp(state.to).test(state.pathname);
    return <Link {...this.getProps()} className={state.className + (isActive ? ' active' : '')}>{state.children}</Link>
  }
}
