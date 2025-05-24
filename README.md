# 🐾 AdoPet - Plataforma de Adoção de Animais  

**🔗 Acesse aqui:** [AdoPet]([https://luna15-br.github.io/AdoPet/index.html](https://challenge-alura-adopet-frontend.vercel.app/index.html))

---

## 📖 Visão Geral  

AdoPet é uma plataforma web que conecta adotantes a ONGs e tutores de animais. Desenvolvida com **HTML**, **CSS** e **JavaScript puro**, tem foco em **simplicidade**, **usabilidade** e **boas práticas de desenvolvimento front-end**.

---

## ✨ Funcionalidades  

### 🐕 Feed de Pets  
- Listagem de animais disponíveis com paginação  
- Dados mockados prontos para futura API  
- Contato direto com os tutores  

### 👤 Perfil do Usuário  
- Edição de dados pessoais  
- Upload de imagem de perfil (apenas visual, sem backend)  
- Visualização de informações básicas  

### 🔐 Autenticação  
- Cadastro e login com validação de formulários  
- Armazenamento de token JWT no `sessionStorage`  
- Redirecionamento automático se não autenticado  

---

## 🎨 Design System  

### 🎨 Paleta de Cores  
| Cor            | Hex        | Uso                      |  
|----------------|------------|---------------------------|  
| Azul Principal | `#3772FF`  | Fundo e elementos de UI   |  
| Coral          | `#FC7071`  | Botões e destaques        |  
| Verde Água     | `#36D6AD`  | Elementos secundários     |  
| Branco         | `#FFFFFF`  | Textos e fundos claros    |  

### ✒️ Tipografia  
- **Fonte Principal:** `Poppins`  
- Pesos: 400 (Regular), 500 (Médio), 700 (Negrito)

---

## 🛠️ Tecnologias Utilizadas  

- **HTML5** – Estrutura semântica  
- **CSS3** – Grid, Flexbox, variáveis, responsividade básica  
- **JavaScript (Vanilla)** – Lógica da aplicação e manipulação do DOM  
- **LocalStorage / SessionStorage** – Armazenamento no navegador  
- **JWT** – Autenticação e controle de sessão  
- **Git + GitHub Pages** – Versionamento e hospedagem  

---

## 📌 Estado Atual do Projeto

### ✅ Concluído  

- Frontend completo com páginas principais: `Home`, `Login`, `Cadastro`, `Perfil`, `Feed`  
- Autenticação funcional com redirecionamento  
- Layout modularizado (header, footer, formulários)  
- Código limpo e organizado: HTML, CSS e JS separados  
- Modularização de JS (ex: `login.js`, `dataProfile.js`)  
- Responsividade parcial implementada  

### ⚠️ A Melhorar  

#### Integração com Backend  
- Endpoints definidos (`/create-account`, `/login`), mas não operacionais  
- Falta validação de retorno e tratamento de erros  
- Senhas trafegam sem HTTPS  

#### Funcionalidades Incompletas  
- Página de mensagens não entregue  
- Sistema de favoritos não implementado  
- Filtros e busca no feed ausentes  

#### Problemas de UX/UI  
- Cards do feed quebram em telas menores  
- Formulários com validação pouco clara  
- Drop-down de estado e campo cidade sem sincronia  
- Paginação precisa de estilo visual  

#### Segurança  
- Armazenamento de JWT em `sessionStorage` (vulnerável a XSS)  
- Senhas em texto plano nas requisições (sem hash)

#### Responsividade  
- Páginas como `profile.html` e `feed.html` mal adaptadas para mobile  

---

## 🧪 Exemplo de Código Problemático

```js
// login.js
fetch("http://localhost:8080/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ login: email, password: password })
})
.then(response => {
  if (!response.ok) throw new Error("Credenciais inválidas");
});
```
---

Desenvolvido por Matheus Luna
© 2025 - Projeto desenvolvido como desafio da Alura
