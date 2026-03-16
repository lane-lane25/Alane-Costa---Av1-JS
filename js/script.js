const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

// "Banco de dados"
let mensagens = [];
let proximoId = 1;

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

// Função para editar
function editar(id) {
  const msg = mensagens.find(m => m.id === id);
  const novoTexto = prompt("Edite a mensagem:", msg.texto);
  
  if (novoTexto !== null && validarTexto(novoTexto)) {
    msg.texto = novoTexto.trim();
    render();
  }
}

// Função para excluir
function excluir(id) {
  if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
    mensagens = mensagens.filter(m => m.id !== id);
    render();
  }
}

// Função para renderizar a lista
function render() {
  lista.innerHTML = "";

  for (const msg of mensagens) {
    const li = document.createElement("li");
    li.textContent = msg.texto;
    
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => editar(msg.id));
    
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => excluir(msg.id));
    
    li.appendChild(botaoEditar);
    li.appendChild(botaoExcluir);
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

  mensagens.push({
    id: proximoId,
    texto: textoDigitado.trim()
  });

  proximoId++;
  render();

  input.value = "";
});