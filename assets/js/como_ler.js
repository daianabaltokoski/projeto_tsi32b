window.addEventListener('load', function () {
    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var searchTerm = document.getElementById("search-input").value.trim();
        if (searchTerm) {
            window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    verifyLogin();

});
