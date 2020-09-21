<template>
    <div id='indexWrap'>
        <img src='../../assets/top_icon.png'/>
        <div clas='tipsWrap'>
            <div class='tips1'>ToPark</div>
            <div class='tips2'>Control in your hands</div>
        </div>
        <div class='tipsContent'>
            <div class="tipsRow">
                <div>What’s this about?</div>
                <div>
                    You have been granted a temporary access to a ToPark community.
                </div>
            </div>
            <div class="tipsRow">
                <div>Using ToPark is easy and free!</div>
                <div>
                    1. Complete registration
                    2. Click the “Quick Access” or download ToPark app.
                </div>
            </div>
            <div class="tipsRow">
                <div>
                    That’s it! ToPark makes access a breeze with your smartphone.
                </div>
            </div>
            <Button color="#50CEC3" @click='toLogin'>Self Registration</Button>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { Button } from 'vant';
import errorTips from '@/utils/registerErr.js'

export default {
    components:{
        Button
    },
    data(){
        return{
            
        }
    },
    mounted(){
        localStorage.clear()
    },
    methods:{
        ...mapActions(['handleLogin','getUserInfo']),
        toLogin () {
          this.$router.push('/login')
        },
        toRegister(){
            this.$router.push('/register')
        },
        toWeb(){
            window.open('http://27.17.34.226:28064/home')
            // window.open('https://kxr.ovc.org.cn')
        },
        toForget(){
            this.$router.push('/forgetPassword')
        },
        changePwd: function(){
            this.passShowEye = !this.passShowEye
        },
        onSubmit(){
            this.onVerifyLast().then(()=>{
                let params = {...this.params}
                this.onRequest(params)
            },err=>{
            })
        },
        onRequest(params){
            this.loading = true
            this.handleLogin(params).then( res=>{
                if(res.code !== -1){
                    let tokenStr = res.token_type+' '+ res.access_token
                    localStorage.setItem('DONGHU_TOKEN', tokenStr)
                    sessionStorage.setItem("DONGHU_TOKEN", tokenStr);
                    sessionStorage.setItem("REFRESH_TOKEN", res.refresh_token);
                    this.$router.push('/confirm')
                }else{
                }
                this.loading = false
            },res=>{
                this.loading = false
            })
        },
        onVerifyLast(){
            let flag = true
            let errorMsg = '请填写完整信息'
            let requireArr = [
                {key: 'username', msg: '请填写用户名'},
                {key: 'password', msg: '请填写密码'},
            ]
            return new Promise((resolve, reject)=>{
                requireArr.map(item=>{
                    if(!this.params[item.key]){
                        flag = false
                        errorMsg = item.msg
                    }
                })
                if(flag){
                    resolve()
                }else{
                    reject(errorMsg)
                }
            })
        },
        
    },
}
</script>

<style lang="less">
#indexWrap{
  display: flex;
  flex-direction: column;
}
</style>
