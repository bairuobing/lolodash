/**
 * lolodash
 */
window.__ = function () {
    return {
        objectPrototypeToString: objectPrototypeToString,
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




    }
    function objectPrototypeToString(value) {
        return Object.prototype.toString.call(value)
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
        return objectPrototypeToString(value) == '[object Arguments]'
    }

    function isArray(value) {
        return Array.isArray(value)
    }

    function isArrayBuffer(value) {
        return objectPrototypeToString(value) == '[object ArrayBuffer]'
    }

    function isElement(value) {
        return objectPrototypeToString(value) == '[object HTMLCollection]'
    }

    function isBoolean(value) {
        return objectPrototypeToString(value) == '[object Boolean]'
    }

    function isDate(value) {
        return objectPrototypeToString(value) == '[object Date]'
    }

    function isNull(value) {
        return objectPrototypeToString(value) == '[object Null]'
    }
    // isNaN(undefined) == true But lodash is not
    function isNaN(value) {
        return value != value && isNumber(value)
    }

    function isNumber(value) {
        return objectPrototypeToString(value) == '[object Number]'
    }

    function isFunction(value) {
        return objectPrototypeToString(value) == '[object Function]'
    }

    function isObject(value) {
        return (typeof value == 'object' || typeof value == 'function') && value != null
    }

    function isRegExp(value) {
        return objectPrototypeToString(value) == '[object RegExp]'
    }

    function isString(value) {
        return objectPrototypeToString(value) == '[object String]'
    }

    function isUndefined(value) {
        return objectPrototypeToString(value) == '[object Undefined]'
    }
    // 符号，不能带 new 创建
    function isSymbol(value) {
        return objectPrototypeToString(value) == '[object Symbol]'
    }

    function isArrayLike(value) {
        return !isFunction(value) && (isArray(value) || isElement(value) || isString(value))
    }

    function isArrayLikeObject(value) {
        return isArrayLike(value) && (typeof value == 'object')
    }

    function isEmpty(value) {
        return objectPrototypeToString(value) == '[object Null]'
    }

    function isMap(value) {
        return objectPrototypeToString(value) == '[object Map]'
    }

    function isSet(value) {
        return objectPrototypeToString(value) == '[object Set]'
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
            if(flag) {
                return true
            } else {
                return false
            }
        }
        if(flag) {
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

    function isEqualWith (value, other, customizer) {
        var stk1 = []
        var stk2 = []
        return deepEqual(value, other, stk1, stk2, customizer)
    }


}()
