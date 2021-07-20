import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        // 公共数据
        allTeachers:[],
        // 前台相关数据
        headerStyle:{
            name:'header-black',
            logo:'/images/logo-green.png'
        },
        // 管理系统相关数据
        currentView:'index',  //当前tab
        isCollapse:false, //是否展开
        allTabs:[ //所有tab
            {
                name:"dashIndex",
                path:"/dashboard/index",
                title:"首页"
            }
        ]
    },
    mutations:{
        // 公共方法
        setTeachers(state,list){
            state.allTeachers = list;
        },
        // 前台方法
        setHeader(state,style){
            state.headerStyle = style;
        },

        // 管理系统方法
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
    getters:{
        allTeachers: state => state.allTeachers,
    },
    actions:{
        async getTeachers({commit}){
            const res = await Vue.prototype.$api.teacher.findAll();
            commit('setTeachers',res.data.data.items);
            return res.data.data.items;
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