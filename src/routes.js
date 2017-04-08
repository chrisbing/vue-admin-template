/**
 * routes of vue
 */

// common
import NotFound from './components/common/404.vue'
import CommonParent from './components/common/common-parent.vue'

// pages
import IndexComponent from './components/pages/index/index.vue'
import Profile1 from './components/pages/profile/profile1.vue'

export default [
    {
        path: '/',
        name: 'index',
        component: IndexComponent,
        title: '欢迎',
        breadcrumb: '欢迎'
    },
    {
        path: '/profile',
        breadcrumb: '配置',
        component: CommonParent,
        children: [
            {
                path: 'profile1',
                name: 'profile1',
                breadcrumb: '配置1',
                component: Profile1,
                title: '配置1 title',
                subtitle: 'subtitle'
            }
        ]
    }
].concat({
    path: '*',
    name: '404',
    component: NotFound
})