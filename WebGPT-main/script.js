window['api'] = "https://online.oiso.cf"
var socket;

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
    socket = io.connect(window['api'] + namespace, {
      transportOptions: {
        polling: {
          extraHeaders: {
            token: JSON.parse(data).cookie
          }
        }
      }
    });
    socket.emit("verify");
    socket.on('completion_stream', function (recv) {
      console.log(recv.Data);
      if(aiMessageText.innerHTML == `<div class="loadingThree"><span></span><span></span><span></span><span></span><span></span></div>`){
        aiMessageText.innerHTML = '';
        temp = '';
      }
      temp += (recv.Data);
      aiMessageText.innerHTML = (temp);
      myPrompt += `${recv.Data}`;
    });
    socket.on('completion_done', function (recv) {
      console.log('completion_done');
      aiMessageText.innerHTML = (temp);
      myPrompt += '\n';
      enableInput();
    });
  }else{
    mdui.snackbar({
      message: '由于 AI 服务本身需要一定成本，该功能需 OIso Plus 及以上计划方可使用。请您谅解！'
    });
  }
});

var temp = '';
const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.getElementById('chat-container');

function disableInput() {
  inputField.disabled = true;
  inputField.placeholder = 'AI 正在思考...';
  sendButton.disabled = true;
}

function enableInput() {
  inputField.disabled = false;
  inputField.placeholder = '开始聊天吧（不超过 300 字）！';
  sendButton.disabled = false;
}

// Send user's message to the API when the send button is clicked
sendButton.addEventListener('click', sendMessage);

// Send user's message to the API when the enter key is pressed
inputField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

var aiMessageElement;
var aiMessageText;
var myPrompt = '你在OIso上解答信息学奥赛方面的问题。回答可用html格式的加粗、超链接、下划线、倾斜、删除线、pre代码块、code内联代码、换行及LateX公式。\n';

function sendMessage() {
  const userMessage = inputField.value;
  // Clear the input field
  inputField.value = '';
  disableInput();

  // Display the user's message in the chat container
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user-message');
  userMessageElement.innerHTML = `<span><img src="https://cdn.luogu.com.cn/upload/usericon/${String(window['profile']['uid'])}.png"> <b>${window['profile']['name']}</b></span>`;

  const userMessageText = document.createElement('p');
  userMessageText.innerText = userMessage;
  userMessageElement.appendChild(userMessageText);
  chatContainer.appendChild(userMessageElement);

  myPrompt += `用户: ${userMessage}\nAI: `;
  socket.emit("prompt", {
    prompt: myPrompt,
    token: window['profile']['cookie']
  });

  // Display the AI's response in the chat container
  aiMessageElement = document.createElement('div');
  aiMessageElement.classList.add('message', 'ai-message');
  aiMessageElement.innerHTML = `<span id="ai-avatar-name"><img src="images/openai-avatar.png"> <b>ChatGPT</b></span>`;
  aiMessageText = document.createElement('p');
  aiMessageText.innerHTML = `<div class="loadingThree"><span></span><span></span><span></span><span></span><span></span></div>`;
  aiMessageElement.appendChild(aiMessageText);
  chatContainer.appendChild(aiMessageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}