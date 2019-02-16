/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
import {ShopData} from '@/data';
let defaultState = {
    menuData:[
        [
            {
                iconCls:'code-o',
                path:'/food',
                text:'美食'
            },
            {
                iconCls:'code-o',
                path:'/cs',
                text:'超市'
            },
            {
                iconCls:'code-o',
                path:'/fruit',
                text:'生鲜果蔬'
            },
            {
                iconCls:'code-o',
                path:'/aa1',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa2',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa3',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa4',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa5',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa6',
                text:'测试1'
            },
            {
                iconCls:'code-o',
                path:'/aa7',
                text:'测试1'
            }
        ],
        [
            {
                iconCls:'code-o',
                path:'/aa8',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/a9a',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa12',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa13',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/11',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa15',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa16',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa17',
                text:'测试21'
            },
            {
                iconCls:'code-o',
                path:'/aa18',
                text:'测试2'
            },
            {
                iconCls:'code-o',
                path:'/aa21',
                text:'测试2'
            }
        ],
        [
            {
                iconCls:'code-o',
                path:'/a22a',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa22',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa23',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa24',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa26',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa25',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa27',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa28',
                text:'测试321'
            },
            {
                iconCls:'code-o',
                path:'/aa29',
                text:'测试32'
            },
            {
                iconCls:'code-o',
                path:'/aa30',
                text:'测试32'
            }
        ]
    ],
    zanData:ShopData.slice(0,6)
};

export let homeData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {

};
