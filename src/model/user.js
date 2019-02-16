import util from 'wangct-util';
import {getUserInfo} from '../service/api';

export default {
  namespace: 'user',
  state: {
    auths:[]
  },

  effects: {
    *getUserInfo({ payload }, { call, put,select }) {
      // const result = yield call(getUserInfo);
      // console.log(result);
      // if(result.data){
      //   yield put({ type: 'saveUserInfo',data:result.data});
      // }else{
      //   // util.getHistory().push('/login');
      // }
    },
  },

  reducers: {
    saveUserInfo(state,action){
      return {
        ...state,
        userInfo:action.data
      }
    }
  },
  subscriptions: {
    // getUserInfo({dispatch}){
    //   dispatch({
    //     type:'getUserInfo'
    //   })
    // }
  },
};

