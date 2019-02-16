import util from 'wangct-util';
import {getLangByPath} from '../util/lang';


export default {
  namespace: 'global',
  state: {
    title:'王垂通的个人博客',
    menus:[
      {
        title:'首页',
        path:'/',
        icon:'home'
      },
      {
        title:'博客',
        path:'/log',
        icon:'file'
      },
      {
        title:'写博客',
        path:'/input',
        icon:'file'
      }
    ],
    menuOpenKeys:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    fieldChange(state,{field,value}){
      return {
        ...state,
        [field]:value
      }
    },
    loading(state,action){
      return {
        ...state,
        loading:action.message
      }
    },
  },
  subscriptions: {
    save({ history,dispatch}) {
      util.setHistory(history);
      util.setDispatch(dispatch);
      history.listen((match) => {
        dispatch({
          type:'fieldChange',
          field:'pathname',
          value:match.pathname
        });
      });
    }
  },
};

