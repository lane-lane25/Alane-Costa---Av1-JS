const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

// "Banco de dados"
let mensagens = [];

// Função para validar texto
function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") {
    erro.textContent = "A mensagem não pode estar vazia.";
    return false;
  }

  erro.textContent = "";
  return true;
}

// Função para renderizar a lista
function render() {
  lista.innerHTML = "";

  for (const msg of mensagens) {
    const li = document.createElement("li");
    li.textContent = msg;
    lista.appendChild(li);
  }
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;

  if (!validarTexto(textoDigitado)) {
    return;
  }

  mensagens.push(textoDigitado.trim());

  render();

  input.value = "";
});