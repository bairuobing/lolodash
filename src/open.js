/**
 * lolodash
 */
window.__ = function () {
    const _typeMap = {
        Arguments: '[object Arguments]',
        Array: '[object Array]',
        AsyncFunction: '[object AsyncFunction]',
        Boolean: '[object Boolean]',
        Date: '[object Date]',
        DOMException: '[object DOMException]',
        Error: '[object Error]',
        Function: '[object Function]',
        HTMLCollection: "[object HTMLCollection]",
        GeneratorFunction: '[object GeneratorFunction]',
        Map: '[object Map]',
        Number: '[object Number]',
        Null: '[object Null]',
        Object: '[object Object]',
        Promise: '[object Promise]',
        Proxy: '[object Proxy]',
        RegExp: '[object RegExp]',
        Set: '[object Set]',
        String: '[object String]',
        Symbol: '[object Symbol]',
        Undefined: '[object Undefined]',
        WeakMap: '[object WeakMap]',
        WeakSet: '[object WeakSet]',
        ArrayBuffer: '[object ArrayBuffer]',
        DataView: '[object DataView]',
        Float32Array: '[object Float32Array]',
        Float64Array: '[object Float64Array]',
        Int8Array: '[object Int8Array]',
        Int16Array: '[object Int16Array]',
        Int32Array: '[object Int32Array]',
        Uint8Array: '[object Uint8Array]',
        Uint8ClampedArray: '[object Uint8ClampedArray]',
        Uint16Array: '[object Uint16Array]',
        Uint32Array: '[object Uint32Array]'
    }
    
    function _processPlaceholder(partials, args, placeholder) {
        var cut = 0
        return partials.map(element => {
            if (element == placeholder) {
                var idx = cut
                // 如果发现占位符，就在该占位符处按序放入用户传入的参数
                return args[cut++]
            } else {
                return element
            }
            
        }).concat(args.slice(cut))
        
    }
    return {
        objectPrototypeToString: objectPrototypeToString,
        iteratee: iteratee,
        property: property,
        matches: matches,
        matchesProperty: matchesProperty,
        fromPairs: fromPairs,
        toPairs: toPairs,
        head: head,
        noop: noop,
        uniq: uniq,
        identity: identity,
        isArguments: isArguments,
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isElement: isElement,
        isBoolean: isBoolean,
        isDate: isDate,
        isNull: isNull,
        isNaN: isNaN,
        isNumber: isNumber,
        isFunction: isFunction,
        isObject: isObject,
        isRegExp: isRegExp,
        isString: isString,
        isUndefined: isUndefined,
        isSymbol: isSymbol,
        isArrayLike: isArrayLike,
        isArrayLikeObject: isArrayLikeObject,
        isEmpty: isEmpty,
        isMap: isMap,
        isSet: isSet,
        isEqual: isEqual,
        isEqualWith: isEqualWith,
        isError: isError,
        isFinite: isFinite,
        isInteger: isInteger,
        isLength: isLength,
        isMatch: isMatch,
        isMatchWith: isMatchWith,
        isNative: isNative,
        isNil: isNil,
        isObjectLike: isObjectLike,
        isPlainObject: isPlainObject,
        isSafeInteger: isSafeInteger,
        isTypedArray: isTypedArray,
        chunk: chunk,
        compact: compact,
        clone: clone,
        cloneDeep: cloneDeep,
        flatten: flatten,
        flattenDeep: flattenDeep,
        flattenDepth: flattenDepth,
        concat: concat,
        difference: difference,
        differenceBy: 0,
        before: before,
        after: after,
        ary: ary,
        bind: bind,
        debounce: debounce,
        throttle: throttle,
        


    }


    function objectPrototypeToString(value) {
        return Object.prototype.toString.call(value)
    }
    
    function iteratee(func) {
        if (typeof func === 'function') {
            return func
        } else if (typeof func === 'string') {
            return property(func)
        } else if (Array.isArray(func)) {
            return matchesProperty(func)
        } else {
            return matches(func)
        }
    }

    function property(propName) {
        return obj => obj[propName]
    }

    function matches(source) {
        return function(obj) {
            for (var item in source) {
                return isMatch(obj, item)
            }
        }
    }

    function matchesProperty(array) {
        return matches(fromPairs(array))
    }

    function fromPairs(pairs) {
        var res = {}
        for (var i = 0; i < pairs.length; i++) {
            res[pairs[0]] = pairs[1]
        }
        return res
    }

    function toPairs(object) {
        var arr = []
        var keys = Object.keys(object)
        for(var item of keys) {
            if (object.hasOwnProperty(item)) {
                arr.push(item, object[item])
            }
        }
        return arr
    }

    function head(array) {
        return array && array.length ? array[0] : undefined
    }

    function noop() {
        return undefined
    }

    function uniq(array) {
        var res = []
        for (var item of array) {
            if (res.indexOf(item) < 0) {
                res.push(item)
            }
        }
        return res
    }

    function identity(value) {
        return value
    }

    function isArguments(value) {
        return objectPrototypeToString(value) == _typeMap.Arguments
    }

    function isArray(value) {
        return Array.isArray(value)
    }

    function isArrayBuffer(value) {
        return objectPrototypeToString(value) == _typeMap.ArrayBuffer
    }

    function isElement(value) {
        return objectPrototypeToString(value) == _typeMap.HTMLCollection
    }

    function isBoolean(value) {
        return objectPrototypeToString(value) == _typeMap.Boolean
    }

    function isDate(value) {
        return objectPrototypeToString(value) == _typeMap.Date
    }

    function isNull(value) {
        return objectPrototypeToString(value) == _typeMap.Null
    }
    // isNaN(undefined) == true But lodash is not
    function isNaN(value) {
        return value != value && isNumber(value)
    }

    function isNumber(value) {
        return objectPrototypeToString(value) == _typeMap.Number
    }

    function isFunction(value) {
        return objectPrototypeToString(value) == _typeMap.Function
    }

    function isObject(value) {
        return (typeof value == 'object' || typeof value == 'function') && value != null
    }

    function isRegExp(value) {
        return objectPrototypeToString(value) == _typeMap.RegExp
    }

    function isString(value) {
        return objectPrototypeToString(value) == _typeMap.String
    }

    function isUndefined(value) {
        return value == void 0
    }
    // 符号，不能带 new 创建
    function isSymbol(value) {
        return objectPrototypeToString(value) == _typeMap.Symbol
    }

    function isArrayLike(value) {
        return !isFunction(value) && (isArray(value) || isElement(value) || isString(value))
    }

    function isArrayLikeObject(value) {
        return isArrayLike(value) && (typeof value == 'object')
    }

    function isEmpty(value) {
        switch (objectPrototypeToString(value)) {
            case _typeMap.Array:
            case _typeMap.String:
            case _typeMap.Arguments:
                return value.length == 0
            case _typeMap.Map:
            case _typeMap.Set:
                return value.size == 0
            case _typeMap.Object:
                return Object.keys(value).length == 0
            case _typeMap.Null:
            case _typeMap.Undefined:
            case _typeMap.Boolean:
                return true
        }
        if(isNaN(value)) {
            return true
        }
    }

    function isMap(value) {
        return objectPrototypeToString(value) == _typeMap.Map
    }

    function isSet(value) {
        return objectPrototypeToString(value) == _typeMap.Set
    }
    // isEqual
    // a = { foo: { b: { foo: { c: { foo: null } } } } }
    // b = { foo: { b: { foo: { c: { foo: null } } } } }
    // a.foo.b.foo.c.foo = a
    // b.foo.b.foo.c.foo = b
    // 对象比较，并且深层比较可枚举属性
    /**
     * deepEqual
     * @param {Object} obj1 
     * @param {Object} obj2 
     * @param {Array} stack1 
     * @param {Array} stack2 
     * @return {boolean}
     */
    function deepEqual(obj1, obj2, stack1, stack2, customizer = undefined) {
        var flag = false
        if (customizer != undefined) {
            flag = customizer(obj1, obj2)
        }

        // 若两值为 object 类型，则继续判断其为何种具体类型
        var className = objectPrototypeToString(obj1)
        var classNameOther = objectPrototypeToString(obj2)
        if (className !== classNameOther) {
            if (flag) {
                return true
            } else {
                return false
            }
        }
        if (flag) {
            return true
        }
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + obj1 === '' + obj2
            case '[object Number]':
                if (isNaN(obj1)) return isNaN(obj2)
                return +obj1 === +obj2
            case '[object Date]':
            case '[object Boolean]':
                return +obj1 === +obj2
        }

        // 若不是数组
        if (className != '[object Array]') {
            // 只要是函数类型，就一定不相同
            if (className == '[object Function]' || classNameOther == '[object Function]') return false
        }
        // 实现不考虑 Map Set
        stack1 = stack1 || []
        stack2 = stack2 || []

        // 循环引用情况考虑
        var length = stack1.length
        // 将初始传入元素 与 栈内所有元素做对比，一旦发现重复就表示发生了循环引用
        while (length--) {
            if (stack1[length] === obj1) {
                return stack2[length] === obj2
            }
        }

        stack1.push(obj1)
        stack2.push(obj2)

        // 如果是数组
        if (className == '[object Array]') {
            length = obj1.length
            if (length !== obj2.length) return false

            while (length--) {
                if (!deepEqual(obj1[length], obj2[length], stack1, stack2, customizer)) return false
            }
        }
        // 对象判断
        else {
            var keys = Object.keys(obj1)
            var key
            length = keys.length

            if (Object.keys(obj2).length !== length) return false
            while (length--) {

                key = keys[length]
                if (!(obj2.hasOwnProperty(key) && deepEqual(obj1[key], obj2[key], stack1, stack2, customizer))) return false
            }
        }
        stack1.pop()
        stack2.pop()
        return true
    }

    function isEqual(value, other) {
        // 考虑循环引用
        var stk1 = []
        var stk2 = []
        return deepEqual(value, other, stk1, stk2)
    }

    function isEqualWith(value, other, customizer) {
        var stk1 = []
        var stk2 = []
        return deepEqual(value, other, stk1, stk2, customizer)
    }

    function isError(value) {
        return objectPrototypeToString(value) == _typeMap.Error
    }

    function isFinite(value) {
        return isNumber(value) && !(1 / value == 0)
    }

    function isInteger(value) {
        return value % 1 == 0
    }

    function isLength(value) {
        return isInteger(value) && value >= 0
    }

    function isMatch(object, source) {
        var merge = Object.assign({}, object, source)
        return isEqual(object, merge)
    }

    function isMatchWith(object, source, customizer=undefined) {
        var merge = Object.assign({}, object, source)
        return isEqualWith(object, merge, customizer)
    }

    function isNative(value) {
        return isFunction(value) && /\[native code\]/.test(value.toString())
    }

    function isNil(value) {
        // void [exp] 获取 undefined的原始值；防止局部作用域对于undefined的改写
        return value == void 0
    }

    function isObjectLike(value) {
        return typeof value == 'object' && !isNull(value)
    }

    function isPlainObject(value) {
        return Object.getPrototypeOf(value) == Object.prototype
    }

    function isSafeInteger(value) {
        return Number.isSafeInteger(value)
    }

    function isTypedArray(value) {
        var type = objectPrototypeToString(value)
        switch (type) {
            case  _typeMap.Float32Array: 
            case  _typeMap.Float64Array: 
            case  _typeMap.Int8Array: 
            case  _typeMap.Int16Array: 
            case  _typeMap.Int32Array: 
            case  _typeMap.Uint8Array: 
            case  _typeMap.Uint8ClampedArray: 
            case  _typeMap.Uint16Array: 
            case  _typeMap.Uint32Array: 
            return true
        }
        return false
    }

    function chunk(array, size=1) {
        var res = []
        for (var i = 0; i < array.length; i+=size) {
            res.push(array.slice(i, i + size))
        }
        return res
    }

    function compact(array) {
        var res = []
        for (var i of array) {
            if (!isEmpty(i) && i != 0) {
                res.push(i)
            }
        }
        return res
    }

    function clone(value) {
        // 外层拷贝，内层还是引用
        return Object.assign({},value)
    }

    function cloneDeep(value) {
        function helper(sheep, stack) {
            
            var className = objectPrototypeToString(sheep)
            switch (className) {
                case '[object RegExp]':
                case '[object String]':
                case '[object Date]':
                case '[object Boolean]':
                    return Object.assign({},sheep)
                case '[object Number]':
                    return sheep
            }
            // 循环引用
            stack = stack || []

            var length = stack.length
            // 将初始传入元素 与 栈内所有元素做对比，一旦发现重复就表示发生了循环引用
            while (length--) {
                if (stack[length] === sheep) {
                    // 一旦发现重复就不要再深入比对了
                    return 
                }
            }
            
            stack.push(sheep)
            // 若是数组
            if (className == '[object Array]') {
                length = sheep.length
                var dolly = new Array(length)
                while (length--) {
                    dolly[length] = helper(sheep[length], stack)
                }
            } else { // 若是对象
                var keys = Object.keys(sheep)
                length = keys.length
                var key
                var dolly = new Object()
                while (length--) {
                    key = keys[length]
                    dolly[key] = helper(sheep[key], stack)
                    
                }
            }
            stack.pop()
            return dolly
        }
        var stk = []
        return helper(value, stk)
    }

    function flatten(array) {
        return flattenDepth(array, 1)
    }

    function flattenDeep(array) {
        return flattenDepth(array, Infinity)
    }

    function flattenDepth(array, depth=1) {
        if (depth === 0) {
            return array.slice()
        }
        var res = []
        array.forEach(element => {
            if(isArray(element)) {
                var tmp = flattenDepth(element, depth - 1)
                res = [...res, ...tmp]
            } else {
                res.push(element)
            }
        })
        return res
    }

    function concat(array, ...values) {
        return array.concat(...values)
    }

    function difference(array, ...values) {
        var res = []
        var val = []
        for(var i = 0; i < values.length; i++) {
            val = val.concat(values[i])
        }

        for(var i = 0; i < val.length; i++) {
            if(!val.includes(array[i])) {
                res.push(array[i])
            }
        }
        return res
    }

    // 创建一个函数，该函数执行func不超过 n 次，之后再调用就只返回最终func的返回值
    function before(n, func) {
        var memo
        return function() {
            if(--n > 0){
                memo = func.call(this, ...arguments)
            }
            return memo
        }
    }

    // 创建一个函数，这个函数在被调用n及以上次的时候，执行func函数
    function after(n, func) {
        var memo
        return function() {
            if (--n < 1) {
                memo = func.call(this, ...arguments)
            }
            return memo
        }
    }

    // 创建一个最多有n个参数，忽略其它参数的func的函数
    function ary(func, n=func.length) {
        return function(...args) {
            return func.call(this, args.slice(0, n))
        }
    }

    // 并非是将函数实现绑定稀疏参数，而是将最终传入的参数在合适的位置插入实现，占位符
    function bind(func, thisArg, ...partials) {
        // 占位符为 _
        var placeholder = bind.placeholder
        var pendingFunc = function(...args) {
            if (!isFunction(func)) return new Error('Bind must be called by a function')
            var completeArgs = _processPlaceholder(partials, args, placeholder)
            return func.call(thisArg,...completeArgs)
        }
        return pendingFunc
    }
    // 防抖
    // 防抖分为两类情况：立即执行(leading)、延迟执行(trailing)
    // { 'leading': false, 'trailing':true }
    function debounce(func, wait=0, immediate=true) {
        let timeStamp, context, args
        const later = () => setTimeout(() => {
            timeStamp = null
            if(!immediate) {
                func.apply(context, args)
                context = args = null
            }
        },wait)
        return function(...params) {
            if(!timeStamp) {
                timeStamp = later()
                if(immediate) {
                    func.apply(this, params)
                } else {
                    context = this
                    args = params
                }
            } else {
                clearTimeout(timeStamp)
                timeStamp = later()
            }
        }
    }
    // 截流
    function throttle(func, wait=0, options={}) {
        var lastRunTime = 0
        return function (...args) {
            var now = Date.now()
            if(now - lastRunTime > wait) {
                func.apply(this,args)
                lastRunTime = now
            }
        }
    }
}()

__.bind.placeholder = window.__