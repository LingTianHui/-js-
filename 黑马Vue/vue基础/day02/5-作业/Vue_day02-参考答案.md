## 每日作业-Vue第02天

### todos案例



###  1 提供的数据和 HTML结构

- 引入todos的CSS样式  （HTML和 CSS 已经写好 我们需要改成Vue动态渲染的）

  

```html
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

### 2 把数据渲染到页面上

- 根据completeed 的状态动态给li 绑定类名  
  - 未完成状态：不需要样式        完成状态： 类名为 completed      编辑状态：类名为 editing
  - 如果completed 为 true 则给当前li 添加  completed      

```html
<li v-for="(item, index) in todos"
    	v-bind:class="{completed: item.completed}"
    >
         <div class="view">
             <input type="checkbox" class="toggle"> 
             <label>{{item.title}}</label> <button class="destroy"></button>
    	</div> 
    	<input class="edit">
</li>
```

### 3 把类名是  new-todo 按回车键的时候  把输入框中的数据展示到页面上

- 1.  获取文本框中用户输入的数据
- 2. 判断数据是否非空   如果是空的，则什么都不做    如果不是空的，则添加到数组中
- 3.  添加到数组中
- 4.  清空文本框

```html
<header class="header">
            <h1>todos</h1>
            <!--
        @keydown="addTodo" 麻烦，还需要自己来判断 keyCode
        @keyup.13="addTodo" 按键修饰符
        @keyup.enter="addTodo" 修饰符别名，推荐用法
       -->
            <input class="new-todo" placeholder="What needs to be done?" 				                 @keyup.enter="addTodo" >
</header>
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
            },
            methods:{
                  addTodo(event) {
                    // 1. 获取文本框中用户输入的数据
                    var todoText = event.target.value.trim()
                    // 2. 判断数据是否非空
                    if (!todoText.length) {
                        return
                    }
					 // 3. 添加到数组中
                    const lastTodo = this.todos[this.todos.length - 1]
                    const id = lastTodo ? lastTodo.id + 1 : 1

                    // 3.1 当数组发生变化，则绑定渲染该数组的视图也会得到更新
                    this.todos.push({
                        id,
                        title: todoText,
                        completed: false
                    })

                    // 4. 清空文本框
                    event.target.value = ''
                },
            }
            }
        })
    </script>

```

### 4.  实现全选功能 

- 4.1 当点击三角即类名为 toggle-all  的复选框的时候 
  - 如果当前三角高亮  即 复选框为选中状态  让当前所有的li 为 完成状态
    - 通过双向绑定获取当前复选框的选中状态 
  - 否则为未完成状态 
- 4.2  当点击单个li 里面的复选框的时候 如果当前复选框选中  则当前的状态为完成状态
  - 通过双向绑定获取当前复选框选中状态  通过选中状态动态改变  completed 的值  
- 4.3  如果当前所有的li 都处于完成状态 即 复选框都选中 则上面的  toggle-all  复选框选中 有一个没有选中则当前toggle-all  复选框  处于未选中状态

```html
<section class="main">
    <!-- 4.1 通过双向绑定获取当前复选框的选中状态   --->
    <input v-model="toggleStat"
           id="toggle-all" 
           type="checkbox" class="toggle-all">

    <ul class="todo-list">
                <li v-for="(item, index) in todos" 
                    v-bind:class="{completed: item.completed}">
                    <div class="view">
                            <!--  4.2  当点击单个li 里面的复选框的时候 
										如果当前复选框选中  则当前的状态为完成状态
									4.2.1 通过双向绑定获取当前复选框选中状态  
										通过选中状态动态改变  completed 的值  
							--->
                        <input type="checkbox" class="toggle" v-model="item.completed">
                        <label>{{item.title}}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit">
                </li>
            </ul>
</section>       
  <script>
        new Vue({
            el: "#todoapp",
            methods: {
                addTodo(event) {
               
                },
                   // 删除任务项
                removeTodo(delIndex, event) {
                    this.todos.splice(delIndex, 1)
                },
            },
            computed: {
                toggleStat: {
                    /*
                    	当读取一个变量的时候会触发该变量的getter
                    	当修改该变量时候会触发他的setter.
                    
                    */
                    get() {
                        // 4.3 4.3  如果当前所有的li 都处于完成状态 即 复选框都选中 则上面的  toggle-all  复选框选中 有一个没有选中则当前toggle-all  复选框  处于未选中状态
                        return this.todos.every(item => item.completed)
                    },
                    //  当复选框为选中的时候当前  传入的为 true  没有选中传入的为false 
                    set(val) {
                        this.todos.forEach(todo => todo.completed = val)
                    }
                }
            }
        })
    </script>
