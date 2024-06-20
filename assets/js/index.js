let paginaAtual = 0;

window.addEventListener('load', function () {
    console.log('index.js')
    // Executar a função "carregar" quando a página já estiver carregada
    document.addEventListener("DOMContentLoaded", carregar);

    verificarLogin();
    carregar();
});

// função para carregar ebooks
async function carregar() {
    showLoader()
    paginaAtual++;
    const response = await fetch(
        `https://gutendex.com/books/?languages=pt&page=${paginaAtual}`
    );
    const data = await response.json();

    // total de ebooks no catálogo
    // const total = data.count;
    // todos os ebooks que foram carregados, máximo de 32 por vez
    const results = data.results;
    for (const ebook of results) {
        addEbook(ebook);
    }
    hideLoader();
}

// função para adicionar um ebook ao DOM
function addEbook(ebook) {
    const { title, authors, formats } = ebook;
    const authorName = authors.length > 0 ? formatAuthorName(authors[0].name) : "Autor não informado";

function formatAuthorName(fullName) {
    const nameParts = fullName.split(", ");
    if (nameParts.length > 1) {
        return `${nameParts[1]} ${nameParts[0]}`;
    } else {
        return fullName;
    }
}
    const coverImage =
        formats["image/jpeg"] ||
        "https://placehold.co/230x260/afc/ccc?text=Capa%20do%20Livro";
    const bookLink = formats["text/html"] || "#";

    const cardHtml = `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card h-100">
                <a href="detalhes.html?id=${ebook.id}" onclick="handleDetalhesClick(${ebook.id}); return false;"> 
                    <img src="${coverImage}" class="card-img-top" alt="Capa do Livro">
                </a>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text mb-auto">${authorName}</p>
                    <a href="detalhes.html?id=${ebook.id}" class="btn btn-primary mt-auto" onclick="handleDetalhesClick(${ebook.id}); return false;">Detalhes</a>
                </div>
            </div>
        </div>
    `;

    // Adiciona o card ao contêiner de cards
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML += cardHtml;
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

// Função para verificar o status de login (simulada)
function verificarLogin() {
    // Implementação simulada de verificação de login
    return false; // Retornando falso para simular usuário não logado
}
