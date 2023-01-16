// 主页的聊天室什么的 使用 socket.io 进行更新

var socket = io.connect('https://api.oiso.cf:2096/');
// 要带上cookie
socket.request.headers.cookie = document.cookie;
socket.on('connect', function() {
    console.log('Connected!');
});
socket.on('disconnect', function() {
    console.log('Disconnected!');
});
socket.on('getmsg', function(data) {
    console.log(data);
});