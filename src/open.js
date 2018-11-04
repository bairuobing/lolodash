/**
 * lolodash
 */
window.__ = function () {
    return {
        head: head,
        noop: noop,
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
        isRegExp: isRegExp,
        isString: isString,
        isUndefined: isUndefined,
        isSymbol: isSymbol,


    }
    function objectPrototypeToString(value) {
        return Object.prototype.toString.call(value)
    }

    function head (array) {
        return array && array.length ? array[0] : undefined
    }

    function noop () {
        return undefined
    }

    function identity (value) {
        return value
    }

    function isArguments (value) {
        return objectPrototypeToString(value) == '[object Arguments]'
    }

    function isArray (value) {
        return Array.isArray(value)
    }

    function isArrayBuffer (value) {
        return objectPrototypeToString(value) == '[object ArrayBuffer]'
    }

    function isElement (value) {
        return objectPrototypeToString(value) == '[object HTMLCollection]'
    }

    function isBoolean (value) {
        return objectPrototypeToString(value) == '[object Boolean]'
    }

    function isDate (value) {
        return objectPrototypeToString(value) == '[object Date]'
    }

    function isNull (value) {
        return objectPrototypeToString(value) == '[object Null]'
    }
    // isNaN(undefined) == true But lodash is not
    function isNaN (value) {
        return  value != value && isNumber(value)
    }
    
    function isNumber (value) {
        return objectPrototypeToString(value) == '[object Number]'
    }

    function isFunction (value) {
        return objectPrototypeToString(value) == '[object Function]'
    }

    function isRegExp (value) {
        return objectPrototypeToString(value) == '[object RegExp]'
    }

    function isString (value) {
        return objectPrototypeToString(value) == '[object String]'
    }

    function isUndefined (value) {
        return objectPrototypeToString(value) == '[object Undefined]'
    }
    // 符号，不能带 new 创建
    function isSymbol (value) {
        return objectPrototypeToString(value) == '[object Symbol]'
    }

    
}()
