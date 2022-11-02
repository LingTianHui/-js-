## 每日作业-Vue第03天

### todos案例-组件化抽离

- ### 题目描述

  - 当在输入框中输入完内容的按回车键 当前内容展示到页面上  
  - 点击三角 实现全选和全不选功能
  - 点击叉号实现删除功能
  - 双击标题实现编辑功能
  - 如 点击   SECTION 1   则 内容区域显示 对应 SECTION 1 的内容  同时当前 SECTION的字体颜色变成蓝色 

- ### 训练目标

  - 能够理解vue 中的数据渲染
  - 能够理解 v-for,  v-if  , v-bind ,  v-click 的使用 
  - 能够理解 vue 中自定义指令、计算属性、数组变异方法
  - 组件化封装

- ### 训练提示

  - 提供的数据如下

    - 1、引入todos的CSS样式  （HTML和 CSS 已经写好 我们需要改成Vue动态渲染的

    ```php+HTML
     <!-- HTML   -->
        <section id="todoapp" class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input placeholder="What needs to be done?" class="new-todo">
            </header>
            <section class="main">
                	<input id="toggle-all" type="checkbox" class="toggle-all"> 
                	<label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    <li class="">
                        <div class="view"><input type="checkbox" class="toggle"> 
                            <label>吃饭</label> 
                            <button class="destroy"></button>
                        </div> 
                        <input class="edit">
                    </li>
                    <li class="">
                        <div class="view">
                            <input type="checkbox" class="toggle">
                            <label>睡觉</label> 
                            <button class="destroy"></button>
                        </div> <input class="edit"></li>
                    <li class="completed">
                        <div class="view">
                            <input type="checkbox" class="toggle"> 
                            <label>打豆豆</label> 
                            <button class="destroy">
                            </button></div> 
                        <input class="edit">
                    </li>
                </ul>
            </section>
            <footer class="footer">
                <span class="todo-count">
                    <strong>2</strong> item left</span>
                <ul class="filters">
                    <li><a href="#/" class="selected">All</a></li>
                    <li><a href="#/active">Active</a></li>
                    <li><a href="#/completed">Completed</a></li>
                </ul> 
                <button class="clear-completed">Clear completed</button>
            </footer>
        </section>
    
    
    
    <!---   2CSS -->
        <link rel="stylesheet" href="css/base.css">
        <link rel="stylesheet" href="css/index.css">
    
    <!---   3、 提供的数据  -->
    
        <script>
            new Vue({
                el: "#todoapp",
                data: {
                    todos: [{
                        id: 1,
                        title: '吃饭',
                        completed: false
                    }, {
                        id: 2,
                        title: '睡觉',
                        completed: false
                    }, {
                        id: 3,
                        title: '打豆豆',
                        completed: true
                    }]
                }
            })
        </script>
    ```

- ### 操作步骤

  - ### 2 抽离头部组件
    
    - 把头部封装到一个组件中 
    - 给输入框绑定事件
    - 当用户输入完数据后  通过子向父传值     把获取的用户输入的信息提交到父组件中去
    - 父组件接收到子组件传递的数据 存放到todos 中 
    - 父组件中展示头部组件
    
  - ### 3 抽离数据展示组件
  
    - 3.1 把显示数据的代码封装到一个组件中 
    - 3.2 把父组件中的todos 传递过来  子组件接收到父组件传递过来的数据 进行渲染
    - 3.3 点击删除  删除当前的数据
    - 3.4 双击的时候 当前数据可编辑  
    - 3.5  按enter键的时候 保存当前数据 
    - 3.6 实现全选功能 
  
  - ### 4  抽离fotter 部分
  
    - 4.1 把footer 部分的代码封装到一个组件中 
    - 4.2   实现 未选中部分的展示
    - 4.3  删除已经选中的 
  



