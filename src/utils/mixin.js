import { mapActions, mapGetters, mapMutations } from 'vuex';
export const listMixin = {
    computed: {
      ...mapGetters(['allTeachers','pageTeacher'])
    }
  }
  