```

### 5  实现删除功能

- 给类名是 destroy  的按钮添加点击事件
- 点击当前按钮 删除当前按钮所在的 li  

```html
  <section class="main">
            <input v-model="toggleStat" id="toggle-all" type="checkbox" 
                   class="toggle-all">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">

                <li v-for="(item, index) in todos" 
                    v-bind:class="{completed: item.completed}">
                    <div class="view">
                        <input type="checkbox" class="toggle" v-model="item.completed">
                        <label>{{item.title}}</label>
                        <!--  5.1  给按钮按钮添加点击事件 -->
                        <button class="destroy" 
                                @click="removeTodo(index)">
                        </button>
                    </div>
                    <input class="edit">
                </li>
            </ul>
        </section>
  <script>
        new Vue({
            el: "#todoapp",
            methods: {
                addTodo(event) {
               
                },
                 // 删除任务项
                removeTodo(delIndex) {
                    this.todos.splice(delIndex, 1)
                },
            },

        })
    </script>
```

### 6  实现编辑功能

- 6.1 双击标题的时候 当前li 的类名添加   editing

  - 6.1.1 给当前标题添加双击事件  
  - 6.1.2 给当前li 添加editing  添加editing后 当前隐藏的输入框会显示出来

- 6.2 输入框的默认值为当前标题

- 6.3  当用户没有编辑 的时候 按esc退出的时候 数据不发生变化

- 6.4  当用户输入内容按回车键的时候  把标题更新 

- 6. 5当用户失去焦点的 时候  把输入框中的标题更新 

  

```html

  <section class="main">
            <input v-model="toggleStat" id="toggle-all" type="checkbox" 
                   class="toggle-all">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
				<!-- 
					6.1.1 点击的时候 通过一个标识符 来控制是否给当前li 添加   类名
				-->
                <li v-for="(item, index) in todos" 
                  v-bind:class="{completed: item.completed, editing: item === currentEditing}">
                    <div class="view">
                        <input type="checkbox" class="toggle" v-model="item.completed">
                         <!-- 
								6.1.1 给当前标题添加双击事件  
								点击的时候 通过一个标识符 来控制是否给当前li 添加   类名
						-->
                        <label
                                 @dblclick="currentEditing = item"
                               >{{item.title}}</label>
                  
                        <button class="destroy" 
                                @click="removeTodo(index)">
                        </button>
                    </div>
                    <!-- 6.2 输入框的默认值为当前标题 
						6.3  当用户没有编辑 的时候 按esc退出的时候 数据不发生变化
						6.4  当用户输入内容按回车键的时候  把标题更新
						6.5当用户失去焦点的 时候  把输入框中的标题更新 
					-->
                    <input class="edit" 
                           :value="item.title"
                            @keyup.esc="currentEditing = null"
                            @keyup.enter="saveEdit(item, index, $event)"
                            @blur="saveEdit(item, index, $event)"

                           >
                </li>
            </ul>
        </section>

  <script>
        new Vue({
            el: "#todoapp",
            data: {
                // 6.1.2  标识符默认的为空即一开始加载的时候类名 editing  不加载
                currentEditing: null,
            },
            methods:{
                 // 保存编辑项
                saveEdit(item, index, event) {
                    // 1. 拿到文本框中的数据
                    //    非空校验
                    //    如果为空，则直接删除这个 item
                    //    如果不为空，则修改任务项的 title 数据
                    var editText = event.target.value.trim()

                    // 程序员要具有工匠精神：优化简写
                    // !editText.length ?
                    //   this.todos.splice(index, 1) :
                    //   item.title = editText

                    if (!editText.length) {
                        // 将元素直接从数组中移除
                        return this.todos.splice(index, 1)
                    }

                    // 2. 将数据设置到任务项中
                    item.title = editText

                    // 3. 去除 editing 样式
                    this.currentEditing = null
                },
            }
        })
    </script>
```

### 7 Clear completed

- 点击Clear completed  的时候删除所有的  已完成项

```html
    <footer class="footer">
     
        <button
          class="clear-completed"
          @click="removeAllDone">Clear completed</button>
     </footer>
  <script>
        new Vue({
            el: "#todoapp",
            data: {
                // 6.1.2  标识符默认的为空即一开始加载的时候类名 editing  不加载
                currentEditing: null,
            },
            methods:{
               
   // 删除所有已完成任务项
      removeAllDone() {
        // 找到所有已完成的任务项，把其删除。错误的写法
        // this.todos.forEach((item, index) => {
        //   if (item.completed) {
        //     // 已完成
        //     console.log(item.title)
        //     this.todos.splice(index, 1)
        //   }
        // })

        // 把所有需要保留的数据过滤出来，然后重新赋值给 todos
        this.todos = this.todos.filter(item => !item.completed)

        // 如果想要就在遍历的过程去删除，则可以使用 for 循环
        // 没删除一个，我们可以控制让索引 --
        // for (let i = 0; i < this.todos.length; i++) {
        //   if (this.todos[i].completed) {
        //     this.todos.splice(i, 1)
        //     i--
        //   }
        // }
      },
            }
        })
    </script>


```

### **8**       number   item left

- 通过计算属性检测当前complete未完成的状态

````html
     <span class="todo-count"><strong>{{leftCount}}</strong> item left</span>


  <script>
        new Vue({
            computed: {

                leftCount: function() {
                    return this.todos.filter(item => !item.completed).length
                }
            }
        })
    </script>
````







