document.addEventListener("DOMContentLoaded", () => {
    const inputUpload = document.getElementById("imageUpload");
    const imgPerfil = document.querySelector(".imgPerfil");

    function lerConteudoArquivo(arquivo) {
        return new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => resolve(leitor.result);
            leitor.onerror = () => reject(`Erro ao ler o arquivo ${arquivo.name}`);
            leitor.readAsDataURL(arquivo);
        });
    }

    inputUpload.addEventListener("change", async (evento) => {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            try {
                const imagemBase64 = await lerConteudoArquivo(arquivo);
                imgPerfil.src = imagemBase64;
            } catch (error) {
                console.error("Erro ao carregar a imagem:", error);
            }
        }
    });
});
