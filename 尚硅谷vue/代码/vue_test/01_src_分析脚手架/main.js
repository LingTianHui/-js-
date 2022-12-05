/* 
	该文件是整个项目的入口文件
*/
//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false

/* 
	关于不同版本的Vue：
	
		1.vue.js与vue.runtime.xxx.js的区别：
				(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
				(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

		2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
			render函数接收到的createElement函数去指定具体内容。
*/

//创建Vue实例对象---vm
new Vue({
	el:'#app',
	//render函数完成了这个功能：将App组件放入容器中
    render: h => h(App),
	// 就是一个精简版的箭头函数，但是因为结构简单，所以省略了参数的括号，以及作为返回值标志的return，进一步解释，这个render函数接受两个参数，分别是将要渲染的html标签，还有可选的第二个参数，则是将要渲染的内容。
	// 其实就是省去了一个模板解析器，因为在vue的源码中，模板解析器所占的份额是很大的，但是模板解析器又只有在生产阶段才会用到，在完成开发使用webpack编译以后，就转变为浏览器所认识的文件了，模板解析器也就不需要了，为了压缩最终的项目大小所以使用精简版的vue进行开发。
	// render:q=> q('h1','你好啊')

	// template:`<h1>你好啊</h1>`,
	// components:{App},
})