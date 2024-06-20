document.addEventListener('DOMContentLoaded', function () {
    verificarLogin();
    const donationForm = document.getElementById('donationForm');
    const openModalButton = document.getElementById('openModal');
    const choosePaymentMethodButton = document.getElementById('choosePaymentMethod');
    const paymentMethodSection = document.getElementById('paymentMethodSection');
    const successBanner = document.getElementById('successBanner');
    const donorNameInput = document.getElementById('donorName');

    $(document).ready(function() {
        $('#customAmount').mask('000.000.000.000.000,00', { reverse: true });
    });
    

    // Recupera dados do localStorage e preenche o formulário
    function recuperarDadosDoacao() {
        const dadosDoacaoSalvos = JSON.parse(localStorage.getItem('dadosDoacao'));
        if (dadosDoacaoSalvos) {
            donorNameInput.value = dadosDoacaoSalvos.donorName;
            const donationAmount = donationForm.querySelector(`input[name="donationAmount"][value="${dadosDoacaoSalvos.donationAmount}"]`);
            if (donationAmount) {
                donationAmount.checked = true;
            }
        }
    }

    // Salva dados no localStorage
    function salvarDadosDoacao(dadosDoacao) {
        localStorage.setItem('dadosDoacao', JSON.stringify(dadosDoacao));
    }

    // Configurações e eventos do formulário
    choosePaymentMethodButton.addEventListener('click', function () {
        paymentMethodSection.style.display = 'block';
        choosePaymentMethodButton.style.display = 'none';
    });

    openModalButton.addEventListener('click', function () {
        const selectedAmount = donationForm.querySelector('input[name="donationAmount"]:checked');
        const selectedPaymentMethod = donationForm.querySelector('input[name="paymentMethod"]:checked');
        const donorName = donorNameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(donorName)) {
            alert('Por favor, insira um nome válido (apenas letras e espaços).');
            return;
        }

        if (selectedAmount && selectedPaymentMethod) {
            // Configuração do SweetAlert2
            Swal.fire({
                title: "<strong>Confirmar Doação</strong>",
                icon: "info",
                html: `
                    Você está prestes a fazer uma doação. Deseja continuar?
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `
                    Confirmar
                `,
                confirmButtonAriaLabel: "Confirmar doação",
                cancelButtonText: `
                    Cancelar
                `,
                cancelButtonAriaLabel: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Ação após confirmação
                    successBanner.style.display = 'block';
                    setTimeout(function () {
                        successBanner.style.display = 'none';
                    }, 10000);

                    // Salva os dados no localStorage
                    const dadosDoacao = {
                        donorName: donorName,
                        donationAmount: selectedAmount.value,
                        paymentMethod: selectedPaymentMethod.value
                    };
                    salvarDadosDoacao(dadosDoacao);
                }
            });
        } else {
            alert('Por favor, selecione um valor de doação e um meio de pagamento.');
        }
    });

    donationForm.addEventListener('change', function () {
        openModalButton.disabled = !donationForm.querySelector('input[name="donationAmount"]:checked');
    });

    paymentMethodSection.addEventListener('change', function () {
        openModalButton.disabled = !donationForm.querySelector('input[name="paymentMethod"]:checked');
    });

    // Recupera os dados do localStorage ao carregar a página
    recuperarDadosDoacao();
});
