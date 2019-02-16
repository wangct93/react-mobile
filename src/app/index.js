import './less/index.less';
import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import store from './store/store';
import {Provider} from 'react-redux';
import './config/config';
import RouterIndex from './routers';



// /**
//  * 注册服务器，加快编译速度
//  */
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();


export default <Provider store={store}>
  <RouterIndex/>
</Provider>;



