/**
 * Created by wangct on 2019/1/1.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Carousel,Input} from 'antd';
import util from 'wangct-util';
import Text from '@lib/Text';
import Newly from './Newly';
import RightContent from '../RightContent';
import css from './index.less';

export default class Home extends PureComponent {
  state = {
    banners:[
      {
        src:'http://www.zbboke.com/templets/boke/picture/banner.gif'
      },
      {
        src:'http://www.zbboke.com/templets/boke/picture/banner_1.jpg'
      },
      {
        src:'http://www.zbboke.com/templets/boke/picture/banner_3.jpg'
      }
    ]
  };

  getRealState() {
    return {
      ...this.state,
      ...this.props
    }
  }

  render() {
    const state = this.getRealState();
    return <div className={css.container}>
      <div className="fixed-width">
        <Carousel autoplay>
          {
            state.banners.map((item,i) => {
              return <div key={i} className={css.banner_item}>
                <img src={item.src} alt="横幅" />
              </div>
            })
          }
        </Carousel>
        <div className={css.body}>
          <div className={css.left}>
            <Newly />
          </div>
          <div className={css.right}>
            <RightContent />
          </div>
        </div>
      </div>
    </div>
  }
}
