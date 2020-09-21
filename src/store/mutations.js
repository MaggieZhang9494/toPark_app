import state from './state'
import DateTool from '@/utils/DateTool'
import { satisfies } from 'semver';

export default{
    ['TEST'](state,data){
        state.test = data
    },
    ['STATUS_HEIGHT'](state, height){
        state.barHeight = height
    },
    ['USER_DETAIL'](state, data){
        state.userInfo = data
    }
}

