window.addEventListener('load', function () {
    console.log('doacao.js');
    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário padrão

        var searchTerm = document.getElementById("search-input").value.trim();
        if (searchTerm) {
            window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    verificarLogin();

});
