document - addEventListener("DOMContentLoaded", function () {
    $("#input_form").on("submit", async function (event) {
        // Verifica se il modulo è valido
        if (this.checkValidity()) {
            // Impedisce l'invio del modulo per prevenire il comportamento predefinito
            event.preventDefault();

            // Ottenere i valori dei campi
            let fullName = $("input[name='fullName']").val();
            let message = $("input[name='message']").val();

            try {
                // Controllare la lunghezza del nome asincronamente tramite una richiesta AJAX
                let nameResponse = await $.ajax({
                    url: "http://localhost/mailing_list/check_name_length.php",
                    type: "POST",
                    data: { fullName: fullName }
                });

                // Controllare la lunghezza del messaggio asincronamente tramite una richiesta AJAX
                let messageResponse = await $.ajax({
                    url: "http://localhost/mailing_list/check_message_length.php",
                    type: "POST",
                    data: { message: message }
                });

                // Verificare le risposte
                if (nameResponse.valid && messageResponse.valid) {
                    // Invia la richiesta AJAX per salvare i dati
                    $.ajax({
                        url: "http://localhost/mailing_list/server.php",
                        type: "POST",
                        data: $(this).serialize(),
                        success: function (response) {
                            // Mostra il messaggio di successo solo se la richiesta ha avuto successo
                            $("#success").text("Form Submit Success");
                        }
                    });
                } else {
                    // Mostra gli errori in alert
                    let errorMessage = '';

                    if (!nameResponse.valid) {
                        errorMessage += nameResponse.message + '\n';
                    }

                    if (!messageResponse.valid) {
                        errorMessage += messageResponse.message + '\n';
                    }

                    alert("Error:\n" + errorMessage);
                }
            } catch (error) {
                console.error("Errore durante la richiesta AJAX:", error);
            }
        } else {
            // Se il modulo non è valido, visualizza un messaggio di errore o esegui altre azioni
            // Puoi ad esempio mostrare un messaggio per informare l'utente di compilare tutti i campi obbligatori correttamente
            alert("Please fill out all required fields.");
        }
    });
})