function handleCrearIM(message) {
    let response = "";

    if (currentStep["Crear IM"] === 1 && validateDocument(message)) {
        response = "Por favor escribe la descripción del IM";
        currentStep["Crear IM"] = 2;
    } else if (currentStep["Crear IM"] === 2) {
        response = "Tus datos aparecen en la base de datos y se registra la siguiente información:";
    } else {
        response = "Lo siento, hubo un error. Por favor, intenta nuevamente.";
    }

    return response;
}