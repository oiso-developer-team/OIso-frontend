// 主页的聊天室什么的 使用 websocket 进行更新
// 接口: /ws/live

var ws = new WebSocket("wss://api.oiso.cf:2096/ws/live");
ws.onmessage = function (event) {
    // 每 1 秒更新一次
    console.log("test");
    // {"spider_status":spider_status,"chat_msg":chat_msg,"song_msg":song_msg,"online_num":online_num,"online_list":online_list}
    // var data = JSON.parse(event.data);
    // // 更新在线人数
    // console.log(data.online_num);
    // // 更新在线列表
    // console.log(data.online_list);
    // // 更新聊天室
    // console.log(data.chat_msg);
    // // 更新歌曲列表
    // console.log(data.song_msg);
    // // 更新爬虫状态
    // console.log(data.spider_status);
}
ws.onopen = function (event) {
    console.log("连接成功");
}