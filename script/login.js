// login.js
document.getElementById("formLogin").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    
    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: email, password: password })
        });

        if (!response.ok) throw new Error("Credenciais inválidas");

        const { tokenJWT } = await response.json();
        sessionStorage.setItem("token", tokenJWT);
        window.location.href = "profile.html"; 
        
    } catch (error) {
        console.error("Erro:", error);
        alert(error.message || "Erro ao fazer login");
    }
});