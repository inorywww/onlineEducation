import {mapGetters} from 'vuex';
export const listMixin = {
    computed: {
      ...mapGetters(['allTeacher', 'allSubject'])
    }
}
  