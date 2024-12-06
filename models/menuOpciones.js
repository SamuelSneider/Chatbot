import { manejarObtenerTickets } from './obtenerTickets.js';
import { manejarCrearIM } from './crearIM.js';
import { manejarContactenos } from './contactenos.js';
import { manejarEjecucionParametros } from './ejecucionParametros.js';
import { manejarConsultaSD } from './consultaSD.js';
import { manejarMenuPrincipal } from './menuPrincipal.js';
import { manejarConsultaRequerimientos } from './consultaRequerimientos.js';

function manejarObtenerTickets() {
    console.log("Lógica de Obtener Tickets");
    displayMessage("Mostrando los tickets disponibles...", "chatbot");
}

function handleOptionClick(option) {
    switch (option) {
        case "Obtener Tickets":
            manejarObtenerTickets();
            break;
        case "Consulta SD":
            console.log("Consulta SD");
            displayMessage("Consulta SD seleccionada.", "chatbot");
            break;
        // Otros casos...
        default:
            console.log("Opción no válida.");
    }
}

function displayMessage(text, sender) {
    const messagesContainer = document.getElementById("messages");
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
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Exponer funciones globalmente
window.handleOptionClick = handleOptionClick;
window.manejarObtenerTickets = manejarObtenerTickets;
window.displayMessage = displayMessage;
