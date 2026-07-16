// Selezioniamo gli elementi dal documento (HTML)
const btn = document.getElementById('analyzeBtn');
const input = document.getElementById('bloodSugar');
const resultDiv = document.getElementById('result');

// Avviamo una funzione quando l'utente clicca il bottone
btn.addEventListener('click', function() {
    
    function getGlicemia() {
        const glicemia = Number(input.value)
        return glicemia
    }

    const glicemia = getGlicemia();
    let risultato = '';
    let colore = '';

    if (glicemia < 100) {
        risultato = 'Glicemia nella norma';
        colore = 'green';
    } else if (glicemia <= 125) {
        risultato = 'Valore da monitorare (Prediabete)';
        colore = 'orange';
    } else {
        risultato = 'Valore alto (Sospetto diabete)';
        colore = 'red';
    }

    resultDiv.textContent = risultato
    resultDiv.style.color = colore
});
