/**
 * route for mock, white parse the directions to create route object.
 */

const context = require.context('./mock/', true, /\.js$/)

let routes = {}

context.keys().forEach(path => {
    let match = path.match(/\.(.*)\/(GET|POST)\.js$/)
    if (match) {
        let p = match[1]
        let method = match[2].toLowerCase()
        if (routes[p]) {
            routes[p].datas[method] = {
                data: context(path)
            }
        } else {
            routes[p] = {
                path: p,
                datas: {
                    [method]: {
                        data: context(path)
                    }
                }
            }
        }
    } else {
        let p = path.replace(/\.(.*)\.js/, '$1')
        routes[p] = {
            path: p,
            data: {
                data: context(path)
            }
        }
    }
})

module.exports = Object.keys(routes).map(k => routes[k])