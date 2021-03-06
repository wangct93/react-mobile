/**
 * Created by wangct on 2018/8/28.
 */

const fs = require('fs');
const path = require('path');
const resolve = (...dir) => path.resolve(process.cwd(),...dir);
const Babel = require('wangct-babel');
const util = require('wangct-server-util');
const {arrayUtil} = util;


const options = [
  {
    src:'src/model',
    callback:updateModel
  },
  {
    src:'src/config',
    callback:updateRouter
  }
];


options.forEach(opt => {
  util.watch(opt);
});



function updateModel(cb){
  const outModelPath = resolve('src/temp/model.js');
  const time = +new Date();
  console.log('开始生成 model');
  const modelDirPath = resolve('src/model');
  fs.readdir(modelDirPath,(err,data) => {
    if(err){
      console.log(err);
    }else{
      let importAry = [];
      let modelNameAry = data.map(item => {
        let filePath = resolve(modelDirPath,item);
        let relativePath = path.relative(path.resolve(outModelPath,'..'),filePath).replace(/\\/g,'/');
        let fileName = path.basename(item,path.extname(item)) + '_' + +new Date();
        if(relativePath.charAt(0) !== '.'){
          relativePath = './' + relativePath;
        }
        importAry.push(`import ${fileName} from '${relativePath}';`);
        return fileName;
      });
      let content = `${importAry.join('')} export default [${modelNameAry.join(',')}];`;
      fs.writeFile(outModelPath,content,function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`成功生成 model ：${outModelPath} 用时：${+new Date() - time}ms`);
          if(typeof cb === 'function'){
            cb();
          }
        }
      });
    }
  })
}

function updateRouter(cb){
  const time = +new Date();
  console.log('开始生成 router');
  babelConfig(() => {
    const config = require(resolve('temp/src/config/config')).default;
    const outputFilePath = resolve('src/temp/router.js');
    const content = getRouterContent({
      ...config,
      output:outputFilePath,
    });
    fs.writeFile(outputFilePath,content,(err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`成功生成 router ：${outputFilePath} 用时：${+new Date() - time}ms`);
        util.callFunc(cb);
      }
    });
  })
}


function babelConfig(cb){
  const output = resolve('temp/src/config');
  new Babel({
    src:'src/config',
    output,
    option:{
      presets: ['react','env','stage-0'],
      plugins: ["transform-decorators-legacy"]
    },
    success(){
      Object.keys(require.cache).forEach(key => {
        if(key.includes(output)){
          delete require.cache[key];
        }
      });
      cb();
    }
  });
}


function getRouterContent(option){
  const {routes = [],output,isRoot = true,importList = []} = option;
  const filterFields = ['component','children'];
  const valueContent = routes.map(item => {
    const valueContent = Object.keys(item).map(key => {
      let value = item[key];
      if(key === 'component'){
        const relativePath = path.relative(path.dirname(output),resolve('src/page',value)).replace(/\\/g,'/');
        let {dynamic = option.dynamicImport} = item;
        if(dynamic){
          importList.push(`import Async from '../component/Async';\n`);
          value = `(props) => <Async {...props} getComponent={() => import('${relativePath}')} />`;
        }else{
          value = 'c_' + util.random();
          importList.push(`import ${value} from '${relativePath}';\n`);
        }
      }else if(key === 'children'){
        value = getRouterContent({
          ...option,
          routes:value,
          isRoot:false,
          importList
        })
      }
      return `${key}:${util.isString(value) && !filterFields.includes(key) ? `'${value}'` : value.toString()}`;
    }).join(',\n');
    return `{${valueContent}}`
  }).join(',\n');
  const content = `[${valueContent}]`;
  return isRoot ? `${arrayUtil.noRepeat(importList).join('')}export default ${content}` : content;
}
