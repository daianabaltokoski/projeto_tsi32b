window.addEventListener('load',
  function() {
  console.log('shared.js')
  document
    .getElementById("logoutLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      console.log('clicado')
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

function showLoader() {
  const div = document.createElement('div');
  div.id = 'loader';
  div.innerHTML = 
  `<div class="spinner-border" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>`
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(div);
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.remove();
  }
}