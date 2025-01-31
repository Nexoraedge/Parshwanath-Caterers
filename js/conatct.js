document.getElementById('whatsapp-button').addEventListener('click', function () {
    const phoneNumber = '8619143421'; // Replace with your WhatsApp number
    const message = document.getElementById('whatsapp-message').value || 'Hello Parshwanath Catering, I would like to inquire about your services.'; // Default message if none is provided
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});
