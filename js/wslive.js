// 主页的聊天室什么的 使用 socket.io 进行更新

var socket = io('https://api.oiso.cf:2096/');
// 获取 api.oiso.cf 的cookie
coo = document.cookie;
socket.io.opts.extraHeaders = {
    cookie: window['ident']
}
socket.connect();
socket.on('connect', function() {
    console.log('Connected!');
});
socket.on('disconnect', function() {
    console.log('Disconnected!');
});
socket.on('getmsg', function(data) {
    console.log(data);
});