import Async from '../component/Async';
export default [{path:'/',
component:(props) => <Async {...props} getComponent={() => import('../page/APP')} />}]