// 主页的聊天室什么的 使用 socket.io 进行更新

fetch("https://api.oiso.cf:2096/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data == `False`) { // !!!!!!!!!!!!!!
        document.getElementById("lbt").innerHTML = "未登录";
        mdui.snackbar("请登录");
    } else {
        window['ident'] = JSON.parse(data).cookie;
        // const socket = io('https://192.168.0.10:2096', {
        //     transportOptions: {
        //         polling: {
        //             extraHeaders: {
        //                 token: window['ident']
        //             }
        //         }
        //     }
        // });
        // socket.connect();
        // socket.on('connect', function () {
        //     console.log('Connected!');
        // });
        // socket.on('disconnect', function () {
        //     console.log('Disconnected!');
        // });
        // socket.on('getmsg', function (data) {
        //     console.log(data);
        // });

        try {
            var fa = document.getElementById("lbt").parentNode;
            fa.appendChild(parseElement(`<a id="lbt" mdui-dialog="{target: '#dialog-logout'}" onclick="" href="javascript:void 0"><b class="name">${JSON.parse(data).name}</b><img src="https://cdn.luogu.com.cn/upload/usericon/${JSON.parse(data).uid}.png" alt="${JSON.parse(data).name}" class="avatar"></a>`))
            document.getElementById("lbt").remove();
        } catch {
            document.getElementById("lbt").innerHTML = "登出";
        }
        document.getElementById("lbt").setAttribute("mdui-dialog", "{target: '#dialog-logout'}");
        document.getElementById("lbt").setAttribute("onclick", "");
        document.getElementById("happy").removeAttribute("hidden");
        get_benben();
        get_music();
        setInterval(function () { //每10秒刷新一次
            get_benben();
        }, 10000);
        setInterval(function () { //每1秒刷新一次
            if (window['playDone'] == true) {
                get_music();
                // console.log("getmusic2");
                window['playDone'] = false;
            }
        }, 1000);
        setInterval(function () { //每5秒刷新一次
            if (window['music'] != "true") {
                get_music();
                window['playDone'] = false;
            }
        }, 10000);
    }
}).catch(function () {
    // mdui.snackbar("服务器错误：" + data);
    document.getElementById("lbt").innerHTML = "未登录";
});