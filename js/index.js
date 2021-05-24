let height = $('#data')
let weight = $('#data2')
let bmi_span = $('#bmi-span') //BMI的span
let table_arrow = $('#table_arrow') //表格箭头
let btn = $('.content .form .wrap-button button'); //点击按钮
let bml = $('#BMI') //bml --弹窗

function  showPopUp(msg ,timeout = 1500) {
    let div = document.createElement('div')
    div.classList.add('pop-up')
    document.body.append(div)
    let pop_up = $('.pop-up'); //错误的时候的提示框
    pop_up.style.display = 'block'
    pop_up.innerHTML = msg
    setTimeout(function (){
        pop_up.style.display = 'none'
    },timeout)
}
// 进行计算的方法
function calc(){
        //结果保留一个小数点
        result = (weight.value / (height.value ** 2) * 10000).toFixed(1); /*公式（BMI）=体重（kg）÷身高/2（m）*/
        function valuee(num,scope) {
            bmi_span.innerText = '你的 BMI 值:' + result + ',身体状态：'+ scope + ' '
            table_arrow.style.top = num + '%'
        }
        valuee(36,'偏瘦')
        if(!height.value || !weight.value) {
         return  showPopUp('不能是空的',2000)
        }else if(isNaN(height.value) || isNaN(weight.value)) {
         return  showPopUp('不是数字',2500)
        }else {
                if (result <= 18.4) {
                    valuee(36,'偏瘦')
                } else if (result >= 18.5 && result <= 23.9) {
                    valuee(52,'正常')
                } else if (result >= 24.0 && result <= 27.9) {
                    valuee(71,'过重')
                } else if (result >= 28) {
                    valuee(86,'肥胖')
                }
                bml.style.display = 'block'
                table_arrow.style.display = 'block' //表格箭头
            table() //表格
        }
}
//点击按钮执行的事件
btn.onclick = calc
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
    h = h< 10 ? `0${h}`: h
    let  minute = nowTimer.getMinutes()//分
    minute = minute< 10 ? `0${minute}`: minute
    let  sed = nowTimer.getSeconds()//秒
    sed = sed < 10 ? `0${sed}`:sed
    now = `${y}年${m}月${d}日${h}:${minute}:${sed}`
    return now
}
setInterval(function (){
   // console.log(down_timer())
},1000)

let count = 0 //数字累加
function table() {
    // console.log(vacancy[0].h.value)
    let empty = document.querySelector('#empty')
    let record = document.querySelector('#record') //record记载
    record.style.display = 'none' //记录消失
    count++
    //存储我的数据 增加一个数组
    let data = [ count, down_timer(), height.value, weight.value, result,''] //最后一个数据给为空的
    // 第二种办法 插入html
    let tableS = document.createElement('table');
    empty.append(tableS)
    let tr = document.createElement('tr');
    tableS.append(tr)
    for (let i = 0; i < data.length; i++) {
                let td = document.createElement('td');
                tr.append(td)
                td.innerHTML = data[i]
    }
    let a = document.createElement('a')
    let tdss = tr.children //找到tr的最后一个td
    tdss[5].append(a)  //插入a标签
    a.setAttribute('href',"javascript:void(0)")
    a.innerHTML = '删除'

    //删除
    let del = document.querySelectorAll('footer .wrap-record .empty table tr td a')
    for (let i = 0; i < del.length; i++) {
        del[i].onclick = function () {
            //寻找它的父亲 table 此是this 指向 ===  del[i]
           // let tb = this.parentNode.parentNode.parentNode.parentNode
           // let tb = del[i].closest('table')
            let chuli = confirm('请问是否要删除呢?')
            if (chuli) {
                let tb = this.closest('table')
                tb.remove()
            }

        }
    }
}




//第一种办法 拼接html
// empty.innerHTML +=
//     ` <table>
//          <tr>
//              <td>${count}</td>
//              <td>${down_timer()}</td>
//              <td>${height.value}</td>
//              <td>${weight.value}</td>
//              <td>${result}</td>
//              <td>
//                 <a href="javascript:void(0)">删除</a>
//              </td>
//          </tr>
//      </table>`