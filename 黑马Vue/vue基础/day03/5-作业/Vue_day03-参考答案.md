## 每日作业-Vue第03天

### todos案例-组件化抽离



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

### 2 抽离头部组件

- 把头部封装到一个组件中 
- 给输入框绑定事件
- 当用户输入完数据后  通过子向父传值     把获取的用户输入的信息提交到父组件中去
- 父组件接收到子组件传递的数据 存放到todos 中 
- 父组件中展示头部组件

```html
  <section id="todoapp" class="todoapp">
      	<!-- 2.2 父组件中展示头部组件
			2.3 父组件接收到子组件传递的数据
		-->
        <myheader @inpvalue="addTodo"></myheader>

   </section>

<script>
     //   1、把header  部分提取出来 
        var myheader = {
                template: `
                <header class="header">
                    <h1>todos</h1>
                    <input placeholder="What needs to be done?"
                    @keyup.enter="addToParent" class="new-todo">
                </header>
            `,
                methods: {
                    //1.1  把用户输入的数据传递到父组件中去
                    addToParent(event) {
                        var todoText = event.target.value.trim()
                        if (!todoText.length) {
                            return
                        }
                        this.$emit("inpvalue", todoText)
                    }
                }
            }
        
       new Vue({
            el: "#todoapp",
            data: {
                currentEditing: null,
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
        	  methods: {
                addTodo(todoText) {
                    # 2.4 父组件接收到子组件传递的数据 存放到todos 中 
                    const lastTodo = this.todos[this.todos.length - 1]
                    const id = lastTodo ? lastTodo.id + 1 : 1
                    //当数组发生变化，则绑定渲染该数组的视图也会得到更新
                    this.todos.push({
                        id,
                        title: todoText,
                        completed: false
                    })
                    // 清空文本框
                    event.target.value = ''
                },
             }
           # 2.1 注册子组件
            components: {
           
                myheader
            }
        })
</script>
```

###  3 抽离数据展示组件

- 3.1 把显示数据的代码封装到一个组件中 
- 3.2 把父组件中的todos 传递过来  子组件接收到父组件传递过来的数据 进行渲染
- 3.3 点击删除  删除当前的数据
- 3.4 双击的时候 当前数据可编辑  
- 3.5  按enter键的时候 保存当前数据 
- 3.6 实现全选功能 



```html

    <section id="todoapp" class="todoapp">
        <!-- 3.2.1  父组件通过属性绑定 :todos="todos"   把数据传递给子组件  -->
        
        <!-- 3.3.3   父组件通过 事件监听 @removetodo="removeTodo"   接收子组件传递过来的数据  -->
        <!--  3.4.2   父组件通过 事件监听   @dbl-click="aaaa"   接收子组件传递过来的数据         -->
        <mylist :todos="todos" @dbl-click="aaaa" 
                @removetodo="removeTodo"
                @save-edit="saveEdit" 
                :currentediting="currentEditing" 
                >
        </mylist>

    </section>
    <script src="js/vue.js"></script>

    <script>
        var mylist = {
            # 3.2.2   子组件通过 props 接收父组件传递过来的数据
            props: ["todos", "currentediting"],
            template: ` 
            <section class="main">
				# 3.6 实现全选功能    通过双向绑定   计算属性  toggleStat1
               <input v-model="toggleStat1" id="toggle-all" 
  				type="checkbox" class="toggle-all">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
					  # 3.2.3   把todos 展示到当前页面
                        <li v-for="(item, index) in todos" 
                        v-bind:class="{completed: item.completed,
						editing: item === currentediting}">
                            <div class="view">
                                <input type="checkbox" class="toggle"
									v-model="item.completed">
			
							# 3.4 双击的时候 当前数据可编辑  
							# 3.4.1 添加双击事件 我们通过   类名  editing  来控制当前输入框显示
							# 在父组件中定义一个标识符 currentEditing  默认为 空 当我们双击的时候
							# 给当前点击的li 添加  editing  类名
					
                                <label @dblclick="doubleMethods(item)">
									{{item.title}}</label>
						
								#3.3 点击删除  删除当前的数据  
								#3.3.1 给按钮绑定事件 需要把当前的id 传入过来
	
                                <button class="destroy" 
									@click="removeTodoParent(index, $event)">
        						</button>
                            </div>
					
							# 3.5  按enter键的时候 保存当前数据 
                            <input class="edit" 
						@keyup.enter="saveEdit(item, index, $event)"
					:value="item.title" 
						@keyup.esc="currentediting = null">
                        </li>
                </ul>
            </section>
            `,
            methods: {
                #  3.3.2  删除操作  子组件不要操作父组件里面的数据 把对应的数据传递到父组件中
                
                removeTodoParent(index) {
                    this.$emit("removetodo", index)
                },
                # 3.5.1  把当前数据发送到父元素     通过父元素保存子元素数据   
                saveEdit(item, index, event) {
                    var editText = event.target.value.trim()
                    this.$emit("save-edit", editText, item, index)
                },
				# 3.4.2   子组件 把当前点击的li 传递到父元素                      
                doubleMethods(item) {
                    this.$emit("dbl-click", item)
                }
            },
            computed: {
                # 3.6.1  实现全选功能  
                toggleStat1: {
                    get() {
                        return this.todos.every(item => item.completed)
                    },
                    set(val) {
                        this.todos.forEach(todo => todo.completed = val)
                    }
                },
            },
        }

        new Vue({
            el: "#todoapp",
            data: {
                currentEditing: null,
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
            methods: {
                // 3.3.4     删除任务项   根据子组件传递过来的 id 删除对应的数据
                removeTodo(delIndex) {
                    this.todos.splice(delIndex, 1)
                },
                // 保存编辑项
                saveEdit(editText, item, index) {
                    console.log(item, index, '-------------')
                        // 1. 拿到文本框中的数据
                        //    非空校验
                        //    如果为空，则直接删除这个 item
                        //    如果不为空，则修改任务项的 title 数据


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
                // 删除所有已完成任务项
                removeAllDone() {

                    this.todos = this.todos.filter(item => !item.completed)

                },
               # 3.4.3    把当前li的数据 赋值给 currentEditing 即让当前li 绑定 类名
                aaaa(item) {
                    this.currentEditing = item
                }
            },
            computed: {


            },
            components: {
                myheader,
                mylist,
            }
        })
    </script>
</body>

</html>


```

###  4  抽离fotter 部分

- 4.1 把footer 部分的代码封装到一个组件中 
- 4.2   实现 未选中部分的展示
- 4.3  删除已经选中的 

```html
  <section id="todoapp" class="todoapp">
    
        <myfotter :leftcount="leftCount" @delete-all-done="removeAllDone"></myfotter>

    </section>

<script>
		# 4.1 把footer 部分的代码封装到一个组件中 
        var myfotter = {
            props: ['leftcount'],
            template: `
            <footer class="footer">
            <span class="todo-count"><strong>{{leftcount}}</strong> item left</span>
            <button class="clear-completed" @click="deleteAll">Clear completed</button>
        </footer>
            `,
            methods: {
                deleteAll() {
                    this.$emit("delete-all-done")
                }
            }
        }
        
        new Vue({
     
             computed: {

                leftCount: function() {
                    return this.todos.filter(item => !item.completed).length
                },

            },
            components: {
                myheader,
                mylist,
                myfotter
            }
        })
	
</script>
```



