const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic Q2xhcm9BdXRvbWF0aXphY2lvbjpDbGFyb1RyaWFyYSQyMDIzKg==");

let isFirstInteraction = true;
let selectedOption = null;
let currentStep = {};
let userData = {};

window.onload = function () {
    resetChatState();
};

function toggleChatbox() {
    const chatWidget = document.getElementById('chat-widget');
    const messagesContainer = document.getElementById('messages');
    const optionsMenu = document.getElementById('primeraOpcion');

    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'block';

        if (!messagesContainer.querySelector('#welcome-message')) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.id = 'welcome-message';
            welcomeMessage.classList.add('message', 'chatbot');
            welcomeMessage.innerHTML = `
                <span class="icon"><i class="fas fa-robot"></i></span>
                <span class="bubble">Bienvenido a su asistente virtual.</span>
            `;
            messagesContainer.prepend(welcomeMessage);
        }

        displayWelcomeAndPrompt();
    } else {
        chatWidget.style.display = 'none';

        const userMessages = messagesContainer.querySelectorAll('.message:not(#welcome-message)');
        userMessages.forEach(message => message.remove());

        if (optionsMenu) optionsMenu.style.display = 'none';

        resetChatState();
    }
}

function resetChatState() {
    isFirstInteraction = true;
    selectedOption = "dataCollection";
    currentStep = { dataCollection: 1 };

    userData = { document: null, phone: null };
}

function displayWelcomeAndPrompt() {
    setTimeout(() => {
        displayMessage("Por favor digita tu número de documento de identidad sin puntos o comas.", "chatbot");
    }, 2000);
    resetChatState();
}

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message === '') return;

    displayMessage(message, "user");
    userInput.value = '';

    if (isFirstInteraction) {
        if (currentStep[selectedOption] === 1) {
            userData.document = message;
            currentStep[selectedOption] = 2;

            setTimeout(() => {
                displayMessage("Gracias. Ahora, por favor ingresa tu número de teléfono.", "chatbot");
            }, 1000); 
        } else if (currentStep[selectedOption] === 2) {
            userData.phone = message;

            currentStep[selectedOption] = 3;

            setTimeout(() => {
                displayMessage("Perfecto, validando tu información...", "chatbot");
                authenticateUser(); // Llamar a la función para autenticar
            }, 1000); 
        }
    }
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = `<span class="bubble">${message}</span>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function authenticateUser() {
    const raw = JSON.stringify({
        "documentid": userData.document,
        "numcel": userData.phone
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://100.123.3.88:8080/WhatsApp/Claro/Api/Services/AutheticateSM?Api=W", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.code === "0" && result.results.success) {
                displayMessage(`Autenticación exitosa: ${result.results.message}`, "chatbot");
            } else {
                displayMessage(`Error en la autenticación: ${result.desc}`, "chatbot");
            }
        })
        .catch((error) => {
            console.error(error);
            displayMessage("Ocurrió un error al intentar autenticar. Inténtalo de nuevo más tarde.", "chatbot");
        });
}

