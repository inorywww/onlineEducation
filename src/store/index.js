import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        navList:[
        {
            title:'首页',
            path:'/index'
        },
        {
            title:'全部课程',
            path:'/course/explore'
        },
        {
            title:'学习路线图',
            path:'',
            subs:[
                {
                    title:'Java开发',
                    path:'/path/java'
                },
                {
                    title:'大数据',
                    path:'/path/bigdata'
                },
                {
                    title:'前端开发',
                    path:'/path/front'
                },
                {
                    title:'Linux运维',
                    path:'/path/linux'
                },
                {
                    title:'Android',
                    path:'/path/android'
                }
            ]
        },
        {
            title:'名师面授班',
            path:'http://www.atguigu.com/'
        }
      ],
    },
    mutations:{
        setNavList(state,newList){
            state.navList = newList;
        }
    }
});

export default store