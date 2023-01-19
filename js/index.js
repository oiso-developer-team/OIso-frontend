fetch("https://api.oiso.cf:2096/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data == `False`) { // !!!!!!!!!!!!!!
        document.getElementById("lbt").innerHTML = "未登录";
        mdui.snackbar("请登录");
    } else {
        // window['ident'] = JSON.parse(data).cookie;
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
        document.getElementById("updown").removeAttribute("hidden");
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
        window['stream'] = false;
        get_stream();
        setInterval(function () { //每10秒刷新一次
            if (!window['stream']) {
                get_stream();
            }
        }, 10000);
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

function get_stream() {
    // url = https://api.oiso.cf:2096/getstream
    fetch("https://api.oiso.cf:2096/getstream", {
        credentials: 'include'
    }).then(function (response) {
        return response.text();
    }).then(function (data) {
        j = JSON.parse(data);
        var code = j.code;
        if (code == 200) {
            document.getElementById("stream_title").innerText = j.msg;
            setup_stream('https://api.oiso.cf:2083/live?port=1935&app=myapp&stream=' + j.name);
            window['stream'] = true;
        } else {
            document.getElementById("stream_title").innerText = j.msg;
            setup_stream2('https://www.oiso.cf/img/fishing.mp4');
        }
    }).catch(function () {
        // mdui.snackbar("服务器错误：" + data);
        document.getElementById("stream_title").innerHTML = "获取直播失败";
        setup_stream2('https://www.oiso.cf/img/fishing.mp4');
    });
}

// 等待页面渲染完成
window.onload = function () {
    var vElement = document.getElementById('videoElement');
    var width = document.getElementById('mediadiv').offsetWidth;
    console.log(width);
    vElement.style.height = '333px';
};

function setup_stream2(stream_url) {
    var vElement = document.getElementById('videoElement');
    // 等待视频加载完成
    vElement.addEventListener('loadedmetadata', function () {
        // 获取mediadiv的宽度
        var width = document.getElementById('mediadiv').offsetWidth;
        // 获取视频长宽比
        var videoRatio = vElement.videoWidth / vElement.videoHeight;
        // 高度为mediadiv的宽度按视频长宽比计算
        vElement.style.height = width / videoRatio + 'px';
    });
    // 当窗口大小发生改变
    window.onresize = function () {
        // 获取mediadiv的宽度
        var width = document.getElementById('mediadiv').offsetWidth;
        // 获取视频长宽比
        var videoRatio = vElement.videoWidth / vElement.videoHeight;
        // 高度为mediadiv的宽度按视频长宽比计算
        vElement.style.height = width / videoRatio + 'px';
    };
    // 设置视频地址
    vElement.src = stream_url;
    // 设置视频自动播放
    vElement.autoplay = true;
}

function setup_stream(stream_url) {
    var vElement = document.getElementById('videoElement');
    // 等待视频加载完成
    vElement.addEventListener('loadedmetadata', function () {
        // 获取mediadiv的宽度
        var width = document.getElementById('mediadiv').offsetWidth;
        // 获取视频长宽比
        var videoRatio = vElement.videoWidth / vElement.videoHeight;
        // 高度为mediadiv的宽度按视频长宽比计算
        vElement.style.height = width / videoRatio + 'px';
    });
    // 当窗口大小发生改变
    window.onresize = function () {
        // 获取mediadiv的宽度
        var width = document.getElementById('mediadiv').offsetWidth;
        // 获取视频长宽比
        var videoRatio = vElement.videoWidth / vElement.videoHeight;
        // 高度为mediadiv的宽度按视频长宽比计算
        vElement.style.height = width / videoRatio + 'px';
    };
    if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            enableWorker: true,     //浏览器端开启flv.js的worker,多进程运行flv.js
            isLive: true,           //直播模式
            hasAudio: true,        //关闭音频             
            hasVideo: true,
            stashInitialSize: 128,
            enableStashBuffer: false, //播放flv时，设置是否启用播放缓存，只在直播起作用。
            url: stream_url
        });
        flvPlayer.attachMediaElement(vElement)
        flvPlayer.load() //加载
    }
    setInterval(function () {
        vElement.playbackRate = 1
        console.log("时延校正判断");
        if (!vElement.buffered.length) {
            return
        }
        var end = vElement.buffered.end(0)
        var diff = end - vElement.currentTime
        console.log(diff)
        if (5 <= diff && diff <= 60) {
            console.log("二倍速")
            vElement.playbackRate = 2
        }
        if (diff > 60) {
            console.log("跳帧")
            vElement.currentTime = end
        }
    }, 2500)
    function flv_start() {
        flvPlayer.play()
    }
    function flv_pause() {
        flvPlayer.pause()
    }
    function flv_destroy() {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
    }
    function flv_seekto() {
        player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value)
    }
    vElement.autoplay = true;
    vElement.addEventListener('canplay', function () {
        var promise = vElement.play();
        if (promise !== undefined) {
            promise.catch(error => {
                // 无法自动播放，设置静音
                vElement.muted = true;
                vElement.play();
                mdui.snackbar({
                    message: '由于浏览器政策，直播已静音，请手动打开',
                    position: 'bottom'
                });
            }).then(() => {
                // Auto-play started
            });
        }
    })
}