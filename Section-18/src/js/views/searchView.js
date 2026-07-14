class SearchView {
    _parentElement = document.querySelector(".search")

    getQuery() {
        const querry = this._parentElement.querySelector(".search__field").value;
        this._clearInput();
        return querry;
    }

    _clearInput() {
        this._parentElement.querySelector(".search__field").value = "";
    }

    addHandelerSearch(handler) {
        this._parentElement.addEventListener("submit", function(e) {
            e.preventDefault();
            handler()
        })
    }
}

export default new SearchView();