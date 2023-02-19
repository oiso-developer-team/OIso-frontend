window['api'] = "https://online.oiso.cf"

fetch(window['api'] + "/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data != `False`) {
        window['profile'] = JSON.parse(data);
        var startmsg = document.getElementById("startmsg");
        // 早上、中午、下午、晚上？
        var now = new Date();
        var hour = now.getHours();
        if (hour < 6) {
            startmsg.innerHTML = "早上好，";
        } else if (hour < 9) {
            startmsg.innerHTML = "早上好，";
        } else if (hour < 12) {
            startmsg.innerHTML = "上午好，";
        } else if (hour < 14) {
            startmsg.innerHTML = "中午好，";
        } else if (hour < 17) {
            startmsg.innerHTML = "下午好，";
        } else if (hour < 19) {
            startmsg.innerHTML = "傍晚好，";
        } else if (hour < 22) {
            startmsg.innerHTML = "晚上好，";
        } else {
            startmsg.innerHTML = "夜里好，";
        }
        startmsg.innerHTML += window['profile']['name'] + "，有什么问题尽管问我！";
        namespace = '/chatgpt';
        var socket = io.connect(window['api'] + namespace, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        token: JSON.parse(data).cookie
                    }
                }
            }
        });
        socket.emit("verify");
        socket.emit("prompt", {
            prompt: "Hello, I am a chatbot. How are you today?",
            token: JSON.parse(data).cookie
        });
        socket.on('completion_stream', function (recv) {
            console.log(recv.Data);
        });
        socket.on('completion_done', function (recv) {
            console.log('completion_done');
        });
    }
});