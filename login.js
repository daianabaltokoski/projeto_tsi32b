// Função para alternar entre os formulários de login e cadastro
function toggleForms() {
  const loginForm = document.getElementById("loginFormContainer");
  const cadastroForm = document.getElementById("cadastroFormContainer");

  loginForm.style.display =
      loginForm.style.display === "none" ? "block" : "none";
  cadastroForm.style.display =
      cadastroForm.style.display === "none" ? "block" : "none";
}

// Função para cadastrar um novo usuário
async function cadastrarUsuario() {
  // Trigger Bootstrap form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.classList.add("was-validated");
  });

  // Check if the form is valid
  if (document.getElementById("cadastroForm").checkValidity()) {
      const nome = document.getElementById("cadastroNome").value.trim();
      const email = document.getElementById("cadastroEmail").value.trim();
      const senha = document.getElementById("cadastroPassword").value.trim();

      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const senhaRegex = /^\S{3,}$/;

      if (!nameRegex.test(nome)) {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Por favor, insira um nome válido (apenas letras e espaços).'
          });
          return;
      }

      if (!emailRegex.test(email)) {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Por favor, insira um email válido.'
          });
          return;
      }

      if (!senhaRegex.test(senha)) {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'A senha deve ter no mínimo 3 caracteres e não deve conter espaços.'
          });
          return;
      }

      // Salvar os dados do usuário no localStorage
      const novoUsuario = { nome: nome, email: email, senha: senha };
      await apiCadastraUsuario(novoUsuario);
      
      Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Usuário cadastrado com sucesso!'
      }).then(() => {
          toggleForms(); // Alternar para o formulário de login após o cadastro
      });
  }
}

// Função para realizar o login
async function realizarLogin() {
  // Trigger Bootstrap form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.classList.add("was-validated");
  });

  // Check if the form is valid
  if (document.getElementById("loginForm").checkValidity()) {
      const email = document.getElementById("loginEmail").value.trim();
      const senha = document.getElementById("loginPassword").value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const senhaRegex = /^\S{3,}$/;

      if (!emailRegex.test(email)) {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Por favor, insira um email válido.'
          });
          return;
      }

      if (!senhaRegex.test(senha)) {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'A senha deve ter no mínimo 3 caracteres e não deve conter espaços.'
          });
          return;
      }

      // Recuperar o usuário armazenado no localStorage
      const usuario = await apiBuscaUsuario(email);

      // Verificar se o usuário existe e se as credenciais estão corretas
      if (usuario) {
          if (senha === usuario.senha) {
              // Exibir uma mensagem de sucesso
              Swal.fire({
                  icon: 'success',
                  title: 'Sucesso!',
                  text: 'Login bem-sucedido!'
              }).then(() => {
                  localStorage.setItem("authUser", usuario.nome);
                  window.location.href = "index.html"; // Redirecionar o usuário para a página inicial
              });
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Erro!',
                  text: 'Senha incorreta. Por favor, tente novamente.'
              });
          }
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Usuário não encontrado. Por favor, cadastre-se.'
          });
      }
  }
}

window.addEventListener('load', function () {
  // Event listener para o link "Cadastre-se aqui"
  document
      .getElementById("showCadastro")
      .addEventListener("click", function (event) {
          event.preventDefault();
          toggleForms();
      });

  // Event listener para o link "Faça login aqui"
  document
      .getElementById("showLogin")
      .addEventListener("click", function (event) {
          event.preventDefault();
          toggleForms();
      });

  // Event listener para o formulário de login
  document
      .getElementById("loginForm")
      .addEventListener("submit", function (event) {
          event.preventDefault();
          realizarLogin();
      });

  // Event listener para o formulário de cadastro
  document
      .getElementById("cadastroForm")
      .addEventListener("submit", function (event) {
          event.preventDefault();
          cadastrarUsuario();
      });

  // Chamar a função de verificação de login ao carregar a página
  verificarLogin();
});

async function apiCadastraUsuario(novoUsuario) {
  // { nome: nome, email: email, senha: senha }
  const _ = await fetch('http://localhost:3000/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
  });
}

async function apiBuscaUsuario(email) {
  const url = `http://localhost:3000/users?email=${email}`;
  const result = await fetch(url);
  const json = await result.json();
  if (json.length > 0) {
      return json[0];
  }
  return false;
}
