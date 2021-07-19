import Vue from "vue"
import VueRouter from "vue-router";
import layoutHome from '@/layout/home/index';
import store from '../store';
Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/index',
        hidden: true,
        component:layoutHome,
        children: [{
                path: '/index',
                name: 'index',
                meta:{
                    title:'首页',
                },
                component: () => import('@/views/home/index/index'),
            },
            {
                path: '/login',
                name:'login',
                meta:{
                    title:'登录'
                },
                component: () => import('@/views/home/loginRegister/Index')
            },
            {
                path: '/register',
                name:'register',
                meta:{
                    title:'注册'
                },
                component: () => import('@/views/home/loginRegister/Index')
            },
          
        ]
    },
   
    // {
    //     path: '/dashboard',
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

// 路由发生变化修改页面title
router.beforeEach( (to, from, next) => {
    if (to.meta.title === '首页') {
        store.commit('setHeader',{name:'header-white',logo:'/images/logo.png'})
    }
    else{
        store.commit('setHeader',{name:'header-black',logo:'/images/logo-green.png'})
        document.title = `${to.meta.title} - 谷粒学苑 - Java培训|大数据培训|前端培训|HTML5培训|Linux运维培训_程序员一站式IT在线学习平台`;
    }
    next();
});
export default router;