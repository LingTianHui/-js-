// 1. 导入 fs 模块，来操作文件
const fs = require('fs')

// 2. 调用 fs.readFile() 方法读取文件
//    参数1：读取文件的存放路径
//    参数2：读取文件时候采用的编码格式，一般默认指定 utf8
//    参数3：回调函数，拿到读取失败和成功的结果  err  dataStr
// fs.readFile('./files/1.txt', 'utf8', function(err,dataStr) {
  // 2.1 打印失败的结果
  // 如果读取成功，则 err 的值为 null
  // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
  // console.log(err)
  // console.log('-------')
  // 2.2 打印成功的结果
//   console.log(dataStr)
// })

// fs.readFile('./files/成绩-ok.txt','utf-8',function(err,data1){
//   if(err){
//     return console.log(err)
//   }
//   console.log(data1)
// })

// fs.writeFile('./files/1.txt','utf-8',function(err){
//   if(err){
//     return console.log(运行出现错误+err.message)
//   }
//   else{
//   console.log('写入成功')}
// })

// 例子考试成绩处理
fs.readFile('../素材/成绩.txt','utf-8',function(err,data2){
  if(err){
    return console.log('程序执行失败'+err.message)
  }
  console.log('文件读取成功'+data2)
  // 接下来将对成绩的数据进行处理
// 1.首先按照空格将其分开
const arr1 = data2.split(' ')
console.log(arr1)
// 2.循环分割后的数组，对每一项数据，进行字符串的替换（用：替换空格）
const arr2= []
arr1.forEach(item=>{
  arr2.push(item.replace('=',':'))
})
console.log(arr2)
// 3.将新数组中的每一项进行合并，得到一个新的字符串
const arr3=arr2.join('\r\n')
console.log(arr3)
// 将数据写入我们需要的文件中，这点我一开始是很不理解的，因为这个写入的函数应该写在读取函数的里面，但是从我的逻辑里面我觉得应该写在外面，实践结果是，写在外面是不行的，因为所有在不使用var关键字的情况下，这里面的变量都是由块级作用域的，没有办法再块级作用域外使用，或许使用闭包或者使用var关键字就没有这个问题了，但是根据新的约定俗成的习惯，尽量不要在代码中使用var
fs.writeFile('../素材/成绩01.txt',arr3,function(err){
  if(err){
    console.log('文件传输错误'+err.message)
  }
  console.log('文件传输成功')
})
})
