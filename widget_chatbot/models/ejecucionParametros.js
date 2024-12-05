function handleEjecucionParametros(message) {
    let response = "";

    if (currentStep["Ejecución de parametros"] === 1) {
        response = "Por favor escriba los parametros:";
        currentStep["Ejecución de parametros"] = 2;
    } else if (currentStep["Ejecución de parametros"] === 2) {
        response = "Tus datos aparecen en la base de datos y se registra la siguiente información:";
    } else {
        response = "Lo siento, hubo un error. Por favor, intenta nuevamente.";
    }

    return response;
}
