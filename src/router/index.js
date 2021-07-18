import Vue from "vue"
import VueRouter from "vue-router";
import layoutHome from '@/layout/home/index'
Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/index',
        hidden: true,
        component:layoutHome,
        children: [{
                path: '/index',
                name: 'index',
                component: () => import('@/views/home/index/index'),
            },
          
        ]
    },

    // {
    //     path: '/dashboard',
    // },
    // {
    //     path: '/login',
    // },
    // {
    //     path: '/404',
    // },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    // 跳转路由的时候返回到最顶端
    scrollBehavior(to, from, saveTop) {
        if (saveTop) {
            return saveTop;
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
});

export default router;