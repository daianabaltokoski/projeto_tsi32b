document.addEventListener('DOMContentLoaded', function () {
    const donationForm = document.getElementById('donationForm');
    const openModalButton = document.getElementById('openModal');
    const choosePaymentMethodButton = document.getElementById('choosePaymentMethod');
    const paymentMethodSection = document.getElementById('paymentMethodSection');
    const successBanner = document.getElementById('successBanner');
    const confirmDonationButton = document.getElementById('confirmDonation');

    choosePaymentMethodButton.addEventListener('click', function () {
        paymentMethodSection.style.display = 'block';
        choosePaymentMethodButton.style.display = 'none';
    });

    openModalButton.addEventListener('click', function () {
        const selectedAmount = donationForm.querySelector('input[name="donationAmount"]:checked');
        const selectedPaymentMethod = donationForm.querySelector('input[name="paymentMethod"]:checked');
        const donorName = document.getElementById('donorName').value.trim();
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(donorName)) {
            alert('Por favor, insira um nome válido (apenas letras e espaços).');
            return;
        }

        if (selectedAmount && selectedPaymentMethod) {
            const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
            confirmationModal.show();
        } else {
            alert('Por favor, selecione um valor de doação e um meio de pagamento.');
        }
    });

    confirmDonationButton.addEventListener('click', function () {
        const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
        confirmationModal.hide();

        successBanner.style.display = 'block';

        setTimeout(function() {
            successBanner.style.display = 'none';
        }, 5000);
    });

    donationForm.addEventListener('change', function () {
        openModalButton.disabled = !donationForm.querySelector('input[name="donationAmount"]:checked');
    });

    paymentMethodSection.addEventListener('change', function () {
        openModalButton.disabled = !donationForm.querySelector('input[name="paymentMethod"]:checked');
    });
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
