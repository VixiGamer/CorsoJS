import icons from "url:../../img/icons.svg";

export default class View {
    _data;
    
    //^ Funzione per far visualizzare una ricetta
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)      // E qui inserisco la ricetta
    }

    //^ Funzione per svuotare il contenitore della ricetta (cosi che si leva il messaggio di cercare una ricetta)
    _clear() {
        this._parentElement.innerHTML = ""
    } 

    //^ Funzione per far visualizzare lo spinner di caricamento
    renderSpinner() {
        const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    //^ Funzione per far visualizzare il mesaggio di errore
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    //^ Funzione per far visualizzare il messaggio di successo
    renderMessage(message = this._errorMessage) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                    </svg>
                </div>
                <p>${this._message}</p>
            </div>

        `
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }
}