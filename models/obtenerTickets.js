export function manejarObtenerTickets() {
    console.log("Lógica para 'Obtener Tickets' ejecutada.");
    const messagesContainer = document.getElementById("messages");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "chatbot");
    messageElement.innerHTML = `
        <span class="icon"><i class="fas fa-robot"></i></span>
        <span class="bubble">Aquí tienes los tickets disponibles...</span>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
