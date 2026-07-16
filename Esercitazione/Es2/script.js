const btn = document.getElementById('btn-discover');
const userInfoDiv = document.getElementById('user-info');
const countryInfoDiv = document.getElementById('country-info');

// TODO 1: Crea la funzione 'discoverUser'
const discoverUser = async function () {

    // Resetta il testo prima di ogni nuova ricerca
    userInfoDiv.textContent = 'Caricamento in corso...';
    countryInfoDiv.textContent = '';


    // TODO 2: Fai una chiamata fetch a 'https://randomuser.me/api/'
    // Ricordati di ritornare la risposta convertita in formato JSON (.json())

    const res = await fetch(`https://randomuser.me/api/`)
    const data = await res.json()
    console.log(data);


    // TODO 3: Nel blocco .then() successivo, ricevi i dati.
    // - Estrai nome, cognome e nazione (guarda come è fatto l'oggetto JSON in console!)
    // - Stampa il messaggio in console: "Hello! My name is [Nome] [Cognome] and I am from [Nazione]."
    // - Opzionale: mostra lo stesso messaggio dentro userInfoDiv.textContent

    function changeTextDiv(message) {
        return userInfoDiv.textContent = message
    }


    const user = data.results[0]
    const name = `${user.name.title} ${user.name.first} ${user.name.last}`
    const country = user.location.country
    const message = `Hello! My name is '${name}' and I am from ${country}`
    changeTextDiv(message)
    console.log(message);

    // TODO 4: Fai un fetch(...) verso la Universities API 
    // usando la nazione appena estratta. 
    // L'URL è: `http://universities.hipolabs.com/search?country=${countryName}`
    // TODO 5: Gestisci la risposta della seconda fetch. 
    // Controlla se 'response.ok' è false. Se lo è: throw new Error('Errore di rete con le università!');
    // Altrimenti, ritorna la risposta in formato JSON (.json()).

    const res1 = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
    if (!res1.ok) return
    const data1 = await res1.json();
    console.log(data1);

    // TODO 6: Nel blocco finale, ricevi i dati delle università (sarà un array!).
    // ATTENZIONE: Se l'API non trova università per quel paese, non dà errore 404, ma restituisce un array vuoto [].
    // - Controlla se l'array è vuoto (es. array.length === 0). Se lo è: throw new Error('Nessuna università trovata per questo paese!');
    // - Se l'array contiene dati, prendi il primo elemento (l'università all'indice 0).
    // - Estrai il nome (proprietà "name") e il sito web (è dentro l'array "web_pages", prendi il primo).
    // - Stampa in console: "Puoi studiare presso: [Nome Università]. Sito: [Sito Web]."
    // - Mostra questo messaggio in countryInfoDiv.textContent

    if (data1.length === 0) {
        console.error("Nessuna università trovata per questo paese!");
        return
    }

    const university = data1[0]
    const uniName = university.name
    const uniWebsite = university.web_pages[0]
    const message1 = `Puoi studiare presso: ${uniName}. Sito: ${uniWebsite}`
    setTimeout(() => changeTextDiv(message1), 2000)

    console.log(university);
};

// Quando il bottone viene cliccato, si avvia la funzione
btn.addEventListener('click', discoverUser);