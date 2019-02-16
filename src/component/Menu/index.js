/**
 * Created by wangct on 2018/10/13.
 */
import React, {PureComponent} from 'react';
import {Icon,Menu} from 'antd';
import {Link} from 'dva/router';
import css from './index.less';

const {SubMenu} = Menu;

export default class MenuBox extends PureComponent{
  state = {
    mode:'inline',
    theme:'dark'
  };
  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }
  getOption(){
    const state = this.getRealState();
    return {
      ...state,
      className:css.container + ' ' + (state.className || '')
    }
  }
  getList(){
    return this.getRealState().list || [];
  }
  render(){
    return <Menu {...this.getOption()}>
      {
        this.getList().map(item => getMenuItem(item))
      }
    </Menu>
  }
}

function getMenuItem(data){
  const {children = [],icon,name,path} = data;
  const text = <span>
      {icon && <Icon type={icon} />}
    <span className={css.text_name}>{name}</span>
    </span>;
  return children.length ? <SubMenu title={text} key={path}>
    {
      children.map(item => getMenuItem(item))
    }
  </SubMenu> : <Menu.Item key={path}>
    <Link to={path}>{text}</Link>
  </Menu.Item>
}

