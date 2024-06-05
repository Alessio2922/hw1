<?php
// Ricevi il nome dal corpo della richiesta POST
$fullName = $_POST['fullName'];

// Esegui la validazione del nome, ad esempio controllando la lunghezza
if (strlen($fullName) >= 3 && strlen($fullName) <= 50) {
    // Se il nome soddisfa i criteri, restituisci una risposta JSON indicando che è valido
    $response = array(
        'valid' => true
    );
} else {
    // Se il nome non soddisfa i criteri, restituisci una risposta JSON con un messaggio di errore
    $response = array(
        'valid' => false,
        'message' => 'Il nome deve essere compreso tra 3 e 50 caratteri.'
    );
}

// Restituisci la risposta JSON al client
header('Content-Type: application/json');
echo json_encode($response);
?>
