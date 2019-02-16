/**
 * Created by wangct on 2018/10/21.
 */
import React, {PureComponent} from 'react';
import {Spin} from 'antd';

import css from './index.less';

export default class Loading extends PureComponent{
  state = {};
  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }
  render(){
    const {visible,mode = 'full',text} = this.getRealState();
    return <div className={css.wrap + ' ' + css['type_' + mode] + (visible ? '' : ' hide-i')}>
      <div className={css.content}>
        <Spin spinning={true} size="large" />
        {
          text ? <div className={css.text}>{text}</div> : ''
        }
      </div>
    </div>
  }
}
