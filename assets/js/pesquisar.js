document.addEventListener('DOMContentLoaded', function () {
    verifyLogin();
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    if (searchTerm) {
        document.getElementById('search-input').value = searchTerm;
        performSearch(searchTerm);
    }

    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var searchTerm = document.getElementById('search-input').value.trim();
        if (searchTerm) {
            window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    function performSearch(searchTerm, page = 1) {
        showLoader();
        const query = encodeURIComponent(searchTerm);

        fetch(`https://gutendex.com/books/?languages=pt&page=${page}&search=${query}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // Adiciona os resultados ao array global
                searchResults = searchResults.concat(data.results);

                // Exibe os resultados à medida que são encontrados
                displaySearchResults(searchResults);

                // Verifica se há mais páginas e continua a busca nelas
                hideLoader();
                if (data.next) {
                    var nextPage = page + 1;
                    performSearch(searchTerm, nextPage);
                }
            })
            .catch(function (error) {
                console.error('Erro ao buscar dados da API:', error);
            });

    }

    var searchResults = []; // Array global para armazenar todos os resultados

    function displaySearchResults(results) {
        var searchResultsDiv = document.getElementById('search-results');
        searchResultsDiv.innerHTML = '';

        if (results.length > 0) {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('row');

            results.forEach(function (livro) {
                var colDiv = document.createElement('div');
                colDiv.classList.add('col-6', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');
                colDiv.innerHTML = `
                    <div class="card h-100">
                        <a href="detalhes.html?id=${livro.id}"> 
                            <img src="${livro.formats['image/jpeg'] || 'https://placehold.co/230x260/afc/ccc?text=Capa%20não%20disponível'}" class="card-img-top" alt="Capa do Livro">
                        </a>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${livro.title}</h5>
                            <p class="card-text">${livro.authors.length > 0 ? livro.authors[0].name : 'Autor não informado'}</p>
                            <a href="detalhes.html?id=${livro.id}" class="btn btn-primary mt-auto">Detalhes</a>
                        </div>
                    </div>
                `;
                rowDiv.appendChild(colDiv);
            });

            searchResultsDiv.appendChild(rowDiv);
        } else {
            searchResultsDiv.innerHTML = '<p class="text-center">Nenhum livro encontrado com esse termo de busca.</p>';
        }
    }
});