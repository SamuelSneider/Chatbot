function handleConsultaRequerimientos(message) {
    let response = "";

    if (currentStep["Consulta Requerimientos"] === 1) {
        response = "Por favor digita tu numero de telefono sin puntos o comas.";
        currentStep["Consulta Requerimientos"] = 2;
    } else if (currentStep["Consulta Requerimientos"] === 2 && validatePhone(message)) {
        response = "Tus datos aparecen en la base de datos y se registra la siguiente información:";
    } else {
        response = "Lo siento, hubo un error. Por favor, intenta nuevamente.";
    }

    return response;
}