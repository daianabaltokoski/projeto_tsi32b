window.addEventListener('load',
  function() {
  console.log('shared.js')
  document
    .getElementById("logoutLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      console.log('clicado')
      localStorage.removeItem("authUser");
      verificarLogin();
    });
});


// Função para verificar se o usuário está logado
function verificarLogin() {
  console.log()
  const authUser = localStorage.getItem("authUser");

  if (authUser) {
    document.getElementById("nomeUsuario").textContent = authUser;
    document.getElementById("entreOuCadastrese").style.display = "none";

    document.getElementById("nomeUsuarioWrapper").style.display = "block";
  } else {
    document.getElementById("entreOuCadastrese").style.display = "block";
    document.getElementById("nomeUsuarioWrapper").style.display = "none";
  }

  return !!authUser
}
