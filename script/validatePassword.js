export function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordRegex.test(password);
}

const passwordInput = document.getElementById("senha");
const feedback = document.getElementById("passwordFeedback");


function validatePasswordInput() {
    const password = passwordInput.value;

    if (validatePassword(password)) {
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
        feedback.textContent = '';
       
    } else {
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
        feedback.textContent = 'A senha deve ter pelo menos 12 caracteres, incluir uma letra maiúscula, uma minúscula, um número e um caractere especial.';
    }
}

passwordInput.addEventListener("input", validatePasswordInput);
document.getElementById('formCadastro').addEventListener('submit', function (e) {
    if (!validatePassword(passwordInput.value)) {
      e.preventDefault();
      feedback.textContent = 'Por favor, corrija a senha antes de enviar.';
    }
});
