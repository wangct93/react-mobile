/**
 * Created by wangct on 2019/2/16.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import App from '../../app';


export default class Com extends PureComponent {
    state = {};

    getRealState() {
        return {
            ...this.state,
            ...this.props
        }
    }

    render() {
        return App
    }
}
