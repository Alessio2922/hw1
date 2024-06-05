<?php
// Ricevi i dati dal corpo della richiesta POST
$message = $_POST['message'];

// Esegui la validazione del messaggio, controllando la lunghezza
if (strlen($message) <= 250) {
    // Se il messaggio soddisfa i criteri, restituisci una risposta JSON indicando che è valido
    $response = array(
        'valid' => true
    );
} else {
    // Se il messaggio non soddisfa i criteri, restituisci una risposta JSON con un messaggio di errore
    $response = array(
        'valid' => false,
        'message' => 'Il messaggio non deve superare i 250 caratteri.'
    );
}

// Restituisci la risposta JSON al client
header('Content-Type: application/json');
echo json_encode($response);
?>
