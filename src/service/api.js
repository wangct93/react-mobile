import request from '../util/request';

export function getBlogInfo(params) {
  return request('/blog/getInfo',{
    method:'post',
    body:params
  });
}

export function getBlogList(params){
  return request('/blog/getList',{
    method:'post',
    body:params
  });
}
