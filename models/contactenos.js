function handleContactenos(message) {
    let response = "";

    if (currentStep["Contactenos"] === 1) {
        response = "Por favor escriba la descripción de la ayuda que necesitas:";
        currentStep["Contactenos"] = 2;
    } else if (currentStep["Contactenos"] === 2) {
        response = "Tus datos aparecen en la base de datos y se registra la siguiente información:";
    } else {
        response = "Lo siento, hubo un error. Por favor, intenta nuevamente.";
    }

    return response;
}