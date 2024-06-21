window.addEventListener('load',
  function () {
    document
      .getElementById("logoutLink")
      .addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("authUser");
        verifyLogin();
      });
  });

// Função para verificar se o usuário está logado
function verifyLogin() {
  console.log()
  const authUser = localStorage.getItem("authUser");

  if (authUser) {
    document.getElementById("userName").textContent = authUser;
    document.getElementById("entreOuCadastrese").style.display = "none";

    document.getElementById("userNameWrapper").style.display = "block";
  } else {
    document.getElementById("entreOuCadastrese").style.display = "block";
    document.getElementById("userNameWrapper").style.display = "none";
  }

  return !!authUser
}

// Função para mostrar o ícone de carregamento
function showLoader() {
  const div = $(`
    <div id="loader">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>`);
  div.appendTo('body');
}

// Função para ocultar o ícone de carregamento
function hideLoader() {
  $('#loader').remove();
}
