let paginaAtual = 0;

window.addEventListener('load', function () {
  console.log('index.js')
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio do formulário padrão

      var searchTerm = document.getElementById("search-input").value.trim();
      if (searchTerm) {
        window.location.href = `pesquisar.html?q=${encodeURIComponent(
          searchTerm
        )}`;
      }
    });

  // Executar a função "carregar" quando a página já estiver carregada
  document.addEventListener("DOMContentLoaded", carregar);

  verificarLogin();
  carregar();
});

// função para carregar ebooks
async function carregar() {
  paginaAtual++;
  const response = await fetch(
    `https://gutendex.com/books/?languages=pt&page=${paginaAtual}`
  );
  const data = await response.json();

  // total de ebooks no catálogo
  const total = data.count;
  // todos os ebooks que foram carregados, máximo de 32 por vez
  const results = data.results;
  for (const ebook of results) {
    addEbook(ebook);
  }
}

// função para adicionar um ebook ao DOM
function addEbook(ebook) {
  const { title, authors, formats } = ebook;
  const authorName =
    authors.length > 0 ? authors[0].name : "Autor não informado";
  const coverImage =
    formats["image/jpeg"] ||
    "https://placehold.co/230x260/afc/ccc?text=Capa%20do%20Livro";
  const bookLink = formats["text/html"] || "#";

  const cardHtml = `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <a href="detalhes.html?id=${ebook.id}"> 
                    <img src="${coverImage}" class="card-img-top" alt="Capa do Livro">
                </a>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text mb-auto">${authorName}</p>
                    <a href="detalhes.html?id=${ebook.id}" class="btn btn-primary mt-auto">Detalhes</a> 
                </div>
            </div>
        </div>
    `;

  // Adiciona o card ao contêiner de cards
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML += cardHtml;
}
