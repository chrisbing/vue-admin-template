/**
 * Created by xujian1 on 21/03/2017.
 */

module.exports = function () {
    return {
        plugins: [
            require('postcss-cssnext')({
                browsers: '> 1%, IE >= 9, iOS >= 5, last 3 versions, Android >= 4.0, last 3 ExplorerMobile versions, last 3 UCAndroid versions, Firefox ESR, Opera 12.1'
            }),
        ]
    }
}