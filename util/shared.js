window.onload = function () {
  // Event listener para o link "Sair"
  document
    .getElementById("logoutLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("isLoggedIn", false);
      verificarLogin();
    });
};

// Função para verificar se o usuário está logado
function verificarLogin() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn) {
    let user = localStorage.getItem("usuario");
    if (user) {
      user = JSON.parse(user);
      document.getElementById("nomeUsuario").textContent = user.nome;
    }
    document.getElementById("entreOuCadastrese").style.display = "none";

    document.getElementById("nomeUsuarioWrapper").style.display = "block";
  } else {
    document.getElementById("entreOuCadastrese").style.display = "block";
    document.getElementById("nomeUsuarioWrapper").style.display = "none";
  }
}
