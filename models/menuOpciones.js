

// Paso 4: Mostrar el menú de opciones inicial
function showOptionsMenu() {
    
    const optionsMenu = document.getElementById("primeraOpcion");
    const messages = document.getElementById("messages");
    messages.appendChild(optionsMenu);
    optionsMenu.style.display = "block";
    menuMessage.innerHTML = `
    <span class="icon"><i class="fas fa-robot"></i></span>
    <span class="bubble">Tenemos las siguientes consultas, ¿cuál deseas escoger?</span>
`;
}

// Paso 5: Manejar la selección de una opción
function handleOptionClick(option) {
    displayMessage(`${option}`, "user");

    selectedOption = option;
    currentStep[option] = 1;  // Inicializar el paso para la opción seleccionada

    // Mostrar mensajes de acuerdo a la opción seleccionada
    switch (option) {
        case "Obtener Tickets":
        case "Crear IM":
        case "Contactenos":
        case "Ejecución de parametros":
            displayMessage("Por favor, digita tu número de documento de identidad sin puntos o comas.", "chatbot");
            break;
        case "Consulta SD":
            displayMessage("Por favor digita el codigo SD", "chatbot");
            break;
        case "Menu Principal":
        case "Consulta Requerimientos":
            displayMessage("Selecciona la opcion a la que deseas acceder:", "chatbot");
            break;
        default:
            displayMessage(`Has elegido "${option}". ¿Cómo puedo ayudarte más?`, "chatbot");
            break;
    }

    // Ocultar el menú de opciones después de la selección
    const optionsMenu = document.getElementById("options-menu");
    if (optionsMenu) {
        optionsMenu.style.display = "none";
    }
}

// Paso 6: Manejar respuesta según la opción seleccionada
function handleOptionResponse(message) {
    let response = "";

    switch (selectedOption) {
        
        case "Obtener Tickets":
            response = handleGetTickets(message);
            break;
        case "Consulta SD":
            response = handleConsultaSD(message);
            break;
        case "Crear IM":
            response = handleCrearIM(message);
            break;
        case "Menu Principal":
            response = "Estás en el menú principal. ¿En qué más puedo ayudarte?";
            break;
        case "Consulta Requerimientos":
            response = handleConsultaRequerimientos(message);
            break;
        case "Crear Requerimiento":
            response = handleCrearRequerimiento(message);
            break;
        case "Contactenos":
            response = handleContactenos(message);
            break;
        case "Ejecución de parametros":
            response = handleEjecucionParametros(message);
            break;
        default:
            response = "Lo siento, no entendí tu mensaje. ¿Puedes aclarar?";
    }

    displayMessage(response, "chatbot");
}



// Paso 7: Mostrar mensaje en la interfaz
function displayMessage(text, sender) {
    const messageContainer = document.getElementById("messages");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    const iconElement = document.createElement("span");
    iconElement.classList.add("icon");
    iconElement.innerHTML = sender === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const bubbleElement = document.createElement("span");
    bubbleElement.classList.add("bubble");
    bubbleElement.innerText = text;

    messageElement.appendChild(iconElement);
    messageElement.appendChild(bubbleElement);
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Paso 8: Validaciones
function validateDocument(document) {
    return /^[0-9]+$/.test(document);
}

function validatePhone(phone) {
    return /^[0-9]+$/.test(phone);
}
