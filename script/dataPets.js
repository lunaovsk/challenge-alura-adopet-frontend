async function buscarPets(page = 1) {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        alert("Modo desenvolvimento: exibindo pets estáticos");
        return; 
    }

    try {
        const response = await fetch(`http://localhost:8080/pets?page=${page-1}&size=9`, {
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

        if (!response.ok) throw new Error("Erro ao carregar pets");

        const data = await response.json();
        document.querySelectorAll('[dataExamplePet]').forEach(el => el.remove());
        
        preencherPets(data.content);
        configurarPaginacao(data.totalPages, page);
        
    } catch (error) {
        console.error("Erro:", error);
    }
}

function preencherPets(pets) {
    const container = document.getElementById("petsContainer");
    
    pets.forEach(pet => {
        const petHTML = `
            <div class="feedPets">
                <img src="${pet.imagem || '/asheet/pets/default.png'}" 
                     alt="Foto de ${pet.nome}" 
                     class="imgPet">
                <div class="infosPet">
                    <input type="text" class="petInfoInput petInfoInputName" 
                           value="${pet.nome}" readonly>
                    <input type="text" class="petInfoInput" 
                           value="${pet.idade}" readonly>
                    <input type="text" class="petInfoInput" 
                           value="${pet.porte}" readonly>
                    <input type="text" class="petInfoInput petInfoInputTipo" 
                           value="${pet.temperamento}" readonly>
                    <div class="contato">
                        <input type="text" class="petInfoInput" 
                               value="${pet.ong.address.cidade}" readonly>
                        <input type="text" class="petInfoInput" 
                               value="(${pet.ong.address.estado})" readonly>
                    </div>
                    <div class="contato">
                        <img class="iconeMsn" src="/asheet/ícone mensagem.svg" alt="">
                        <a class="enviarMsn" href="/pages/msn.html?id=${pet.id}">
                            Falar com responsável
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', petHTML);
    });
}

function configurarPaginacao(totalPages, currentPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = '';

    if (totalPages <= 1) return;
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&laquo; Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => buscarPets(currentPage - 1));
    pagination.appendChild(prevBtn);
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages/2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.textContent = '1';
        firstBtn.addEventListener('click', () => buscarPets(1));
        pagination.appendChild(firstBtn);
        if (startPage > 2) pagination.appendChild(createEllipsis());
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.addEventListener('click', () => buscarPets(i));
        pagination.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pagination.appendChild(createEllipsis());
        const lastBtn = document.createElement('button');
        lastBtn.textContent = totalPages;
        lastBtn.addEventListener('click', () => buscarPets(totalPages));
        pagination.appendChild(lastBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = 'Próximo &raquo;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => buscarPets(currentPage + 1));
    pagination.appendChild(nextBtn);
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.style.padding = '0 5px';
    return ellipsis;
}
document.addEventListener("DOMContentLoaded", () => buscarPets(1));