document.addEventListener('DOMContentLoaded', function () {
    verificarLogin();
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
                    }, 5000);
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
});
