document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    var searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
    }
});

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
                    <a href="detalhes.html?id=${id}">
                        <img src="${coverImage}" class="card-img-top" alt="Capa do Livro">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text mb-auto">Autor: ${authorName}</p>
                        <p class="card-text">Downloads: ${download_count}</p>
                        <a href="detalhes.html?id=${id}" class="btn btn-primary mt-auto">Detalhes</a>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
}

// Executar a função ao carregar a página
window.addEventListener('load', () => {
    console.log('mais_lidos.js')
    carregarMaisBaixados();
});

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioArmazenado = localStorage.getItem('usuario');
    if (usuarioArmazenado) {
        // Se o usuário estiver logado, exibir o nome e o botão "Sair"
        const usuario = JSON.parse(usuarioArmazenado);
        document.getElementById('nomeUsuario').textContent = usuario.nome;
        document.getElementById('entreOuCadastrese').style.display = 'none';
        document.getElementById('nomeUsuarioWrapper').style.display = 'block';
    } else {
        // Se o usuário não estiver logado, exibir o botão "Entrar ou Cadastre-se"
        document.getElementById('entreOuCadastrese').style.display = 'block';
        document.getElementById('nomeUsuarioWrapper').style.display = 'none';
    }
}

// // Função para sair da conta
// function sairDaConta() {
//     // Remover o usuário do localStorage
//     localStorage.removeItem('usuario');
//     // Atualizar a exibição
//     verificarLogin();
// }

// Event listener para o botão "Sair"
// document.getElementById('logoutLink').addEventListener('click', sairDaConta);

// Chamar a função de verificação de login ao carregar a página
verificarLogin();
