import state from './state'
import DateTool from '@/utils/DateTool'
import { satisfies } from 'semver';

export default{
    ['TEST'](state,data){
        state.test = data
    },
    ['USER_PROFILE'](state, data){
        state.userProfile = data
    }
}

