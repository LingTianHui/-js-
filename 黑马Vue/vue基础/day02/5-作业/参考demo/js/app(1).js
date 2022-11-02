/**
 * Vue
 * MVVM 框架
 * 这个思想的哲学就是：数据驱动视图
 * 把需要改变视图的数据都初始化到 Vue 中
 * 然后我们就可以通过修改 Vue 中的数据，从而实现对视图的更新
 */

;
((Vue) => {
  const todos = [{
      id: 1,
      title: '吃饭',
      completed: false
    },
    {
      id: 2,
      title: '睡觉',
      completed: false
    },
    {
      id: 3,
      title: '打豆豆',
      completed: true
    }
  ]

  // 什么时候需要封装自定义指令：
  //    当你需要进行一些底层 DOM 操作的时候，使用自定义指令更为方便
  // 注册一个全局自定义指令 `v-focus`
  // 第一个参数：指令名称，focus
  //    使用的时候，必须加上 v- 前缀来使用
  // 后面会解释为什么一个简简单单的自动获得焦点都需要封装一个自定义指令
  // Vue 带来便利的同时也会有一些让人头疼的问题，所以在软件开发中，有这么一句话：没有银弹
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      // el.focus()
      // el 就是作用了 v-focus 的 DOM 元素
      console.log(el)
      el.focus()
    }
  })

  // 在 Vue 中，不要出现这样的代码
  // document.getElementById('xx')

  Vue.directive('auto-active', {
    // 当被绑定的元素插入到 DOM 中时……
    // 这里就是纯原生 DOM 操作
    inserted: function (el) {
      // 聚焦元素
      // el.focus()
      // el 就是作用了 v-focus 的 DOM 元素
      // ul a
      // 给 a 注册点击事件
      var links = el.getElementsByTagName('a')
      Array.from(links).forEach(function (link) {
        link.onclick = function () {
          console.log(this)
        }
      })
    }
  })

  window.app = new Vue({
    el: '#todoapp',
    data: {
      // EcmaScript 6 对象属性简写方式
      // 当 key 和 值的名字一样的时候，可以省略简写
      // 下面的情况等价于 todos: todos
      todos,
      filterStat: 'all',
      currentEditing: null,
      toggleAllStat: true,
      // 这里不要使用 this 因为 this 指向的是 window
      // 所以这里无法实现你想要的结果
      // leftCount: this.todos.filter(item => !item.completed).length
    },
    computed: {
      // 该属性比较特殊，从代码来看是一个方法，但是只能当做属性来使用
      // 也就是说，在模板中不能调用它，只能当做属性来使用它
      leftCount: function () {
        return this.todos.filter(item => !item.completed).length
      },
      filterTodos: function () {
        switch (this.filterStat) {
          case 'active':
            return this.todos.filter(item => !item.completed)
            break
          case 'completed':
            return this.todos.filter(item => item.completed)
            break
          default:
            return this.todos
            break
        }
      },
      // 使用计算属性的方式处理全选的联动效果
      toggleStat: {
        get() {
          return this.todos.every(item => item.completed)
        },
        set (val) {
          this.todos.forEach(todo => todo.completed = val)
        }
      }
    },
    methods: {
      // EcmaScript 6 对象属性函数的简写方式
      // 等价于：addTodo: function () {}
      // 它没有任何特殊的特性，仅仅是简写了而已
      addTodo(event) {
        // 1. 获取文本框中用户输入的数据
        // 2. 判断数据是否非空
        //    如果是空的，则什么都不做
        //    如果不是空的，则添加到数组中
        // 3. 添加到数组中
        // 4. 清空文本框
        var todoText = event.target.value.trim()
        if (!todoText.length) {
          return
        }

        const lastTodo = this.todos[this.todos.length - 1]
        const id = lastTodo ? lastTodo.id + 1 : 1

        // 当数组发生变化，则绑定渲染该数组的视图也会得到更新
        this.todos.push({
          id,
          title: todoText,
          completed: false
        })

        // 清空文本框
        event.target.value = ''
      },

      toggleAll(event) {
        // 获取点击的 checkbox 的选中状态
        var checked = event.target.checked

        // 遍历数组中的所有元素，把每个元素的 completed 都设置为当前点击的 checkbox 的状态
        // 由于我们使用 v-model 为每一个任务项的完成状态都绑定了 completed
        // 所以当数据发生变化的时候，任务项的完成状态也会跟着变化
        this.todos.forEach(todo => todo.completed = checked)
      },

      // 删除任务项
      removeTodo(delIndex, event) {
        this.todos.splice(delIndex, 1)
      },

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

      // 方法也可以用于模板绑定
      // 在模板中调用方法，方法的返回值将会渲染到绑定的位置
      getLeftCount() {
        console.log('方法被调用了')
        return this.todos.filter(item => !item.completed).length
      },

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

      // 状态切换（先不要使用）
      // toggle (item, event) {
      //   // console.log(item.completed) // false
      //   // 之前这里没有这个问题，应该 Vue 更新了新的机制了
      //   //  声明周期、模板更新的问题
      //   //  这里的解决方案就是把你的代码放到 Vue.nextTick() 的回调函数中
      //   Vue.nextTick(() => {
      //     this.toggleAllStat = this.todos.every(item => item.completed)
      //   })
      // }
    },
    // 配置局部自定义指令
    directives: {
      // 当作用了该指令的元素所在模板发生更新的时候，则这个 update 钩子会自动调用
      editingFocus: {
        // 在指令钩子中，函数内部的 this 是 window
        update(el, binding) {
          if (binding.value) {
            el.focus()
          }
        }
      }
    }
  })

  window.onhashchange = function () {
    // 得到点击的路由 hash
    var hash = window.location.hash.substr(2) || 'all'

    // 设置到程序中的过滤状态
    //    过滤状态一旦改变，则计算属性会感知到这个 filterStat 变了
    //    当它感知到 filterStat 变了之后，就会重新计算执行
    //    当 filterTodos 重新计算执行之后，数据得到了更新，则自动同步更新到视图中
    window.app.filterStat = hash
  }

  // 页面第一次进来，执行一次
  window.onhashchange()
})(Vue)
