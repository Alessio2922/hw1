const container = document.getElementById('results');

function search(event){

    const form_data = new FormData(document.querySelector("#ricerca form"));
    console.log(form_data.get('search'));
    
    //fetch a file php
    fetch("cerca_audio.php?q="+encodeURIComponent(form_data.get('search'))).then(searchResponse).then(searchJson);

    //visualizzo i contenuti
    container.innerHTML = '';

    event.preventDefault();
}

function searchResponse(response)
{
    //console.log(response);
    return response.json();
}

function searchJson(json) {
    console.log('JSON ricevuto');
    // Leggi il numero di risultati
    const results = json.albums.items;
    let num_results = results.length;
    // Mostriamone al massimo 10
    if(num_results > 10)
      num_results = 10;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggi il documento
      const album_data = results[i]
      // Leggiamo info
      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      // Creiamo il div che conterrà immagine e didascalia
      const album = document.createElement('div');

      const div= document.createElement('div')
      div.classList='image';

      const img= document.createElement("img");
      img.src=selected_image;
  
      div.appendChild(img);

      container.appendChild(div);
      //modale al click
      img.addEventListener('click', apriModale);

    }
  }




function apriModale(event) {
    const modale = document.getElementById('modale');
	
	const image = document.createElement('img');
	
	image.id = 'immagine_post';
	
	image.src = event.currentTarget.src;
	
	modale.appendChild(image);
	
	modale.classList.remove('hidden');
    modale.addEventListener('click',chiudiModale);
	
	document.body.classList.add('no-scroll');
}


function chiudiModale() {
	
		//aggiungo la classe hidden 
		modale.classList.add('hidden');
		//prendo il riferimento dell'immagine dentro la modale
		img = modale.querySelector('img');
		//e la rimuovo 
		img.remove();
		//riabilito lo scroll
		document.body.classList.remove('no-scroll');
	
}


const cerca = document.querySelector("form");
const errore = document.getElementById("errore");

cerca.addEventListener("submit",search);


