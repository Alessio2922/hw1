document.addEventListener("DOMContentLoaded", function () {
    const slides = ["slide1", "slide2", "slide3", "slide4", "slide5"];
    let currentSlide = 0;

    function showSlide(index) {
        for (const slide of slides) {
            document.querySelector("#headerSlide").classList.remove(slide);
        }
        document.querySelector("#headerSlide").classList.add(slides[index]);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 7000);

    function menuBurger() {
        let burger = document.querySelector(".burger");
        if (window.innerWidth <= 700) {
            burger.classList.remove("hidden");
        } else {
            burger.classList.add("hidden");
        }
    }

    window.onload = menuBurger;
    window.onresize = menuBurger;

    const burger = document.querySelector(".burger");
    burger.onclick = function () {
        const buttons = document.querySelectorAll(".button");
        for (const button of buttons) {
            button.classList.toggle("active");
        }
    }

    document.querySelector("#headerSlide").addEventListener("click", nextSlide);

    const PHOTO_LIST = [
        "mhw3-img/maglietta1.jpeg",
        "mhw3-img/maglietta2.jpeg",
        "mhw3-img/maglietta3.jpeg"
    ];

    function createImage(src) {
        const image = document.createElement("img");
        image.src = src;
        return image;
    }

    const albumView = document.querySelector("#album-view");
    for (const photoSrc of PHOTO_LIST) {
        const image = createImage(photoSrc);
        image.addEventListener("click", onThumbnailClick);
        albumView.appendChild(image);
    }

    function onThumbnailClick(event) {
        const image = createImage(event.currentTarget.src);
        document.body.classList.add("no-scroll");
        modalView.style.top = window.pageYOffset + "px";
        modalView.appendChild(image);
        modalView.classList.remove("hidden-modal");
    }

    function onModalClick() {
        document.body.classList.remove("no-scroll");
        modalView.classList.add("hidden-modal");
        modalView.innerHTML = "";
    }

    const modalView = document.querySelector("#modal-view");
    modalView.addEventListener("click", onModalClick);

    const footer = document.getElementById("footer-data");
    const vediAltroButton = document.getElementById("vedi-altro");

    vediAltroButton.addEventListener("click", function () {
        const isHidden = footer.dataset.hidden === "true";
        if (isHidden) {
            footer.dataset.hidden = "false";
            footer.style.display = "block";
            vediAltroButton.textContent = "Nascondi";
        } else {
            footer.dataset.hidden = "true";
            footer.style.display = "none";
            vediAltroButton.textContent = "Vedi altro";
        }
    });

    /* 
        SEZIONE API

        1. API Spotify: tramite una ricerca visualizza tutti gli album appartenenti alla band "Nirvana";
                        se l'album non appartiene alla band non verrà visualizzato nulla.
        
        2. API The Guardian: al click di un bottone verranno visualizzati tutti gli articoli che riguardano la band "Nirvana";
                             è presente un filtro che seleziona e visualizza solo gli articoli che fanno parte della sezione "music",
                             in modo da non visualizzare articoli non correlati con la band ma che hanno nel titolo la scritta "Nirvana"
    */

    /************************************************************ API SPOTIFY  ************************************************************/

    function onJson(json) {
        console.log("JSON ricevuto");
        console.log(json);
        // Svuotiamo la libreria
        const library = document.querySelector("#album-viewAPI");
        library.innerHTML = "";
        // Leggi il numero di risultati
        const results = json.albums.items;
        let num_results = results.length;
        // Mostriamone al massimo 10
        if (num_results > 10)
            num_results = 10;

        // Processa ciascun risultato
        for (let i = 0; i < num_results; i++) {
            // Leggi il documento
            const album_data = results[i];
            // Verifica se l'album appartiene ai Nirvana
            const artists = album_data.artists;
            let isNirvanaAlbum = false;
            for (let j = 0; j < artists.length; j++) {
                if (artists[j].name === "Nirvana") {
                    isNirvanaAlbum = true;
                    break;
                }
            }

            // Se l'album non appartiene ai Nirvana, passa al prossimo risultato
            if (!isNirvanaAlbum) {
                continue;
            }
            // Info
            const title = album_data.name;
            const selected_image = album_data.images[0].url;
            // div che conterrà immagine e didascalia
            const album = document.createElement("div");
            album.classList.add("albumAPI");
            // Immagine
            const img = document.createElement("img");
            img.src = selected_image;
            // Didascalia
            const caption = document.createElement("span");
            caption.textContent = title;
            // Immagine e didascalia al div
            album.appendChild(img);
            album.appendChild(caption);
            // div alla libreria
            library.appendChild(album);
        }
    }

    function onResponse(response) {
        console.log("Risposta ricevuta");
        return response.json();
    }

    function search(event) {
        // Impedisce il submit del form
        event.preventDefault();
        // Legge valore del campo di testo
        const album_input = document.querySelector("#albumAPI");
        const album_value = encodeURIComponent(album_input.value);
        console.log("Eseguo ricerca: " + album_value);
        // Esegue la richiesta
        fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
            {
                headers:
                {
                    "Authorization": "Bearer " + token
                }
            }
        ).then(onResponse).then(onJson);
    }

    function onTokenJson(json) {
        console.log(json)
        // Imposta il token global
        token = json.access_token;
    }

    function onTokenResponse(response) {
        return response.json();
    }

    // OAuth credentials 
    const client_id = "X";
    const client_secret = "X";;
    // Dichiara variabile token
    let token;
    // All"apertura della pagina, richiediamo il token
    fetch("https://accounts.spotify.com/api/token",
        {
            method: "post",
            body: "grant_type=client_credentials",
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
            }
        }
    ).then(onTokenResponse).then(onTokenJson);
    // Aggiunge event listener al form
    const form = document.querySelector("form");
    form.addEventListener("submit", search)

    /************************************************************ API THE GUARDIAN  ************************************************************/
    const endpointUrl = "https://content.guardianapis.com/search";
    const apiKey = "X";
    const queryParams = "?api-key=" + apiKey + "&q=Nirvana";

    function fetchData() {
        fetch(endpointUrl + queryParams)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella richiesta: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                console.error("Errore durante la richiesta:", error);
            });
    }

    function displayData(data) {
        const articleContainer = document.getElementById("article-container");
        // Svuota il contenitore degli articoli
        articleContainer.innerHTML = "";
        // Aggiungi gli articoli al contenitore
        data.response.results.forEach(article => {

            /* 
                In questo modo faccio sì che spuntino soltanto i video 
                della sezione "musica", in modo da ottenere risultati
                che riguardino solamente la band "Nirvana"
            */
            if (article.sectionId === "music") {
                const articleDiv = document.createElement("div");
                articleDiv.classList.add("article");

                const title = document.createElement("h2");
                title.textContent = article.webTitle;

                const section = document.createElement("p");
                section.textContent = "Sezione: " + article.sectionName;

                const link = document.createElement("button");
                link.textContent = "Leggi l\"articolo completo";

                // Per visualizzare l"articolo completo
                link.addEventListener("click", function () {
                    window.open(article.webUrl, "_blank");
                });

                articleDiv.appendChild(title);
                articleDiv.appendChild(section);
                articleDiv.appendChild(link);

                articleContainer.appendChild(articleDiv);
            }
        });
    }

    const readMoreButton = document.getElementById("read-more-button");
    readMoreButton.addEventListener("click", function () {
        fetchData();
    });

    /* Pulsante Torna SU */
    











});
