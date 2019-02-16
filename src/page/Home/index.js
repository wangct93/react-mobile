/**
 * Created by wangct on 2019/2/16.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';

import css from './index.less';

export default class Home extends PureComponent {
    state = {};

    getRealState() {
        return {
            ...this.state,
            ...this.props
        }
    }

    render() {
        return <div>hello home</div>
    }
}
