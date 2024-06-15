let paginaAtualMaisBaixados = 1;

// Função para carregar os livros mais baixados
async function carregarMaisBaixados() {
    const response = await fetch(`https://gutendex.com/books/?languages=pt&sort=downloads&page=${paginaAtualMaisBaixados}`);
    const data = await response.json();

    // Array para armazenar os livros mais baixados
    const mostDownloadedBooks = data.results;

    // Limpa o contêiner de livros mais baixados
    const container = document.getElementById("most-downloaded-books");
    container.innerHTML = "";

    // Adiciona cada livro mais baixado ao contêiner
    mostDownloadedBooks.forEach(book => {
        const { id, title, authors, formats, download_count } = book;
        const authorName = authors.length > 0 ? authors[0].name : "Autor desconhecido";
        const coverImage = formats["image/jpeg"] || "https://placehold.co/230x260/afc/ccc?text=Capa%20do%20Livro";

        const cardHtml = `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <a href="detalhes.html?id=${id}" onclick="handleDetalhesClick(${id}); return false;">
                        <img src="${coverImage}" class="card-img-top" alt="Capa do Livro">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text mb-auto">Autor: ${authorName}</p>
                        <p class="card-text">Downloads: ${download_count}</p>
                        <a href="detalhes.html?id=${id}" class="btn btn-primary mt-auto" onclick="handleDetalhesClick(${id}); return false;">Detalhes</a>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
}

// Função para lidar com o clique no botão "Detalhes"
function handleDetalhesClick(ebookId) {
    if (verificarLogin()) {
        window.location.href = `detalhes.html?id=${ebookId}`;
    } else {
        const loginToast = new bootstrap.Toast(document.getElementById('loginToast'));
        loginToast.show();

        // Define um temporizador para redirecionar para a página de login após 3 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
}

// Executar a função ao carregar a página
window.addEventListener('load', () => {
    console.log('mais_lidos.js')
    carregarMaisBaixados();

    verificarLogin();
});


