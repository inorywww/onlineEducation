import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        // 公共数据
        allTeacher:[],
        allCareer:[], //所有头衔
        allSubject:[], //所有课程分类
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
        ],
        courseActive:0, //添加课程中当前进度
        addCourseInfo:{//添加课程 课程基本信息
            lessonNum: 1,
            price: 0,
        },
        showVideoPath:'', //播放视频
        tableData:[], //添加课程 添加大纲的表格信息,
        isSubmit: false,//添加课程的时候是否同时发布课程
        courseEditVisible:false, // 课程列表中编辑视频是否显示
        courseEditForm:{}, // 编辑课程信息
        chapterEditForm:[], // 编辑章节信息
        changeChapters:{
            editChapters:[],
            newChapters:[],
            delChapters:[],
        },
        changeVideos:{
            editVideos:[],
            newVideos:[],
            delVideos:[],
        },
        delChapters:[], // 存放删除了的章节
        delVideos:[], // 存放删除了的小节
        newVideos:[],// 新增加的小节
        editOriginData:{
            course:'',
            chapter:''
        }
    },
    mutations:{
        // 公共方法
        setTeachers(state,list){
            state.allTeacher = list;
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
        delAllTab(state){
            state.allTabs = [{
                    name:"dashIndex",
                    path:"/dashboard/index",
                    title:"首页"
                }
            ];
        },
        setCareers(state,careers){
            state.allCareer = careers;
        },
        setSubjects(state,subjects){
            state.allSubject = subjects;
        },
        setActive(state,val){
            state.courseActive = val;
        },
        setAddCourseInfo(state,info){
            state.addCourseInfo = info;
        },
        setTableData(state,data){
            state.tableData = data;
        },
        initAddInfo(state){
            state.addCourseInfo = {
                lessonNum: 1,
                price: 0,
            }
            state.tableData = [];
            state.courseActive = 0;
            state.showVideoPath = '';
            state.isSubmit = false;
        },
        setShowVideoPath(state,val){
            state.showVideoPath = val;
        },
        setIsSubmit(state,val){
            state.isSubmit = val;
        },
        setCourseEditVisible(state,val){
            state.courseEditVisible = val;
        },
        setEditCourseForm(state,form){
            state.courseEditForm = Object.assign({}, form);
        },
        setChapterCourseForm(state,form){
            state.chapterEditForm = form.concat();
        },
        initDelArr(state){
            state.changeChapters.editChapters = [];
            state.changeChapters.newChapters = [];
            state.changeChapters.delChapters = [];
            state.changeVideos.editVideos = [];
            state.changeVideos.newVideos = [];
            state.changeVideos.delVideos = [];
        }
    },
    getters:{
        allTeacher: state => state.allTeacher,
        allSubject: state => state.allSubject,
    },
    actions:{
        async getTeacher({commit}){
            const res = await Vue.prototype.$api.teacher.findAll();
            commit('setTeachers',res.data.data.items);
            return res.data.data.items;
        },
        async getCareer({commit}){
            const res = await Vue.prototype.$api.teacher.getAllCareer();
            const items = res.data.data.careers.map(item => item.career);
            commit('setCareers',items);
            return items;
        },
        async getSubject({commit}){
            const res = await Vue.prototype.$api.subject.getAllSubject();
            const items = JSON.parse(JSON.stringify(res.data.data.list).replace(/title/g,'label'));
            commit('setSubjects',items);
            return items;
        }
    },
    plugins: [
        createPersistedState({
            reducer(val){
                return {
                  headerStyle: val.headerStyle,
                  allTabs: val.allTabs,
                  allCareer:val.allCareer,
                  allSubject:val.allSubject,
                  allTeacher:val.allTeacher,
                }
              }
        })
    ]
});

export default store