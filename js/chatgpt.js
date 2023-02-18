fetch(window['api'] + "/profile", {
    credentials: 'include'
}).then(function (response) {
    return response.text();
}).then(function (data) {
    if (data != `False`) {
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
        socket.emit("connect");
        socket.emit("prompt", {
            prompt: "Hello, I am a chatbot. How are you today?"
        });
        socket.on('completion_stream', function (recv) {
            console.log(recv.Data);
        });
        socket.on('completion_done', function (recv) {
            console.log('completion_done');
        });
    }
});