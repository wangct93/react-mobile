/**
 * Created by wangct on 2018/12/23.
 */
const express = require('express');
const router = express.Router();
const request = require('request');
const mysql = require('../mysql/blog');


module.exports = router;


router.post('/getInfo',(req,res) => {
  const {id} = req.body;
  mysql.getList({id},(err,data) => {
    if(err){
      res.send({status:0,message:err.message});
    }else{
      res.send({status:1,data:data[0]});
    }
  })
});

router.post('/getList',(req,res) => {
  mysql.getListAndTotal({
    orderField:'time',
    orderDesc:true,
    start:0,
    limit:10,
    ...req.body
  },(err,result) => {
    if(err){
      res.send({status:0,message:err.message});
    }else{
      res.send({status:1,data:result.list,total:result.total});
    }
  });
});
