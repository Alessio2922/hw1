function validazione(event) {
    // Verifica se tutti i campi sono riempiti
    if (form.fName.value.length == 0 ||
        form.lName.value.length == 0 ||
        form.email.value.length == 0 ||
        form.password.value.length == 0) {
        // Avvisa utente
        // (meglio con div nascosto)
        alert("Compilare tutti i campi.");
        // Blocca l'invio del form
        event.preventDefault();
    }

}

// Riferimento al form
const form = document.forms['nome_form'];
// Aggiungi listener
form.addEventListener('submit', validazione);