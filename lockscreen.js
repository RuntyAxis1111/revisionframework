const passwordInput = document.getElementById('password-input');
const unlockButton = document.getElementById('unlock-button');
const errorMessage = document.getElementById('error-message');

const correctPassword = "109040"; // The required password

unlockButton.addEventListener('click', () => {
    checkPassword();
});

passwordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === correctPassword) {
        // Password is correct, redirect to the main page
        window.location.href = '/index.html';
    } else {
        // Incorrect password
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = ''; // Clear the input field
    }
}
