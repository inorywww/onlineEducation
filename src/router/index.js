import Vue from "vue"
import VueRouter from "vue-router";
import layoutHome from '@/layout/home/index';
import layoutAdmin from '@/layout/admin/index';
import store from '../store';
import { alert } from "@/utils/index";
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
                component: () => import('@/views/home/loginRegister')
            },
            {
                path: '/register',
                name:'register',
                meta:{
                    title:'注册'
                },
                component: () => import('@/views/home/loginRegister')
            },
            {
                path: '/teacher',
                name:'allTeacher',
                meta:{
                    title:'全部讲师'
                },
                component: () => import('@/views/home/teacher')
            },
            {
                path: '/teacher/:id',
                name:'teacherDetail',
                meta:{
                    title:'讲师详情'
                },
                component: () => import('@/views/home/teacherDetail')
            },
            {
                path: '/course',
                name:'allCourse',
                meta:{
                    title:'全部课程'
                },
                component: () => import('@/views/home/course')
            },
            {
                path:'/course/:id',
                name:'courseDetail',
                meta:{
                    title: '课程详情'
                },
                component: () => import('@/views/home/courseDetail')
            },
            {
                path:'/search',
                name:'search',
                meta:{
                    title: '搜索'
                },
                component: () => import('@/views/home/search')
            },
            {
                path:'/search/:category/:keyword',
                name:'searchDetail',
                meta:{
                    title: '课程详情'
                },
                component: () => import('@/views/home/search')
            },
            {
                path:'/order/:id',
                name:'order',
                meta:{
                    title: '订单确认'
                },
                component: () => import('@/views/home/order')
            },
            {
                path:'/pay/:id',
                name:'pay',
                meta:{
                    title: '支付'
                },
                component: () => import('@/views/home/order/Pay')
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
                path:'banner',
                name:'banner',
                redirect: 'banner/list',
                meta:{
                    title:'轮播管理',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/banner'),
                children:[
                    {
                        path:'list',
                        name:'banner-list',
                        meta:{
                            title:'轮播列表',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/banner/All'),
                    },
                    {
                        path:'add',
                        name:'banner-add',
                        meta:{
                            title:'添加轮播',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/banner/Add'),
                    }
                ]
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
                path:'course',
                name:'course',
                redirect: 'course/list',
                meta:{
                    title:'课程管理',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/course'),
                children:[
                    {
                        path:'list',
                        name:'course-list',
                        meta:{
                            title:'课程列表',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/course/All'),
                    },
                    {
                        path:'add',
                        name:'course-add',
                        meta:{
                            title:'添加课程',
                            requireAuth:true,
                        },
                        component: () => import('@/views/admin/course/Add'),
                    },
                ]
            },
            {
                path:'subject',
                name:'subject',
                meta:{
                    title:'课程分类管理',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/subject'),
            },
            {
                path:'analyze',
                name:'analyze',
                meta:{
                    title:'数据统计',
                    requireAuth:true,
                },
                component: () => import('@/views/admin/analyze'),
            },
        ]
    },
    {
        path: '/404',
        name: '404 Not Found',
        component: () => import('@/views/404'),
        meta: { title: '你走丢了' },
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
   
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
router.beforeEach( async (to, from, next) => {
    if (!to.meta.requireAuth) {
        store.commit('setAdminIsLogin',false)
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
        // 判断有没有登录
        if(!store.state.adminIsLogin){
            alert('尚未授权！','error');
            next('/')
        }
    }
    if(to.name !== 'search' || to.name !== 'searchDetail'){
        store.commit('setSearchContent','')
    }
    // 判断是不是从支付界面跳转的，如果是，清除定时器
    if(from.name === 'pay'){
        await window.clearInterval(store.state.payTimer);
        store.commit('setPayTimer', null);
        store.commit('setIsLeavePay', store.state.payInfo.out_trade_no);
        store.commit('setPayInfo',{});
        if(to.name !== 'courseDetail'){
            alert('已取消支付！','warning');
        }
    }
    next();
});
export default router;