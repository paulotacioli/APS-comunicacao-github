'use strict';

var usernamePage = document.querySelector('#username-page');
var usernamePageCreate = document.querySelector('#username-page-create');
var usernamePageEdit = document.querySelector('#username-page-edit');
var senhaInconpativelEdit = document.querySelector('#senha-inconpativel-edit');
var senhaInconpativelLoginEdit = document.querySelector('#senha-inconpativel-login-edit');
var senhaInconpativel = document.querySelector('#senha-inconpativel');
var senhaInconpativelLogin = document.querySelector('#senha-inconpativel-login');
var usuarioNaoExisteLogin = document.querySelector('#usuario-nao-existe-login');
var senhaErroSintaxe = document.querySelector('#senha-erro-sintaxe');
var senhaErroSintaxeEdit = document.querySelector('#senha-erro-sintaxe-edit');
var mensagemSucesso = document.querySelector('#mensagem-sucesso');
var mensagemSucessoEdit = document.querySelector('#mensagem-sucesso-edit');
var erroBackendEdit = document.querySelector('#erro-backend-edit');
var erroBackend = document.querySelector('#erro-backend');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var inputUsernameEdit = document.querySelector("#input_username_edit")
var usernameFormCreate = document.querySelector('#usernameCreateForm');
var messageFile = document.querySelector('#message-file');
var botaoEnviarMensagem = document.querySelector('#botao_enviar_mensagem');
var carregando = document.querySelector('#carregando');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var adicionarAnexoDisplay = document.querySelector('#adicionar_anexo');
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
var usuarioLogado = '';
var senhaEdit = '';
var senhaConfirEdit = '';

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
function adicionarAnexo() {
    console.log("adicionar anexo")
    messageFile.classList.remove('hidden');
    adicionarAnexoDisplay.classList.add('hidden')


}

function abrirPaginaCadastro() {
    // stompClient.subscribe('/topic/public', onMessageReceived);
    chatPage.classList.add('hidden');
    usernamePageEdit.classList.remove('hidden');
    document.getElementById('input_username_edit').value = usuarioLogado;
}
function mudarPaginaParaLogin() {
    chatPage.classList.add('hidden');
    usernamePage.classList.remove('hidden');

}
function mudarPaginaChat() {
    chatPage.classList.remove('hidden');
    usernamePageEdit.classList.add('hidden');

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
    console.log("eai!,", e.target.files[0])
    arquivo = e.target.files[0]
    uploadFiles()
}
function limparVariavelArquivo() {
    arquivo = null;
    urlUpload = '';
    document.getElementById('message-file').value = "";
    messageFile.classList.add('hidden');
    adicionarAnexoDisplay.classList.remove('hidden')


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
        xmlhttp.onload = function () {
            console.log('DONE', xmlhttp.status); // readyState will be 4
            if (xmlhttp.status == 200) {
                mensagemSucesso.classList.remove('hidden');

            } else {
                erroBackend.classList.remove('hidden');

            }
        };
    }
}



function editarUsuario() {
    console.log("nome do usuario", nomeCadastro)
    console.log("senha:", senhaEdit)
    console.log("SenhaConfirm:", senhaConfirEdit)

    if (senhaEdit != senhaConfirEdit) {

        console.log("entrou no primeiro erro1111")

        senhaInconpativelEdit.classList.remove('hidden');
        senhaErroSintaxeEdit.classList.add('hidden');

    } else if (senhaEdit.length <= 5) {

        console.log("entrou no segundo erro111")

        senhaErroSintaxeEdit.classList.remove('hidden');
        senhaInconpativelEdit.classList.add('hidden');

    } else {

        var user = {
            "nome": nomeCadastro,
            "senha": senhaEdit
        }
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "/usuario/editar";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(user));

        console.log("DEPOiS DE ENVIARRRRRRRRRRRR")
        console.log("AQUI ESTA O QUE ESTA NO status: ", xmlhttp.status)
        xmlhttp.onload = function () {
            console.log('DONE', xmlhttp.status); // readyState will be 4
            if (xmlhttp.status == 200) {
                mensagemSucessoEdit.classList.remove('hidden');

            } else {
                erroBackendEdit.classList.remove('hidden');

            }
        };
        senhaErroSintaxeEdit.classList.add('hidden');
        senhaInconpativelEdit.classList.add('hidden');

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
    carregarHistorico()
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
    botaoEnviarMensagem.classList.add('hidden')
    carregando.classList.remove('hidden')

    const storage1 = firebase.storage();


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
                botaoEnviarMensagem.classList.remove('hidden')
                carregando.classList.add('hidden')

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
    limparVariavelArquivo()
    event.preventDefault();
}


