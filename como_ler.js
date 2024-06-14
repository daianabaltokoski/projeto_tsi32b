
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    var searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        window.location.href = `pesquisar.html?q=${encodeURIComponent(searchTerm)}`;
    }
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
