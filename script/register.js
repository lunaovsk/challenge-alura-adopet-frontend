import { validatePassword } from "./validatePassword.js";

function cadastrarUsuario(event) {
    event.preventDefault(); 

    const name = document.getElementById("nome").value.trim();
    const email = document.getElementById("login").value.trim();
    const tel = document.getElementById("telefone").value.trim();
    //const cpf = document.getElementById("cpf").value.trim();
    const uf = document.getElementById("estado").value.trim();
    const city = document.getElementById("cidade").value.trim();
    const password = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmeSenha").value;

    if (!validatePassword(password)) {
        alert("A senha não atende aos requisitos.");
        return;
    }

    if (password !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const usuario = {
        name,
        email,
        tel,
        cpf: "714.379.254-30",
        address: { 
            uf,
            city
        }
    };
    const loginUser = {
        login: email,
        password
    }

    const dadosCompletos = {
        registerDTO: usuario,
        authData: loginUser
    }

    fetch("http://localhost:8080/create-account", {
        method: "POST",
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCompletos)
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject('Erro na requisição: ' + response.statusText);
        }
        return response.text();
    })
    .then(message => {
        alert(message || "Conta criada com sucesso!");
        window.location.href = "/pages/login.html";
    })
    .catch(error => {
        alert("Erro ao cadastrar: " + error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    if (form) {
        form.addEventListener("submit", cadastrarUsuario);
    }
});