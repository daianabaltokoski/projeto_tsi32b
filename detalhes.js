document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    var searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Endpoint da API para buscar os detalhes do livro
    const apiUrl = "https://gutendex.com/books/";

    // Obtém o ID do livro a partir da string de consulta na URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("id");

    console.log("ID do Livro:", bookId);

    // Busca os detalhes do livro na API
    fetch(apiUrl + bookId)
        .then(response => response.json())
        .then(data => {
            console.log("Detalhes do Livro:", data);
            // Atualiza os elementos HTML com os detalhes do livro
            document.getElementById("book-title").textContent = data.title;
            // Verifica se há autores e mostra o primeiro autor
            document.getElementById("author").textContent = "Autor: " + (data.authors.length > 0 ? data.authors[0].name : "Não informado");
            document.getElementById("downloads").textContent = "Downloads: " + (data.download_count || 0);
            // Verifica se há gêneros e os mostra
            document.getElementById("genres").textContent = "Gêneros: " + (data.subjects.length > 0 ? data.subjects.join(", ") : "Não informado");
            // Verifica se a capa do livro está disponível e atribui ao elemento img
            if (data.formats["image/jpeg"]) {
                document.getElementById("book-cover").src = data.formats["image/jpeg"];
            } else {
                // Caso a capa não esteja disponível, usa uma imagem de espaço reservado
                document.getElementById("book-cover").src = "https://via.placeholder.com/300";
            }

            // Adiciona a funcionalidade aos botões
            document.getElementById("ler-agora").addEventListener("click", function() {
                const readUrl = data.formats["text/html"] || data.formats["text/html; charset=iso-8859-1"];
                if (readUrl) {
                    window.open(readUrl, '_blank');
                } else {
                    alert("Formato de leitura não disponível.");
                }
            });

            document.getElementById("baixar").addEventListener("click", function() {
                const downloadUrl = data.formats["application/epub+zip"] || data.formats["application/pdf"] || data.formats["application/x-mobipocket-ebook"];
                if (downloadUrl) {
                    window.open(downloadUrl, '_blank');
                } else {
                    alert("Formato de download não disponível.");
                }
            });

            document.getElementById("favoritar").addEventListener("click", function() {
                // Adiciona o livro aos favoritos (você pode implementar esta funcionalidade usando armazenamento local ou uma API backend)
                alert("Livro adicionado aos favoritos!");
            });

        })
        .catch(error => console.error("Erro na Busca:", error));
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

// Função para sair da conta
function sairDaConta() {
    // Remover o usuário do localStorage
    localStorage.removeItem('usuario');
    // Atualizar a exibição
    verificarLogin();
}

// Event listener para o botão "Sair"
document.getElementById('logoutLink').addEventListener('click', sairDaConta);

// Chamar a função de verificação de login ao carregar a página
verificarLogin();
