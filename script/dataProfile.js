async function buscarDados() {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/account/me", {
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (response.status === 401) {
            sessionStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) throw new Error("Erro ao carregar perfil");

        const data = await response.json();
        preencherPerfil(data);
        setupEditButton();
    } catch (error) {
        console.error("Erro:", error);
        alert(error.message);
    }
}
function preencherPerfil(data) {
    document.getElementById("nomePerfil").value = data.name || "";
    document.getElementById("telPerfil").value = data.tel || "";
    document.getElementById("cidadePerfil").value = data.uf || "";
    document.getElementById("estadoPerfil").value = data.city || "";
    document.getElementById("aboutProfile").value = data.descricao || "";
    if (data.profileImage) {
        document.getElementById("profileImage").src = data.profileImage;
    }
}

function setupEditButton() {
    const editButton = document.getElementById("editButton");
    const inputs = document.querySelectorAll("#formProfile input, #formProfile textarea");
    
    editButton.addEventListener("click", () => {
        const isEditing = editButton.textContent === "Editar";
        
        inputs.forEach(input => {
            input.readOnly = !isEditing;
        });
        
        editButton.textContent = isEditing ? "Salvar" : "Editar";
        editButton.classList.toggle("saveMode", isEditing);
        
        if (!isEditing) {
            salvarAlteracoes();
        }
    });
}

async function salvarAlteracoes() {
    try {
        const response = await fetch("http://localhost:8080/account/me", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("nomePerfil").value,
                tel: document.getElementById("telPerfil").value,
                address: {
                    uf: document.getElementById("estadoPerfil").value,
                    city: document.getElementById("cidadePerfil").value
                },
                descricao: document.getElementById("aboutProfile").value
            })
        });
        
        if (!response.ok) throw new Error("Erro ao salvar");
        
        alert("Perfil atualizado com sucesso!");
    } catch (error) {
        console.error("Erro:", error);
        alert("Falha ao salvar: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", buscarDados);