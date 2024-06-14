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
