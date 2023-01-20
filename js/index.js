fetch("https://api.oiso.cf:2096/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data == `False`) { // !!!!!!!!!!!!!!
        document.getElementById("lbt").innerHTML = "未登录";
        mdui.snackbar("请登录");
    } else {
        namespace = '/Socket';
        var socket = io.connect("https://" + "api.oiso.cf" + ":" + "2096" + namespace, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        token: JSON.parse(data).cookie
                    }
                }
            }
        });
        // 初始化完成后,发送一条消息
        socket.emit("message",{"data":"hello lyshark"});
        // 收到数据后,执行输出
        socket.on('response', function(recv) {
            var data = recv.Data;
            window['shit']=recv;
            console.log(recv);
            console.log(data);
            // update chat_msg
            parse_benben(data.chat_msg);
            parse_music(data.song_msg);
            parse_spiderstatus(data.spider_status);
            parse_stream(data.stream_name);
        });

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
        // window['stream'] = false;
        // get_stream();
        // setInterval(function () { //每10秒刷新一次
        //     if (!window['stream']) {
        //         get_stream();
        //     }
        // }, 10000);
        // setInterval(function () { //每1秒刷新一次
        //     if (window['playDone'] == true) {
        //         get_music();
        //         // console.log("getmusic2");
        //         window['playDone'] = false;
        //     }
        // }, 1000);
        // setInterval(function () { //每5秒刷新一次
        //     if (window['music'] != "true") {
        //         get_music();
        //         window['playDone'] = false;
        //     }
        // }, 10000);
    }
}).catch(function () {
    // mdui.snackbar("服务器错误：" + data);
    document.getElementById("lbt").innerHTML = "未登录";
});

