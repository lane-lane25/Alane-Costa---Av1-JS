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

 if (txt === "") { // Verifica se o texto está vazio
    erro.textContent = "A mensagem não pode estar vazia.";
    return false;
  }

  const duplicado = mensagens.some(m => m.texto === txt); // Verifica se já existe uma mensagem com o mesmo texto

  if (duplicado) {
    erro.textContent = "Essa tarefa já existe.";
    return false;
  }

  erro.textContent = ""; // Limpa a mensagem de erro
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

function alternarConcluida(id) { //pra concluir a tarefa
  const msg = mensagens.find(m => m.id === id); 
  msg.concluida = !msg.concluida;
  render();
}

// Função para renderizar a lista
function render() {
  lista.innerHTML = "";

 for (const msg of mensagens) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = msg.texto;

    if (msg.concluida) {
      span.classList.add("done");
    }

    span.addEventListener("click", () => alternarConcluida(msg.id)); //marca como feita

    li.appendChild(span);
    

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

//Função para fazer as flores caírem 
function cairFlores() {
  for (let i = 0; i < 20; i++) {

    const flor = document.createElement("div");
    flor.textContent = "🌸";
    flor.classList.add("flor");

    flor.style.left = Math.random() * window.innerWidth + "px";
    flor.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(flor);

    setTimeout(() => {
      flor.remove();
    }, 5000);
  }
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;

  if (textoDigitado.toLowerCase().includes("jane austen")) {
  cairFlores(); //jane austen é a melhor escritora de todos os tempos, então merece flores caindo na tela
}

  if (!validarTexto(textoDigitado)) {
    return;
  }

  mensagens.push({ // pra pdr concluir a tarefa
  id: proximoId,
  texto: textoDigitado.trim(),
  concluida: false
});

  proximoId++;
  render();

  input.value = "";
});