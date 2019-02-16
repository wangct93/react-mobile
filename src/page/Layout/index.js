/**
 * Created by wangct on 2018/10/13.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';

import Header from './Header';
import Footer from './Footer';
import Loading from '@lib/Loading';

import css from './index.less';



@connect(({global}) => global)
export default class Layout extends PureComponent{
  state = {

  };
  componentDidMount(){
    this.props.dispatch({
      type:'user/getUserInfo'
    });
  }

  getRealState(){
    return {
      ...this.state,
      ...this.props
    }
  }

  render(){
    const state = this.getRealState();
    return <div className={css.container}>
      <Title title={state.title} />
      <Loading visible={state.loading} text={state.loadingMsg} />
      <div className={css.header}>
        <Header />
      </div>
      <div className={css.body}>
        <div className="fixed-width">
          {
            state.children
          }
        </div>
      </div>
      <div className={css.footer}>
        <Footer />
      </div>
    </div>
  }
}

class Title extends PureComponent{
  render(){
    document.title = this.props.title;
    return <React.Fragment />
  }
}