function onMessageReceived(payload) {

    console.log("PAYLOAS", payload);
    var message = JSON.parse(payload.body);
    usuarioLogado = message.sender;


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
    //MENSAGEM DE TEXTO
    console.log("antes em message.content", message.content)

    if (message.content != null) {
        console.log("entoru em message.content", message.content)
        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);

        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    //MENSAGEM DE ARQUIVO
    if (message.file != null  && message.file != '') {
        
        var testStr = message.file
        var str = testStr;
        var result = str.split('chat-demo\\')[1]
        var textElement = document.createElement('p');
        console.log("result", result)

        textElement.innerHTML = '<a target="_blank" href="' + message.file + '"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16"><path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/><path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/></svg></a>';
        var messageText = document.createTextNode(" ");
        textElement.appendChild(messageText);
        messageElement.appendChild(textElement);
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }





}

function carregarHistorico() {
    console.log("entrou no carregar histórico")
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "/chat/listar";
    var objListaMensagens = [];
    var tamanho = 0;
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();

    console.log("PEGANDO O HISTÓRICO", xmlhttp.responseText)
    xmlhttp.onload = function (e) {

        objListaMensagens = xmlhttp.response;

        tamanho = JSON.parse(objListaMensagens).length;
        var objeto = JSON.parse(objListaMensagens)
        //for responsável por carregar o histórico de mensagens
     

        for (let i = 0; i < tamanho; i++) {
            console.log("objListaMensagens", objeto[i])
             var bodyAtual = { "id": null, "file": objeto[i].file, "type": "MESSAGE", "content": objeto[i].content, "sender": objeto[i].sender }
            imprimirHistorico({ body: bodyAtual})
        }
        var bodyAtual1 = { "id": null, "file": null, "type": "JOIN", "content": null, "sender": "Hoje" }
        imprimirHistorico({ body: bodyAtual1})
    }




}

function imprimirHistorico(payload) {
    console.log("imprimirHistorico", payload);
    var message = payload.body;


    usuarioLogado = message.sender;


    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + '';
    }  else {
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
    //MENSAGEM DE TEXTO

    if (message.content != null) {
        console.log("entoru em message.content")
        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);

        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    //MENSAGEM DE ARQUIVO
    if (message.file != null  && message.file != '') {
        console.log("message.file", message.file)

        // var testStr = message.file
        // var str = testStr;
        // var result = str.split('chat-demo\\')[1]
        // console.log("result", result)
        var textElement = document.createElement('p');
        textElement.innerHTML = '<a target="_blank" href="' + message.file + '"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16"><path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/><path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/></svg></a>';
        var messageText = document.createTextNode(" ");
        textElement.appendChild(messageText);
        messageElement.appendChild(textElement);
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }





}


function pegarSenhaConfirEdit(e) {
    senhaConfirEdit = e.target.value
}


function pegarSenhaEdit(e) {
    console.log("pegarSenhaEdit", e.target.value)
    senhaEdit = e.target.value
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
document.getElementById('btn_edit_salvar').onclick = function () {
    editarUsuario()
}

document.getElementById('input_username_create').onchange = function (e) {
    pegarUsuario(e)
}

document.getElementById('name').onchange = function (e) {
    pegarUsuarioLogin(e)
}

document.getElementById('adicionar_anexo').onclick = function (e) {

    adicionarAnexo()
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
document.getElementById('config').onclick = function (e) {
    abrirPaginaCadastro(e)
}

document.getElementById('password_confirm').onchange = function (e) {
    pegarSenhaConfirm(e)
}
messageForm.addEventListener('submit', sendMessage, true)

document.getElementById('password-edit').onchange = function (e) {
    pegarSenhaEdit(e)
}
document.getElementById('password-confir-edit').onchange = function (e) {
    pegarSenhaConfirEdit(e)
}
document.getElementById('btn_edit_voltar').onclick = function (e) {
    mudarPaginaChat(e)
}
