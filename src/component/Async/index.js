/**
 * Created by wangct on 2019/2/1.
 */
import React, {PureComponent} from 'react';

export default class Async extends PureComponent {
    state = {};

    getRealState() {
        return {
            ...this.state,
            ...this.props
        }
    }

    componentDidMount(){
      this.getComponent();
    }

    getComponent(){
      const {getComponent} = this.getRealState();
      if(getComponent){
        getComponent().then(result => {
          this.setState({
            component:result.default
          })
        })
      }
    }

    getProps(){
      return {
        ...this.getRealState(),
        getComponent:undefined
      }
    }

    render() {
      const {component:Com} = this.getRealState();
        return Com ? <Com {...this.getProps()} /> : <p>loading...</p>
    }
}
