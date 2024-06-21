document.addEventListener("DOMContentLoaded", function () {
    verifyLogin();
    // Endpoint da API para buscar os detalhes do livro
    const apiUrl = "https://gutendex.com/books/";

    // Obtém o ID do livro a partir da string de consulta na URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("id");

    console.log("ID do Livro:", bookId);

    // Busca os detalhes do livro na API
    fetch(apiUrl + bookId)
        .then(response => response.json())
        .then(data => {
            // Atualiza os elementos HTML com os detalhes do livro
            document.getElementById("book-title").textContent = data.title;
            // Verifica se há autores e mostra o primeiro autor
            if (data.authors.length > 0) {
                const authorNameParts = data.authors[0].name.split(", ");
                const authorFormatted = `${authorNameParts[1]} ${authorNameParts[0]}`;
                document.getElementById("author").textContent = "Autor: " + authorFormatted;

            } else {
                document.getElementById("author").textContent = "Autor: Não informado";
            }
            // Verifica se há gêneros e os mostra
            document.getElementById("genres").textContent = "Gêneros: " + (data.subjects.length > 0 ? data.subjects.join(", ") : "Não informado");
            // Verifica se a capa do livro está disponível e atribui ao elemento img
            if (data.formats["image/jpeg"]) {
                document.getElementById("book-cover").src = data.formats["image/jpeg"];
            } else {
                // Caso a capa não esteja disponível, usa uma imagem de espaço reservado
                document.getElementById("book-cover").src = "https://via.placeholder.com/300";
            }

            // Adiciona a funcionalidade aos botões ler agora e baixar
            document.getElementById("read-now").addEventListener("click", function () {
                const readUrl = data.formats["text/html"] || data.formats["text/html; charset=iso-8859-1"];
                if (readUrl) {
                    window.open(readUrl, '_blank');
                } else {
                    alert("Formato de leitura não disponível.");
                }
            });

            document.getElementById("download").addEventListener("click", function () {
                const downloadUrl = data.formats["application/epub+zip"] || data.formats["application/pdf"] || data.formats["application/x-mobipocket-ebook"];
                if (downloadUrl) {
                    window.open(downloadUrl, '_blank');
                } else {
                    alert("Formato de download não disponível.");
                }
            });

        })
        .catch(error => console.error("Erro na Busca:", error));
});
