/**
 * Created by Chris on 2017/4/8.
 * routes info, like title, subtitle, breadcrumb of pages.
 */

import routes from '../../routes'
import _ from 'lodash'

let ROUTE_MAP
function parseRoute(routes = [], parent, pre = {}) {
    for (let route of routes) {
        route.parent = parent
        if (!route.name && !route.children) {
            console.warn('路由缺少name, 无法使用面包屑', route) // eslint-disable-line no-console
            continue
        }
        if (route.children) {
            parseRoute(route.children, route, pre)
        } else {
            if (pre[route.name]) {
                console.error('路由name命名冲突', route.name) // eslint-disable-line no-console
                continue
            }
            pre[route.name] = route
        }
    }
    return pre
}

export default {
    state: {
        route: {}
    },
    mutations: {
        setRoute(state, data){
            state.route = data
        }
    },
    actions: {
        setRoute({commit}, to){
            if (!ROUTE_MAP) {
                ROUTE_MAP = parseRoute(_.clone(routes))
            }
            let stack = to.matched
            let route = ROUTE_MAP[stack[stack.length - 1].name]
            if (!route) {
                commit('setRoute', {})
                return
            }
            let parent = route.parent
            let path = [route]
            while (parent) {
                path.unshift(parent)
                parent = parent.parent
            }
            commit('setRoute', {title: route.title, subtitle: route.subtitle, routeRaw: route, path})
        }
    },
    getters: {
        route: state => state.route
    }
}