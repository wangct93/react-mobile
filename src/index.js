// import 'antd/dist/antd.css';
// import './less/global.less';
import React from 'react';
import dva from 'dva';
import path from 'path';
import {Switch,Router,Route,Redirect} from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import models from './temp/model';
import routerConfig from './temp/router';
// 1. Initialize
const app = dva({
  history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
models.forEach(model => app.model(model));

// 4. Router
app.router(({history}) => <Router history={history}>{getRoutes(routerConfig)}</Router>);

// 5. Start
app.start('#root');


function getRoutes(routes,indexPath){
  return <Switch>
    {
      routes.map(route => {
        const {path:routePath,component:RouteComponent,children = [],indexPath} = route;
        const props = {
          key:routePath,
          path:routePath
        };
        if(children.length){
          props.render = props => {
            return <RouteComponent {...props}>
              {
                getRoutes(children.map(childRoute => ({...childRoute,path:path.join(routePath,childRoute.path)})),indexPath && path.join(routePath,indexPath))
              }
            </RouteComponent>
          }
        }else{
          props.component = RouteComponent;
        }
        return <Route {...props} />
      })
    }
    {
      indexPath ? <Redirect key="redirectRoute" to={indexPath}/> : ''
    }
  </Switch>
}
