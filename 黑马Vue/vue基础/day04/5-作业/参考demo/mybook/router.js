/*
  路由模块
*/
const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 查询图书列表
router.get('/list', service.getAllBooks);
// 添加图书(提交表单)
router.post('/add', service.addBook);
// 跳转到编辑图书信息页面
router.get('/books/:id', service.toEditBook);
// router.get('/toEditBook',service.toEditBook);
// 编辑图书提交表单
router.put('/list/:id', service.editBook);
// 删除图书信息
router.delete('/list/:id', service.deleteBook);
router.delete('/deleteall', service.deleteAllComplete);
// 验证图书名称是否存在
// router.get('/books/book/:name', service.checkName);

// 实现全选功能
router.get('/all/:val', service.allchecked);


module.exports = router;