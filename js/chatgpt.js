window['api'] = "https://online.oiso.cf"

fetch(window['api'] + "/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data != `False`) {
        window['profile'] = JSON.parse(data);
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