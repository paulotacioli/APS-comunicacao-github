'use strict';

var usernamePage = document.querySelector('#username-page');
var usernamePageCreate = document.querySelector('#username-page-create');
var senhaInconpativel = document.querySelector('#senha-inconpativel');
var senhaInconpativelLogin = document.querySelector('#senha-inconpativel-login');
var usuarioNaoExisteLogin = document.querySelector('#usuario-nao-existe-login');
var senhaErroSintaxe = document.querySelector('#senha-erro-sintaxe');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var usernameFormCreate = document.querySelector('#usernameCreateForm');

var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
// var messageInputFile = document.querySelector('#message-file');

var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];
var nomeCadastro = null;
var password = null;
var passwordConfirm = null;
var nomeLogin = "";
var senhaLogin = "";
var arquivo = null;
var urlUpload = '';

function connect(event) {
    console.log("Entrou 1");
    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}
function mudarPaginaCadastro() {
    console.log("mudarPaginaCadastro")
    chatPage.classList.add('hidden');
    usernamePage.classList.add('hidden');
    usernamePageCreate.classList.remove('hidden');

}
function mudarPaginaParaLogin() {
    chatPage.classList.add('hidden');
    usernamePage.classList.remove('hidden');

}

function pegarUsuario(e) {
    console.log(e.target.value)
    nomeCadastro = e.target.value
}

function pegarUsuarioLogin(e) {
    console.log(e.target.value)
    nomeLogin = e.target.value
}

function pegarSenhaLogin(e) {
    console.log(e.target.value)
    senhaLogin = e.target.value
}
function pegarSenha(e) {
    console.log(e.target.value)
    password = e.target.value
}
function pegarArquivo(e) {
    console.log("eai!,",e.target.files[0])
    arquivo = e.target.files[0]
    uploadFiles()
}

function pegarSenhaConfirm(e) {
    console.log(e.target.value)
    passwordConfirm = e.target.value
}
//-----------------------------------------------------------------------

function cadastrarUsuario() {
    console.log("nome do usuario", nomeCadastro)
    console.log("senha:", password)
    console.log("SenhaConfirm:", passwordConfirm)

    if (password != passwordConfirm) {

        console.log("entrou no primeiro erro")

        senhaInconpativel.classList.remove('hidden');
        senhaErroSintaxe.classList.add('hidden');

    } else if (password.length <= 5) {

        console.log("entrou no segundo erro")

        senhaErroSintaxe.classList.remove('hidden');
        senhaInconpativel.classList.add('hidden');

    } else {

        var user = {
            "nome": nomeCadastro,
            "senha": password
        }
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "/usuario/cadastrar";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(user));

        console.log("DEPOiS DE ENVIARRRRRRRRRRRR")
        console.log("AQUI ESTA O QUE ESTA NO USER: ", user)
        senhaErroSintaxe.classList.add('hidden');
        senhaInconpativel.classList.add('hidden');

    }
}

function autenticarUsuario() {

    console.log("entrou aquiiiiikjolmlkmiii", nomeLogin, senhaLogin)
    var user = {
        "nome": nomeLogin,
        "senha": senhaLogin
    }
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "/usuario/authenticate";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(user));

    console.log("olaaaaaat", xmlhttp.responseText)
    xmlhttp.onload = function (e) {
        if (xmlhttp.response === "true") {
            console.log("entrou como true", xmlhttp.response)
            connect(true)
        } else {
            if (xmlhttp.response === "Usuario não existe!") {
                usuarioNaoExisteLogin.classList.remove('hidden');

            } else if (xmlhttp.response === "Senha invalida!") {
                senhaInconpativelLogin.classList.remove('hidden');

            }

            console.log("jajajaj", xmlhttp.response, xmlhttp.response === "true")
        }
    }
    console.log("IMPRIMINDO RESULTADO DA API", xmlhttp)
    console.log("AQUI ESTA O QUE ESTA NO USER: ", user)





}
//-------------------------------------------------------------------------

function onConnected() {
    console.log("Entrou 3");
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    )

    connectingElement.classList.add('hidden');
}


//     var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {};
// xhr.open('POST', '/usuario', user);
// xhr.send()




function onError(error) {
    console.log("Entrou 4");
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}



function uploadFiles() {

    console.log("arquivo0", arquivo)

    const storage1 = firebase.storage();
    console.log("sotrate", firebase)


    var data = new Date();
    var DataAtual = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}-${data.getHours()}_${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`;

    const uploadTask = storage1.ref(`ARQUIVO/D${DataAtual}`).put(arquivo);
    console.log("aqui ta neé")

    uploadTask.on('state_changed',
        snapshot => {
            
        }, (error) => {

            console.log("erro no upload")
        },
        () => {


            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                console.log('sucesos no upload', url)
                urlUpload = url;
            })

        })

}


function sendMessage(event) {
    console.log("Entrou 5");
    var messageContent = messageInput.value.trim();

    var caminhoArquivo = ''
    if (urlUpload != null || urlUpload != "") {
        //colocar o arquivo na pasta src\main\Arquivos
        console.log("urlUpload", urlUpload)
        caminhoArquivo = urlUpload;
  
    } else {
        console.log("urlUpload2", urlUpload)

        caminhoArquivo = '';

    }
    console.log("urlUpload3", urlUpload)

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            file: urlUpload,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived2(payload) {
    console.log("entrou no onMessageReceived 2")
}

function onMessageReceived(payload) {
    console.log("PAYLOAS", payload);
    var message = JSON.parse(payload.body);

console.log("URL RECEBIDA, ")
    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' entrou!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' saiu!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
    if (message.file != null ){

        //fazer aparecer um botao quando cair aqui e tiver arquivo
        var testStr = message.file

        var textElement = document.createElement('p');
        
        var messageText = document.createTextNode(testStr);
    
        textElement.appendChild(messageText);
    
        messageElement.appendChild(textElement);
    
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }else {
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content );

    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

    //MENSAGEM DE ARQUIVOOOOOOOOOOOOOOOOOOOO
 

    
}


function getAvatarColor(messageSender) {
    console.log("Entrou 7");
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}
// usernameForm.addEventListener('submit', autenticarUsuario, true)

document.getElementById('btn_cadastro').onclick = function () {
    mudarPaginaCadastro()
}


document.getElementById('btn_autenticar').onclick = function () {
    autenticarUsuario()
}
// usernameFormCadastre.addEventListener('submit', mudarPaginaCadastro, true)
// document.getElementById('enviar_arquivo').onclick = function () {
//     uploadFiles()
// }

document.getElementById('btn_create').onclick = function () {
    cadastrarUsuario()
}

document.getElementById('input_username_create').onchange = function (e) {
    pegarUsuario(e)
}

document.getElementById('name').onchange = function (e) {
    pegarUsuarioLogin(e)
}
document.getElementById('password').onchange = function (e) {
    pegarSenha(e)
}
document.getElementById('message-file').onchange = function (e) {
    pegarArquivo(e)
}

document.getElementById('password-login').onchange = function (e) {
    pegarSenhaLogin(e)
}

document.getElementById('password_confirm').onchange = function (e) {
    pegarSenhaConfirm(e)
}
messageForm.addEventListener('submit', sendMessage, true)