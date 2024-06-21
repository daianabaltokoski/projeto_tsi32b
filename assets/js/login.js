// Função para alternar entre os formulários de login e cadastro
function toggleForms() {
    const loginForm = document.getElementById("loginFormContainer");
    const registrationForm = document.getElementById("registrationFormContainer");

    loginForm.style.display =
        loginForm.style.display === "none" ? "block" : "none";
    registrationForm.style.display =
        registrationForm.style.display === "none" ? "block" : "none";
    
    // Preencher o e-mail no formulário de login se estiver disponível no localStorage
    if (loginForm.style.display === "block") {
        const email = localStorage.getItem('emailCadastro');
        if (email) {
            document.getElementById("loginEmail").value = email;
        }
    }
}

// Função para cadastrar um novo usuário
async function cadastrarUsuario() {
    // Trigger Bootstrap form validation
    const forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.classList.add("was-validated");
    });

    // Check if the form is valid
    if (document.getElementById("registrationForm").checkValidity()) {
        const nome = document.getElementById("registrationName").value.trim();
        const email = document.getElementById("registrationEmail").value.trim();
        const senha = document.getElementById("registrationPassword").value.trim();

        const nameRegex = /^[a-zA-Z\u00C0-\u017F\s]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^\S{3,}$/;

        if (!nameRegex.test(nome)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Por favor, insira um nome válido com no mínimo 3 caracteres (apenas letras e espaços).'
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

        const novoUsuario = { nome: nome, email: email, senha: senha };

        try {
            const response = await apiCadastraUsuario(novoUsuario);
            if (response.ok) {
                // Salvar o e-mail no localStorage
                localStorage.setItem('emailCadastro', email);

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso!'
                }).then(() => {
                    toggleForms(); // Alternar para o formulário de login após o cadastro
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Falha ao cadastrar usuário. Tente novamente mais tarde.'
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao cadastrar usuário. Verifique sua conexão com a internet.'
            });
        }
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

        try {
            const usuario = await apiBuscaUsuario(email);

            if (usuario) {
                if (senha === usuario.senha) {
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
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao tentar realizar login. Verifique sua conexão com a internet.'
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
        .getElementById("registrationForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            cadastrarUsuario();
        });

    // Preencher o e-mail no formulário de login se estiver disponível no localStorage ao carregar a página
    const email = localStorage.getItem('emailCadastro');
    if (email) {
        document.getElementById("loginEmail").value = email;
    }

    // Chamar a função de verificação de login ao carregar a página
    verifyLogin();
});

async function apiCadastraUsuario(novoUsuario) {
    const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
    });
    return response;
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
