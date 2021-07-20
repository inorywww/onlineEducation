<template>
    <div class="tabs">
        <el-tabs
            v-model="currentView"
            closable
            @tab-remove="removeTab"
            @tab-click="changeTab"
        >
            <el-tab-pane
                v-for="item in allTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            ></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "tabs",
    computed:{
        allTabs() {
            return this.$store.state.allTabs;
        },
        currentView: {
            get() {
                return this.$store.state.currentView;
            },
            set(newVal) {
                this.$store.commit("setCurrentView", newVal);
            },
        },
    },
    methods:{
        changeTab(target){
            if(this.$route.path !== this.allTabs[target.index].path){
                this.$router.replace(this.allTabs[target.index].path)
            }
        },
        removeTab(targetName){
            if(targetName === 'dashIndex'){
                return ;
            }
            let tabs = this.allTabs;
            let activeName = this.currentView;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            const pathItem = this.allTabs.find(item => item.name === nextTab.name)
                            this.$router.replace(pathItem.path);
                        }
                    }
                });
            }
            this.$store.commit("delTab", targetName);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>