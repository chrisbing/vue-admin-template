/**
 * mock data
 */
/* eslint-disable no-console */

import {parseURL} from './parse-url'
import extend from 'extend'

// polyfill
console.error = console.error || console.log
console.warn = console.warn || console.log

export const LOG_DEBUG = 'debug'
export const LOG_INFO = 'info'
export const LOG_WARNING = 'warning'
export const LOG_ERROR = 'error'
let levels = [LOG_DEBUG, LOG_INFO, LOG_WARNING, LOG_ERROR]


const defaultOptions = {
    logLevel: LOG_INFO
}


export function Mock(routers, options) {
    options = extend({}, defaultOptions, options)
    options.logLevel = options.logLevel.toLowerCase().trim()
    if (levels.indexOf(options.logLevel) === -1) {
        console.error(`[MOCK ERROR] log level must be in ${levels}, but now is ${options.logLevel}`)
        return
    }
    function isEnable(level) {
        return levels.indexOf(options.logLevel) <= levels.indexOf(level)
    }

    isEnable(LOG_INFO) && console.log("[MOCK INFO] mock instance init...", routers, options)
    return function (request, callback) {
        let url = parseURL(request.url)
        let found = false
        for (let i = 0; i < routers.length; i++) {
            let route = routers[i]
            let match = false
            if (typeof route.path === 'function') {
                match = route.path(url.path)
            } else if (route.path.test) {
                match = route.path.test(url.path)
            } else {
                match = route.path === url.path
            }
            if (match) {
                let data = route.data || route.datas[request.method.toLowerCase()]
                if (typeof data === 'function') {
                    data = data(request)
                }
                if (typeof data.data === 'function') {
                    data.data = data.data(request)
                }
                isEnable(LOG_INFO) && console.log("[MOCK INFO] request: " + request.url, request, data)
                callback && callback(data)
                found = true
                break
            }
        }
        if (!found) {
            isEnable(LOG_WARNING) && console.warn("[MOCK WARNING] request: not found", request)
        }
    }
}



