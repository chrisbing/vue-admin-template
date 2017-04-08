/**
 * Created by xujian1 on 2016/12/10.
 */
export function parseURL(url) {
    let a = document.createElement('a')
    a.href = url
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            let ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue
                }
                s = seg[i].split('=')
                ret[s[0]] = s[1]
            }
            return ret
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [0, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [0, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    }
}