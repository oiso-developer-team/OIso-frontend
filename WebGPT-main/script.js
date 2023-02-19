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
      aiMessageText.innerText += marked(recv.Data);
      myPrompt += `${recv.Data}`;
    });
    socket.on('completion_done', function (recv) {
      console.log('completion_done');
      myPrompt += '\n';
    });
  }
});


const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.getElementById('chat-container');

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
var myPrompt = '你在OIso上解答信息学奥赛方面的问题。回答使用markdown格式，代码需标注语言。\n';

function sendMessage() {
  const userMessage = inputField.value;
  // Clear the input field
  inputField.value = '';

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
  aiMessageElement.innerHTML = `<span id="ai-avatar-name"><img src="images/openai-avatar.png"> <b>chatGPT</b></span>`;
  aiMessageText = document.createElement('p');
  aiMessageElement.appendChild(aiMessageText);
  chatContainer.appendChild(aiMessageElement);
}