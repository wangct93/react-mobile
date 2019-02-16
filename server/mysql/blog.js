/**
 * Created by wangct on 2018/12/30.
 */
const Mysql = require('wangct-mysql');
const config = require('../config/mysql');
const mysql = new Mysql(config);

module.exports = {
  getList,
  getTotal,
  getListAndTotal
};



function getList(params,cb){
  mysql.query('select *,date_format(time,"%Y-%m-%d %H:%i:%s") time from blog' + getListWhere(params) + getDesc(params.orderField,params.orderDesc) + getLimit(params.start,params.limit),cb);
}

function getTotal(params,cb){
  mysql.query('select count(id) total from blog' + getListWhere(params),(err,data) => {
    if(err){
      cb(err);
    }else{
      cb(null,data[0].total);
    }
  });
}

function getListAndTotal(params,cb){
  const listPro = new Promise((cb,eb) => {
    getList(params,(err,data) => {
      if(err){
        eb(err);
      }else{
        cb(data);
      }
    })
  });
  const totalPro = new Promise((cb,eb) => {
    getTotal(params,(err,total) => {
      if(err){
        eb(err);
      }else{
        cb(total);
      }
    })
  });
  Promise.all([listPro,totalPro]).then(([list,total]) => {
    cb(null,{
      total,
      list
    });
  },cb)
}

function getListWhere(params){
  const result = [];
  const {id,keyword} = params;
  if(id){
    result.push('id = ' + id);
  }
  if(keyword){
    result.push(`name like '%${keyword}%'`);
  }
  return result.length ? ` where ${result.join(' and ')}` : ''
}

function getLimit(start,limit){
  return start === undefined ? '' : ` limit ${start},${limit}`;
}

function getDesc(field,desc){
  return field ? ` order by ${field} ${desc ? 'desc' : ''}` : '';
}
