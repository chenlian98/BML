let height = document.getElementById('data')
let weight = document.getElementById('data2')
let bml = document.getElementById('BMI') //bml --弹窗
let bmi_span = document.getElementById('bmi-span') //BMI的span
let table_arrow = document.getElementById('table_arrow') //表格箭头
let btn = document.querySelector('.content .form .wrap-button button'); //点击按钮
let x
let digit
let pop_up = document.querySelector('.pop-up'); //错误的时候的提示框
function  showPopUp(msg ,timeout = 1500) {
    pop_up.style.display = 'block'
    pop_up.innerHTML = msg
    setTimeout(function (){
        pop_up.style.display = 'none'
    },timeout)
}


function calc(){
        x = weight.value / (height.value ** 2) * 10000; /*公式（BMI）=体重（kg）÷身高/2（m）*/
        digit = x.toFixed(1) /*结果保留一个小数点*/ //digit-数字
        if(!height.value || !weight.value) {
         return  showPopUp('不能是空的',2000)
        }else if(isNaN(height.value) || isNaN(weight.value)) {
         return  showPopUp('不是数字',3000)
        }else {
                if (digit <= 18.4) {
                    bmi_span.innerText = '你的 BMI 值:' + digit + ',身体状态：偏瘦' + ' '
                    table_arrow.style.top = 36 + '%'
                } else if (digit >= 18.5 && digit <= 23.9) {
                    bmi_span.innerText = '你的 BMI 值:' + digit + ',身体状态：正常' + ' '
                    table_arrow.style.top = 52 + '%'
                } else if (digit >= 24.0 && digit <= 27.9) {
                    bmi_span.innerText = '你的 BMI 值:' + digit + ',身体状态：过重' + ' '
                    table_arrow.style.top = 71 + '%'
                } else if (digit >= 28) {
                    bmi_span.innerText = '你的 BMI 值:' + digit + ',身体状态：肥胖' + ' '
                    table_arrow.style.top = 86 + '%'
                }
                bml.style.display = 'block'
                table_arrow.style.display = 'block' //表格箭头

                // weight.value = ''
                // height.value = ''
            table() //表格
        }
}
btn.onclick = function () {
        calc() //计算
}
//键盘事件 --回车按钮
weight.addEventListener('keypress',function (event){
        if (event.keyCode === 13) {
            calc()
        }
 })
//获得本地时间 年月日时分秒
function down_timer(now = null) {
    let  nowTimer = new Date();
    let  y = nowTimer.getFullYear() //年
    let  m = nowTimer.getMonth()+1//月
    m = m< 10 ? `0${m}`: m
    let  d = nowTimer.getDate()//日
    d = d< 10 ? `0${d}`: d
    let  h = nowTimer.getHours()//时
    h = h< 10 ? `0${d}`: h
    let  minute = nowTimer.getMinutes()//分
    minute = minute< 10 ? `0${minute}`: minute
    let  sed = nowTimer.getSeconds()//秒
    sed = sed < 10 ? `0${sed}`:sed
    now = `${y}年${m}月${d}日${h}:${minute}:${sed}`
    return now
}down_timer()
setInterval(function (){
    return down_timer()
},1000)

let count = 0 //数字累加
function table() {
    // console.log(vacancy[0].h.value)
    let empty = document.querySelector('#empty')
    let record = document.querySelector('#record') //record记载
    record.style.display = 'none' //记录消失
    count++
    empty.innerHTML +=
        ` <table>
             <tr>
                 <td>${count}</td>
                 <td>${down_timer()}</td>
                 <td>${height.value}</td>
                 <td>${weight.value}</td>
                 <td>${digit}</td>
                 <td>
                    <a href="javascript:void(0)">删除</a>
                 </td>
             </tr>
         </table>`
//删除
    let del = document.querySelectorAll('footer .wrap-record .empty table tr td a')
    console.log(del)
    for (let i = 0; i < del.length; i++) {
        del[i].onclick = function () {
            //寻找它的父亲 table 此是this 指向 ===  del[i]
           // let tb = this.parentNode.parentNode.parentNode.parentNode
           // let tb = del[i].closest('table')
            let tb = this.closest('table')
            tb.remove()
        }
    }

}

