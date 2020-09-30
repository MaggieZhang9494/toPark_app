import state from './state'
import DateTool from '@/utils/DateTool'
import { satisfies } from 'semver';

export default{
    ['TEST'](state,data){
        state.test = data
    },
    ['USER_PROFILE'](state, data){
        state.userProfile = data
    },
    ['COMMON_COUNTRY_SELECT'](state, data){
      state.contrySelect = data
    },
    ['UPDATE_USER_RESULT'](state, data){
      state.updateResult = data
    }
}

