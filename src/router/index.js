import Vue from "vue"
import VueRouter from "vue-router";
import layoutHome from '@/layout/home/index';
import layoutAdmin from '@/layout/admin/index';
import store from '../store';
Vue.use(VueRouter);

const routes = [
    {
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
    {
        path:'/adminLogin',
        name:'adminLogin',
        meta:{
            title:'管理员登录'
        },
        component: () => import('@/views/admin/adminLogin'),
    },
    {
        path:'/dashboard',
        name:'dashboard',
        redirect: '/dashboard/index',
        component: layoutAdmin,
        children:[
            {
                path:'index',
                name:'dashIndex',
                meta:{
                    title:'仪表盘',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/index'),
            },
            {
                path:'teacher',
                name:'teacher',
                redirect: 'teacher/list',
                meta:{
                    title:'讲师管理',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/teacher'),
                children:[
                    {
                        path:'list',
                        name:'teacher-list',
                        meta:{
                            title:'讲师列表',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/teacher/All'),
                    },
                    {
                        path:'add',
                        name:'teacher-add',
                        meta:{
                            title:'添加讲师',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/teacher/Add'),
                    }
                ]
            },
            {
                path:'subject',
                name:'subject',
                redirect: 'subject/list',
                meta:{
                    title:'课程分类管理',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/subject'),
                children:[
                    {
                        path:'list',
                        name:'subject-list',
                        meta:{
                            title:'课程分类列表',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/subject/All'),
                    },
                    {
                        path:'add',
                        name:'subject-add',
                        meta:{
                            title:'添加课程分类',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/subject/Add'),
                    },
                ]
            },
        ]
    },
   
   
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
    if (!to.meta.requireAuth) {
        store.commit('delAllTab');
        if (to.meta.title === '首页') {
            store.commit('setHeader',{name:'header-white',logo:'/images/logo.png'})
            document.title = `谷粒学苑 - Java培训|大数据培训|前端培训|HTML5培训|Linux运维培训_程序员一站式IT在线学习平台`;
        }
        else{
            store.commit('setHeader',{name:'header-black',logo:'/images/logo-green.png'})
            document.title = `${to.meta.title} - 谷粒学苑 - Java培训|大数据培训|前端培训|HTML5培训|Linux运维培训_程序员一站式IT在线学习平台`;
        }
    }
    else{
        document.title = to.meta.title;
    }
    
    next();
});
export default router;