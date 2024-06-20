let paginaAtualMaisBaixados = 1;

// Função para carregar os livros mais baixados
async function carregarMaisBaixados() {
    showLoader();
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
        const authorName = authors.length > 0 ? formatAuthorName(authors[0].name) : "Autor desconhecido";

function formatAuthorName(fullName) {
    // Dividir o nome completo do autor em partes
    const nameParts = fullName.split(", ");
    // Verificar se o nome possui sobrenome
    if (nameParts.length > 1) {
        // Formatar como "Nome Sobrenome"
        return `${nameParts[1]} ${nameParts[0]}`;
    } else {
        // Se não houver sobrenome identificado, retornar o nome completo
        return fullName;
    }
}
        const coverImage = formats["image/jpeg"] || "https://placehold.co/230x260/afc/ccc?text=Capa%20do%20Livro";

        const cardHtml = `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <div class="card h-100">
                    <a href="detalhes.html?id=${id}" onclick="handleDetalhesClick(${id}); return false;">
                        <img src="${coverImage}" class="card-img-top" alt="Capa do Livro">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text mb-auto"> ${authorName}</p>
                        <p class="card-text">Downloads: ${download_count}</p>
                        <a href="detalhes.html?id=${id}" class="btn btn-primary mt-auto" onclick="handleDetalhesClick(${id}); return false;">Detalhes</a>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
    hideLoader();
}

// Função para lidar com o clique no botão "Detalhes"
function handleDetalhesClick(ebookId) {
    if (verificarLogin()) {
        window.location.href = `detalhes.html?id=${ebookId}`;
    } else {
        Swal.fire({
            title: 'Faça login',
            text: 'Você precisa estar logado para acessar esta página.',
            icon: 'warning',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'login.html';
        });
    }
}


// Executar a função ao carregar a página
window.addEventListener('load', () => {
    console.log('mais_lidos.js')
    carregarMaisBaixados();

    verificarLogin();
});


