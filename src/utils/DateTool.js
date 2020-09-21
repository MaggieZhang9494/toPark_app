export default {
    /**
     * 将日期格式转为时间戳
     * @param {日期} date
     */
    getTimesTamp: function(date){
        let timesTamp = new Date(date).getTime();
        // 转为Unix时间戳，十位数时间戳
        timesTamp = timesTamp/1000;
        return Math.round(timesTamp);
    },
    /**
     * 获取当天起始时间戳
     * @param {当天时间} currentDay
     */
    getDayTimes: function(currentDay){
        let Y = currentDay.getFullYear();
        let M = currentDay.getMonth()+1;
        let D = currentDay.getDate();
        let startTimes = Y+'-'+M+'-'+D+' '+ '00:00:00';
        let endTimes = Y+'-'+M+'-'+D+' '+ '23:59:59';
        startTimes = new Date(startTimes).getTime();
        // startTimes = getTs(startTimes);
        endTimes = new Date(endTimes).getTime();
        // endTimes = getTs(endTimes);
        startTimes = Math.round(startTimes/1000);
        endTimes = Math.round(endTimes/1000);
        return {
            startTimes: startTimes,
            endTimes: endTimes
        }
    },
    /**
     * 将时间戳转为日期格式
     */
    getDate: function(timesTamp =  new Date().getTime(),type='YYYY-MM-DD h:m:s'){
        // 当前为十位时间戳，需乘以1000
        let date = new Date(timesTamp*1000);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        M > 9?M = M : M = '0'+M
        let D = date.getDate();
        D > 9?D = D : D = '0'+D
        let h = date.getHours();
        h > 9?h = h : h = '0'+h
        let m = date.getMinutes();
        m > 9?m = m : m = '0'+m
        let s = date.getSeconds();
        s > 9?s = s : s = '0'+s
        if(type === 'YYYYMMDD'){
            return Y+''+M+''+D
        }
        if(type === 'YYYYMM'){
            return Y+''+M
        }
        if(type === 'YYYY-MM-DD'){
            return Y+'-'+M+'-'+D
        }
        if(type === 'YYYY-MM-DD HH:mm'){
            return Y+'-'+M+'-'+D+' '+h+':'+m
        }
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    /**
     * 今天星期几
     */
    getWeek: function(){
        return '星期'+'日一二三四五六'.charAt(new Date().getDay())
    },
    /**
     * 获取当前月份总天数
     * @param {年份} year
     * @param {*月份} month
     */
    getMonthDays: function(year,month){
        return new Date(year,month,0).getDate()
    },
    /**
     * 获取当月起始时间戳
     */
    getMonthTamp: function(time){
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = new Date(year,month,0);
        let lastdate = year + '-' + month + '-' + day.getDate();
        // console.log(lastdate)
        let startTimes = year+'-'+month+'-'+'01'+' '+ '00:00:00';
        let endTimes = lastdate+' '+ '23:59:59';
        startTimes = new Date(startTimes).getTime();
        // startTimes = getTs(startTimes);
        endTimes = new Date(endTimes).getTime();
        // endTimes = getTs(endTimes);
        startTimes = startTimes/1000;
        endTimes = endTimes/1000;
        return {
            monthStart: startTimes,
            monthEnd: endTimes
        }
    },
    /**
     * 某个时间点的前一段时间
     */
    getBeforeMoment(targetTime,beforeTime){
        let date = new Date(targetTime*1000);
        if(beforeTime.type === 'm'){
            date.setMinutes(date.getMinutes() - beforeTime.value);
        }
        if(beforeTime.type === 'h'){
            date.setHours(date.getHours() - beforeTime.value);
        }
        if(beforeTime.type === 'd'){
            date.setDate(date.getDate() - beforeTime.value);
        }
        return date.getTime()/1000
    },
    /**
     * 某个时间点的后一段时间
     */
    getAfterDate(targetTime,afterTime){
        let date = new Date(targetTime);
        if(afterTime.type === 'm'){
            date.setMinutes(date.getMinutes() + afterTime.value);
        }
        if(afterTime.type === 'h'){
            date.setHours(date.getHours() + afterTime.value);
        }
        if(afterTime.type === 'd'){
            date.setDate(date.getDate() + afterTime.value);
        }
        return date
    },
    /**
     * 今天零点的时间戳
     */
    todayStartTime(){
        let ymd = dateFormat(new Date(),'YYYY-MM-DD')
        let tampsTime = new Date(ymd+' '+'00:'+'00:'+'00').getTime()/1000
        // let tampsTime = getTs(ymd+' '+'00:'+'00:'+'00')/1000
        return tampsTime
    },
}


// ios 时间转时间戳
// 兼容所有浏览器
// ios 使用 new Date("2010-03-15 10:30:00").getTime() 获取时间戳报错
// @time "2010-03-15 10:30:00"
function getTs(time){
    let arr = time.split(/[- :]/),
    _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]),
    timeStr = Date.parse(_date)
    return timeStr
}
