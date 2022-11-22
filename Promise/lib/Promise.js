// 自定义peomise函数模块，我们使用的是ES5的模块语法，因为之后的版本对于模块的引用都需要进行编译（匿名函数）
(function(window){
    // 为防止因字符串错误而导致无法纠错，我们将几个常用的字符串使用常量代替
    const PENDING='pending'
    const RESOLVED='resloved'
    const REJECTED='rejected'
    // Promise构造函数
    // excutor：执行器函数（同步执行）
    function Promise(excutor){
        // 为防止在后续过程中that的指向发生变化，我们要固定that的值
        const that=this
        // Promise有自带的属性
        that.status=PENDING
        // 给promise对象指定一个用于存储结果数据类型的属性
        that.data=undefined
        // 这是一个数组，里面存放的应该是元素，每个元素的结构应该如下所示：{onresolved(){},onrejected(){}}
        that.callbacks=[]
        // 当被调用以后，我们应该立即执行函数,由于里面的参数函数我们没有定义，我们需要首先定义两个参数函数
        function resolve(value){
            // 如果状态不是pending，则直接结束
            if(that.status!==PENDING){
                return
            }
            // 当我们执行这个函数的时候，我们首先应该改变对象的状态
            that.status='resolved'
            // 保存value的数据
            that.data=value
            // 如果有待执行的callback函数，立即将其加入到异步执行回调函数的队列中等待执行
            if(that.callbacks.length>0) {
                setTimeout(()=>{//放入队列中执行所有成功的回调
                    that.callbacks.forEach(callbacksObj => {
                        callbacksObj.onresolve(value)
                    });
                })
            }
        }
        function reject(reason){
            // 由于状态只能被修改一次，所以我们要首先进行一个判断，看是否是pending
            // 如果状态不是pending，则直接结束
            if(that.status!==PENDING){
                return
            }
            that.status=REJECTED
            // 保存reason的数据
            that.data=reason
            // 如果有待执行的callback函数，立即将其加入到异步执行回调函数的队列中等待执行
            if(that.callbacks.length>0) {
                setTimeout(()=>{//放入队列中执行所哟成功的回调
                    that.callbacks.forEach(callbacksObj => {
                        callbacksObj.onrejected(reason)
                    });
                })
            }
        }
        // 我们想到需要进行错误的获取与显示
        try {
            excutor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    // 同时promise还有两个自带的原型方法then以及catch
    Promise.prototype.then=function(onresolved,onrejected) {
        const that=this
        // 返回一个新的promise对象，这是then的特性
        return new Promise((resolve, reject) => {
        // 此函数的参数也是回调函数，所以我们需要将其加入到回调函数的数组中,条件是假设当前状态是pending
        if(that.status===PENDING){
            that.callbacks.push({
                onresolved(value){
                    try {
                        const result=onresolved(that.data)
                        if(result instanceof Promise){
                            // 下面的代码节可以用更加简单的代码来实现
                            // result.then(resolve,reject)
                            // 因为就结构而言，只是传入参数并且有一个只针对传入参数的函数，我们可以直接使用带参数的函数作为传入对象
                            result.then(
                                value=>{
                                    resolve(value)
                                },
                                reason=>{
                                    reject(reason)
                                }
                            )
                        }else{
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                },
                onrejected(reason){
                    try {
                        const result=onrejected(that.data)
                        if(result instanceof Promise){
                            // 下面的代码节可以用更加简单的代码来实现
                            // result.then(resolve,reject)
                            // 因为就结构而言，只是传入参数并且有一个只针对传入参数的函数，我们可以直接使用带参数的函数作为传入对象
                            result.then(
                                value=>{
                                    resolve(value)
                                },
                                reason=>{
                                    reject(reason)
                                }
                            )
                        }else{
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        }else if(that.status===RESOLVED){
            setTimeout(() => {
                // 这里有三个点比较重要：
                // 1.可能会抛出异常，此时return的promise就会失败，reason就是error；
                // 2.如果回调函数返回不是一个promise，那么代表着return的promise成功了，返回值为value；
                // 3.如果回调函数返回的是一个promise，那么代表return的promise的结果就是这个promise的结果。
                // 我们对代码进行改进
                try {
                    const result=onresolved(that.data)
                    if(result instanceof Promise){
                        // 下面的代码节可以用更加简单的代码来实现
                        // result.then(resolve,reject)
                        // 因为就结构而言，只是传入参数并且有一个只针对传入参数的函数，我们可以直接使用带参数的函数作为传入对象
                        result.then(
                            value=>{
                                resolve(value)
                            },
                            reason=>{
                                reject(reason)
                            }
                        )
                    }else{
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            },0);
        }else{
            setTimeout(() => {
                setTimeout(() => {
                    // 这里有三个点比较重要：
                    // 1.可能会抛出异常，此时return的promise就会失败，reason就是error；
                    // 2.如果回调函数返回不是一个promise，那么代表着return的promise成功了，返回值为value；
                    // 3.如果回调函数返回的是一个promise，那么代表return的promise的结果就是这个promise的结果。
                    // 我们对代码进行改进
                    try {
                        const result=onrejected(that.data)
                        if(result instanceof Promise){
                            // 下面的代码节可以用更加简单的代码来实现
                            // result.then(resolve,reject)
                            // 因为就结构而言，只是传入参数并且有一个只针对传入参数的函数，我们可以直接使用带参数的函数作为传入对象
                            result.then(
                                value=>{
                                    resolve(value)
                                },
                                reason=>{
                                    reject(reason)
                                }
                            )
                        }else{
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                },0);
            }, 0);
        }
        })
    }
    Promise.prototype.catch=function(onrejected) {
    }
    // Promise函数对象的resolve方法
    Promise.resolve=function(value){
    }
    // Promise函数对象的reject方法
    Promise.resolve=function(reason){
    }
    // promise函数对象的all方法，参数接受一个数组，只有当数组中所有的promise对象都成功，该方法才返回成功，返回的是一个promise
    Promise.all=function(){}
    // promise函数的race函数，返回的也是一个promise，但是其成功与否取决于第一个传入的promise
    Promise.race=function(){}
    // 向外暴露该函数
    window.Promise=Promise
})(window)