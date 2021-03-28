let timer = null;
function interval(func,wait) {
    let interv = function(){
        func.call(null)
        timer = setTimeout(interv,wait)//循环设置setTimeout模拟setInterval
    }
    timer = setTimeout(interv,wait)

}
interval(function(){
    console.log("ok");
},1000)