function parse_stream(data) {
    j = (data);
    var code = j.code;
    if (code == 200) {
        document.getElementById("stream_title").innerText = j.msg;
        setup_stream('https://api.oiso.cf:2083/live?port=1935&app=myapp&stream=' + j.name);
        window['stream'] = true;
    } else {
        document.getElementById("stream_title").innerText = j.msg;
        setup_stream2('https://www.oiso.cf/img/fishing.mp4');
    }
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
    // 接管暂停按钮
    // vElement.addEventListener('pause', function () {
    //     // 暂停视频
    //     flv_pause();
    // });
    // // 接管播放按钮
    // vElement.addEventListener('play', function () {
    //     // 播放视频
    //     flv_play();
    // });
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

function parse_benben(odata) {
    // console.log(odata);
    odata = (odata);
    var data = odata.msg;
    var onlineNum = odata.onlinenum;
    var onlinePeople = odata.online;
    document.getElementById("onlinenumber").innerHTML = `<i class="mdui-icon mdui-icon-left material-icons">people</i>` + "在线 " + String(onlineNum) + " 人";
    document.getElementById("show_number").innerText = "有 " + String(onlineNum) + " 人正在👋🐟";
    document.getElementById("show_people").innerHTML = "";
    for (var i = 0; i < onlineNum; i++) {
        document.getElementById("show_people").innerHTML += `<li class="mdui-list-item mdui-ripple">${onlinePeople[i].username}</li>`;
    }
    j = (data);
    // 按时间排序
    j.sort(function (a, b) {
        return b.time - a.time;
    });
    var tmptxt = '';
    for (i in j) {
        var msg = j[i];
        // 防止注入
        msg.user = msg.user.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        msg.msg = msg.msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        var hasLink = false;

        if ("tag" in msg) {
            msg.tag.content = msg.tag.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            msg.tag.content = msg.tag.content.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
            msg.tag.content = msg.tag.content.replace(/\*(.*?)\*/g, "<i>$1</i>");
            msg.tag.content = msg.tag.content.replace(/__(.*?)__/g, "<u>$1</u>");
            msg.tag.content = msg.tag.content.replace(/~~(.*?)~~/g, "<del>$1</del>");
            // 如果有超链接，记录为true
            if (/\[(.*?)\]\((.*?)\)/g.test(msg.tag.content)) {
                hasLink = true;
            }
            // msg.tag.content = msg.tag.content.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank'>$1</a>");
            // 超链接 但是要window.open 不要用a标签
            msg.tag.content = msg.tag.content.replace(/\[(.*?)\]\((.*?)\)/g, "<span onclick='window.open(\"$2\")'>$1</span>");
        }

        var originMsg = msg.msg
        // msg markdown 转为 html 用正则
        msg.msg = msg.msg.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        msg.msg = msg.msg.replace(/\*(.*?)\*/g, "<i>$1</i>");
        msg.msg = msg.msg.replace(/__(.*?)__/g, "<u>$1</u>");
        msg.msg = msg.msg.replace(/~~(.*?)~~/g, "<del>$1</del>");
        msg.msg = msg.msg.replace(/`(.*?)`/g, "<code>$1</code>");
        // 图片 限制宽度长度
        msg.msg = msg.msg.replace(/!\[(.*?)\]\((.*?)\)/g, "<img src='$2' alt='$1' style='max-width:100%;max-height:100%;' />");
        // 超链接
        msg.msg = msg.msg.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank'>$1</a>");
        // 添加 latex 支持
        msg.msg = msg.msg.replace(/\$\$(.*?)\$\$/g, "<img src='https://latex.codecogs.com/svg.latex?$1'>");
        msg.msg = msg.msg.replace(/\$(.*?)\$/g, "<img src='https://latex.codecogs.com/svg.latex?$1'>");
        // 引用
        msg.msg = msg.msg.replace(/&gt;(.*)/g, "<blockquote>$1</blockquote>");
        // 表情：如 :kk: 换成图片地址： https://xn--9zr.tk/kk
        // msg.msg = msg.msg.replace(/:(.*?):/g, "<img src='https://xn--9zr.tk/$1' alt='$1' style='max-width:100%;max-height:100%;' />");

        var timeChinese = new Date(msg.time * 1000).toLocaleString();
        timeChinese = timeChinese.substr(5);
        var lgurl = "https://www.luogu.com.cn/user/" + msg.uid;
        var iptag;
        if ("geo" in msg) {
            iptag = `<span class="tag" style="color: rgb(255, 255, 255); background: rgb(255, 0, 128);">` + msg.geo + `</span>`
        } else {
            iptag = ``
        }
        var tag;
        if ("tag" in msg) {
            tag = `<span class="tag" style="color: ` + msg.tag.fontcolor + `; background: ` + msg.tag.background + `">` + msg.tag.content + `</span>`
            // 如果 hasLink 为 true，那么设置tag鼠标的样式为pointer
            if (hasLink) {
                tag = `<span class="tag" style="color: ` + msg.tag.fontcolor + `; background: ` + msg.tag.background + `;cursor:pointer;" onclick="window.open('` + msg.tag.link + `')">` + msg.tag.content + `</span>`
            }
        } else {
            tag = ``
        }

        txt = `<div class="mdui-typo">
            <div class="am-comment-main">
                <header class="am-comment-hd">
                    <div class="am-comment-meta">
                        <!-- 头像 圆的 -->
                        <a href="` + lgurl + `" target="_blank" class="am-comment-author" style="display: inline-block;">
                            <img src="https://cdn.luogu.com.cn/upload/usericon/` + msg.uid + `.png" alt="" style="border-radius:100%; overflow:hidden;" class="am-comment-avatar" width="30" height="30">
                        </a>
                        <span class="feed-username">
                            <a href="`+ lgurl + `" target="_blank">@` + msg.user + `</a>
                        </span> 
                        `+ iptag + `
                        `+ tag + `
                        `+ timeChinese + `
                        <!-- 回复按钮 -->
                        <a href="javascript:void(0);" class="am-fr" onclick="replyto('@`+ msg.user + ` ：` + originMsg.replace('\n', '') + `')">回复</a>
                    </div>
                </header>
                <div class="am-comment-bd">
                    `+ msg.msg + `
                </div>
            </div>
        </div>`
        tmptxt += txt;
    }
    if(document.querySelector("#benben").innerHTML != tmptxt){
        document.querySelector("#benben").innerHTML = tmptxt;
    }
}

function parse_music(data) {
    // console.log(data);
    if (data == "false") {
        if (window['music'] != 'none') {
            try {
                document.getElementById("liveimg").remove();
            } catch (e) { }
            try {
                document.getElementById("live").remove();
            } catch (e) { }
            try {
                document.getElementById("livebot").remove();
            } catch (e) { }
            document.getElementById("media").innerHTML += `<iframe id="livebot" src="/musicPlayer/index.html"  width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>`;
            // document.getElementById("sub").innerText = "云听歌 - 暂无歌曲";
            document.getElementById("livebot").style.height = getWindowHeight() * 0.23 + "px";
            window['music'] = 'none';
        } else {
            window['music'] = "none";
            try {
                document.getElementById("liveimg").remove();
            } catch (e) { }
            try {
                document.getElementById("live").remove();
            } catch (e) { }
        }

    } else {
        j = (data);
        // console.log(j);
        window['musicUrls'] = [j['url'].replace("http://", "https://")];
        // window['musicUrls'] = ['/musicPlayer/music1.mp3'];
        window['artistNameData'] = [j['artist'] + "（@" + j['username'] + "）"];
        window['musicNameData'] = [j['title']];
        originimg = j['img'].replace("http://", "https://");
        // origin:https://p1.music.126.net/0eBConsur4ghIhTfNLU3MA==/109951167611318783.jpg
        // proxy:https://163pic.oiso.cf/0eBConsur4ghIhTfNLU3MA==/109951167611318783.jpg
        // proxyimg=originimg.replace("https://p1.music.126.net/","https://163pic.oiso.cf/");
        window['musicImgsData'] = [originimg];
        try {
            document.getElementById("liveimg").remove();
        } catch (e) { }
        try {
            document.getElementById("live").remove();
        } catch (e) { }
        try {
            document.getElementById("livebot").remove();
        } catch (e) { }
        window['music'] = 'true';
        setTimeout(function () {
            document.getElementById("media").innerHTML += `<iframe id="live" src="/musicPlayer/index.html"  width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>`;
            document.getElementById("live").style.height = getWindowHeight() * 0.23 + "px";
        }, 10);
    }
}

function parse_spiderstatus(data) {
        document.querySelector("#spider-status").innerHTML = data + `<div class="mdui-progress">
<div class="mdui-progress-indeterminate"></div>
</div>`;
}