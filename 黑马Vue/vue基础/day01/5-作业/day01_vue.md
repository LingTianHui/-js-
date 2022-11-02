# 每日作业-Vue第01天



## tab栏切换增强版

- ### 题目描述

  - 点击tab栏  内容区域显示对应的内容 
  - 如 点击   SECTION 1   则 内容区域显示 对应 SECTION 1 的内容  同时当前 SECTION的字体颜色变成蓝色 

- ### 训练目标

  - 能够理解vue 中的数据渲染
  - 能够理解 v-for,  v-if  , v-bind ,  v-click 的使用 
  - 能够理解 vue 中调用函数的时候传递参数

- ### 训练提示

  - 提供的数据如下
  
     ```php+HTML
  	1、	数据
  		list: [{
                    id: 1,
                    title: 'Section 1',
                    content: 'content1'
                  }, {
                     id: 2,
                     title: 'Section 2',
                     content: 'content2'
                  }, {
                      id: 3,
                      title: 'Section 3',
                      content: 'content3'
                  }, {
                      id: 4,
                      title: 'Section 4',
                      content: 'content4'
                  }, {
                      id: 5,
                      title: 'Section 5',
                      content: 'content5'
                  }, {
                      id: 6,
                      title: 'Section 6',
                      content: 'content6'
                  }]   
     
     2、 HTML 结构如下 
     <div id="app" class="vertical-tab">
         <!-- 左侧tab栏 -->
         <ul class="nav nav-tabs1">
             <li class="active"><a href="#"> Section 1 </a></li>
             <li class=""><a href="#"> Section 2 </a></li>
             <li class=""><a href="#"> Section 3 </a></li>
     	</ul>
     	<!-- 内容区域 -->
         <div class="tab-content tabs">
             <div class="tab-pane  fade active">
                 <h3>Section 1</h3>
                 <p>content1</p>
             </div>
             <div class="tab-pane  fade">
                 <h3>Section 2</h3>
                 <p>content2</p>
             </div>
             <div class="tab-pane  fade">
                 <h3>Section 3</h3>
                 <p>content3</p>
             </div>
             <div class="tab-pane  fade">
                 <h3>Section 4</h3>
                 <p>content4</p>
             </div>
             <div class="tab-pane  fade">
                 <h3>Section 5</h3>
                 <p>content5</p>
             </div>
             <div class="tab-pane  fade">
                 <h3>Section 6</h3>
                 <p>content6</p>
             </div>
         </div>
         <ul class="nav nav-tabs2">
             <!-- 右侧tab栏 -->
             <li class=""><a href="#"> Section 4 </a></li>
             <li class=""><a href="#"> Section 5 </a></li>
             <li class=""><a href="#"> Section 6 </a></li>
         </ul>
     </div>          
                  
     ```
  
  
  
  - 第一步：  将 list 中的数据title 渲染到 左侧和 右侧的tab栏中 
    - 注意：  左右各渲染3条数据
  - 第二步：  将 list 中的数据title 和  content  渲染到 内容区域
  - 第三步：  给左侧的tab栏中的li绑定事件  实现动态切换active 类名 
    - 注意： 给点击的当前li  添加类名 active    即可让当前的li字体颜色改变 (类名是 active的样式已经在CSS中提前定义好 )
    - 其他 li  需要移除类名 active 
  - 第四步： 拿到当前点击li的索引   让 内容区域中 对应索引类名是 tab-pane 的 div  显示
    - 注意： 给  类名是  tab-pane   的 div  添加  类名 active  即可让当前div 显示出来  (类名是 active的样式已经在CSS中提前定义好 )
    - 其他  tab-pane   的 div  需要移除类名 active 
  - 第五步： 给右侧的tab栏中的li绑定事件  实现动态切换active 类名 
    -  注意： 给点击的当前li  添加类名 active    即可让当前的li字体颜色改变 (类名是 active的样式已经在CSS中提前定义好 )
  - 第六步： 拿到当前点击li的索引   让 内容区域中 对应索引类名是 tab-pane 的 div  显示
    - 注意：  这里需要注意索引问题：  
      - 点击右侧第一个div 的时候 需要让内容区域中的第 4个 div 显示出来 
      - 点击右侧第2个div 的时候 需要让内容区域中的第 5个 div 显示出来 
  
