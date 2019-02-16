/**
 * Created by wangct on 2018/10/13.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import Link from '@lib/Link';
import LOGO from '@/asset/image/logo.png';
import css from './index.less';

@connect(({}) => ({}))
export default class Header extends PureComponent{
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
    return <div className={css.container}>
      <div className="fixed-width">
        <div className={css.left}>
          <Link to="/">
            <img alt="logo" className={css.logo} src={LOGO} />
          </Link>
        </div>
        <div className={css.menu_wrap}>
          <Menu />
        </div>
        <div className={css.right}>

        </div>
      </div>

    </div>
  }
}

@connect(({global}) => ({menus:global.menus}))
class Menu extends PureComponent{
  state = {

  };
  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }
  getData(){
    return this.getRealState().menus || [];
  }
  render(){
    return <ul className={css.menu_list}>
      {
        this.getData().map(item => {
          return <MenuItem key={item.title} data={item} />
        })
      }
    </ul>
  }
}

@connect(({global}) => ({pathname:global.pathname}))
class MenuItem extends PureComponent{
  state = {

  };
  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }
  getData(){
    return this.getRealState().data || {};
  }
  render(){
    const {path,icon,title} = this.getData();
    return <li>
      <Link to={path}>
        {
          icon && <Icon type={icon} />
        }
        <span className={css.text_name}>{title}</span>
      </Link>
    </li>
  }
}
