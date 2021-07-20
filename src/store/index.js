import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
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
        headerStyle:{
            name:'header-black',
            logo:'/images/logo-green.png'
        },
        currentView:'index',
        isCollapse:false,
        allTabs:[
            {
                name:"dashIndex",
                path:"/dashboard/index",
                title:"首页"
            }
        ]
    },
    mutations:{
        setNavList(state,newList){
            state.navList = newList;
        },
        setHeader(state,style){
            state.headerStyle = style;
        },
        setCurrentView(state,cv){
            state.currentView = cv;
        },
        setIsCollapse(state,val){
            state.isCollapse = val;
        },
        addTab(state,tab){
            const isHas = state.allTabs.find(item => {
                return item.name === tab.name 
            });
            if(!isHas){ // 不存在才加入
                state.allTabs.push(tab);
            }
        },
        delTab(state,name){
            state.allTabs = state.allTabs.filter(item => {
                return item.name !== name
            })
        }, 
    },
    plugins: [
        createPersistedState({
            reducer(val){
                return {
                  headerStyle: val.headerStyle,
                  allTabs: val.allTabs,
                }
              }
        })
      ]
});

export default store