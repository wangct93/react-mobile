/**
 * Created by wangct on 2018/10/13.
 */
import React, {PureComponent} from 'react';
import {Icon} from 'antd';
import css from './index.less';


export default class Text extends PureComponent{
  state = {
  };
  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }
  render(){
    const state = this.getRealState();
    const {icon} = state;
    return <span className="wit-text">
      {
        icon && <Icon type={icon} style={state.iconStyle} />
      }
      <span className={css.text}>{state.children}</span>
    </span>
  }
}
