# 每日作业-Vue第02天



## TODOS案例 

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

  - 1、 把数据渲染到页面上
    - 根据completeed 的状态动态给li 绑定类名  
      - 未完成状态：不需要样式        完成状态： 类名为 completed      编辑状态：类名为 editing
      - 如果completed 为 true 则给当前li 添加  completed      
  - 2、把类名是  new-todo 按回车键的时候  把输入框中的数据展示到页面上
    - 1. 获取文本框中用户输入的数据
    - 2. 判断数据是否非空   如果是空的，则什么都不做    如果不是空的，则添加到数组中
    - 3. 添加到数组中
    - 4. 清空文本框
  - 3、  实现全选功能 
    - 3.1 当点击三角即类名为 toggle-all  的复选框的时候 
      - 如果当前三角高亮  即 复选框为选中状态  让当前所有的li 为 完成状态
        - 通过双向绑定获取当前复选框的选中状态 
      - 否则为未完成状态 
    - 3.2  当点击单个li 里面的复选框的时候 如果当前复选框选中  则当前的状态为完成状态
      - 通过双向绑定获取当前复选框选中状态  通过选中状态动态改变  completed 的值  
    - 3.3  如果当前所有的li 都处于完成状态 即 复选框都选中 则上面的  toggle-all  复选框选中 有一个没有选中则当前toggle-all  复选框  处于未选中状态
  - 4、实现删除功能
    - 给类名是 destroy  的按钮添加点击事件
    - 点击当前按钮 删除当前按钮所在的 li  
  - 5 实现编辑功能
    - 5.1 双击标题的时候 当前li 的类名添加   editing
      - 5.1.1 给当前标题添加双击事件  
      - 5.1.2 给当前li 添加editing  添加editing后 当前隐藏的输入框会显示出来
    - 5.2 输入框的默认值为当前标题
    - 5.3  当用户没有编辑 的时候 按esc退出的时候 数据不发生变化
    - 5.4  当用户输入内容按回车键的时候  把标题更新 
    - 5.5当用户失去焦点的 时候  把输入框中的标题更新 
  - 6  Clear completed
    - 点击Clear completed  的时候删除所有的  已完成项
  -   7  number   item left
    - 通过计算属性检测当前complete未完成的状态

  ​	

  