- ### 操作步骤

  - HTML

    ```html
    <div id="app" class="vertical-tab">
        <!-- 左侧tab栏 -->
        <ul class="nav nav-tabs1">
            <li class="active"><a href="#"> Section 1 </a></li>
            <li class=""><a href="#"> Section 2 </a></li>
            <li class=""><a href="#"> Section 3 </a></li>
    	</ul>
    	<!-- 内容区域 -->
        <div class="tab-content tabs">
            <div class="tab-pane  fade active">
                <h3>Section 1</h3>
                <p>content1</p>
            </div>
            <div class="tab-pane  fade">
                <h3>Section 2</h3>
                <p>content2</p>
            </div>
            <div class="tab-pane  fade">
                <h3>Section 3</h3>
                <p>content3</p>
            </div>
            <div class="tab-pane  fade">
                <h3>Section 4</h3>
                <p>content4</p>
            </div>
            <div class="tab-pane  fade">
                <h3>Section 5</h3>
                <p>content5</p>
            </div>
            <div class="tab-pane  fade">
                <h3>Section 6</h3>
                <p>content6</p>
            </div>
        </div>
        <ul class="nav nav-tabs2">
            <!-- 右侧tab栏 -->
            <li class=""><a href="#"> Section 4 </a></li>
            <li class=""><a href="#"> Section 5 </a></li>
            <li class=""><a href="#"> Section 6 </a></li>
        </ul>
    </div>       
    ```

  - CSS

    ```css
      <style>
            * {
                margin: 0;
                padding: 0;
            }
            
            .vertical-tab {
                width: 920px;
                margin: 100px auto;
            }
            
            .vertical-tab .nav {
                list-style: none;
                width: 200px;
            }
            
            .vertical-tab .nav-tabs1 {
                border-right: 3px solid #e7e7e7;
            }
            
            .vertical-tab .nav-tabs2 {
                border-left: 3px solid #e7e7e7;
            }
            
            .vertical-tab .nav a {
                display: block;
                font-size: 18px;
                font-weight: 700;
                text-align: center;
                letter-spacing: 1px;
                text-transform: uppercase;
                padding: 10px 20px;
                margin: 0 0 1px 0;
                text-decoration: none;
            }
            
            .vertical-tab .tab-content {
                color: #555;
                background-color: #fff;
                font-size: 15px;
                letter-spacing: 1px;
                line-height: 23px;
                padding: 10px 15px 10px 25px;
                display: table-cell;
                position: relative;
            }
            
            .vertical-tab .nav-tabs1 {
                float: left;
            }
            
            .vertical-tab .tabs {
                width: 500px;
                box-sizing: border-box;
                float: left;
            }
            
            .vertical-tab .tab-content h3 {
                font-weight: 600;
                text-transform: uppercase;
                margin: 0 0 5px 0;
            }
            
            .vertical-tab .nav-tabs2 {
                float: right;
            }
            
            .tab-content .tab-pane {
                display: none;
            }
            
            .tab-content .tab-pane.active {
                display: block;
            }
    </style>
    ```

  - data 中的数据 

    ```
    	     list: [{
                      id: 1,
                      title: 'Section 1',
                      content: 'content1'
                    }, {
                       id: 2,
                       title: 'Section 2',
                       content: 'content2'
                    }, {
                        id: 3,
                        title: 'Section 3',
                        content: 'content3'
                    }, {
                        id: 4,
                        title: 'Section 4',
                        content: 'content4'
                    }, {
                        id: 5,
                        title: 'Section 5',
                        content: 'content5'
                    }, {
                        id: 6,
                        title: 'Section 6',
                        content: 'content6'
                    }]   
    ```

    

    ​	

  



