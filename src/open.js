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
        isEqualWith: 0,



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
    // 考虑循环引用
    function isEqual(value, other) {
        // Number相等
        if (value == other) {
            return true
        }
        // 考虑 NaN 的特殊情况
        if (isNaN(value) && isNaN(other)) {
            return true
        }
        // 数组
        if (isArray(value) && isArray(other)) {
            if (value.length != other.length) return false
            else {
                for (var i = 0; i < value.length; i++) {
                    if (!isEqual(value[i], other[i])) return false
                }
                return true
            }
        }
        // 对象比较，并且深层比较可枚举属性
        if (isObject(value) && isObject(other)) {
            /**
             * deepEqual
             * @param {Object} obj1 
             * @param {Object} obj2 
             * @param {Array} stack1 
             * @param {Array} stack2 
             * @return {boolean}
             */
            function deepEqual(obj1, obj2, stack1, stack2) {
                // 若两值为 object 类型，则继续判断其为何种具体类型
                var className = objectPrototypeToString(obj1)
                var classNameOther = objectPrototypeToString(obj2)
                if (className !== classNameOther) return false
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
                
                while (length--) {
                    if (stack1[length] === obj1) {
                        return stack2[length] === obj2
                    }
                }

                stack1.push(obj1)
                stack2.push(obj2)
                
                // 如果是数组
                if (className != '[object Array]') {
                    length = obj1.length
                    if (length !== obj2.length) return false

                    while (length--) {
                        if (!deepEqual(obj1[length], obj2[length], stack1, stack2)) return false
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
                        if (!(obj2.hasOwnProperty(key) && eq(obj1[key], obj2[key], stack1, stack2))) return false
                    }
                }
                stack1.pop()
                stack2.pop()
                return true
            }
            // 考虑循环引用
            var stk1 = []
            var stk2 = []
            return deepEqual(value, other, stk1, stk2)
        } else {
            return false
        }
    }


}()
