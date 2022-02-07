let qtdDeCartas = 0;
let numeroValido = false;

let acertos = 0;
let jogadas = 0;

let tempoDeJogo = 0;
let idIntervalo = undefined;

let primeiraCarta;
let segundaCarta;

function aumentarContador() {
  const spanContador = document.querySelector('.contador span');
  tempoDeJogo++;
  spanContador.innerHTML = tempoDeJogo;
}

function desvirarCartas() {
  primeiraCarta.classList.remove('virada');
  segundaCarta.classList.remove('virada');
  primeiraCarta = undefined;
  segundaCarta = undefined;
}

function virarCarta(cartaSelecionada) {
  if (cartaSelecionada.classList.contains("virada")) {
    return;
  }

  if (primeiraCarta !== undefined) {
    if (segundaCarta !== undefined) {
      return;
    }
  }

  jogadas++;
  cartaSelecionada.classList.add('virada');

  const ehPrimeiraCarta = primeiraCarta === undefined;
  if (ehPrimeiraCarta) {
    primeiraCarta = cartaSelecionada;

    if (idIntervalo === undefined) {
      idIntervalo = setInterval(aumentarContador, 1000);
    }

    return;
  }

  segundaCarta = cartaSelecionada;

  const cartasSaoDiferentes = primeiraCarta.innerHTML !== segundaCarta.innerHTML;
  if (cartasSaoDiferentes) {
    setTimeout(desvirarCartas, 1000);
    return;
  }

  primeiraCarta = undefined;
  segundaCarta = undefined;
  acertos++;
  checarFimDeJogo();
}

function finalizarJogo() {
  alert(`Você ganhou em ${jogadas} jogadas e em ${tempoDeJogo} segundos!`);

  const resposta = prompt('Quer jogar novamente? (s ou n)');

  if (resposta === 's') {
    qtdDeCartas = prompt("Quantas cartas você deseja? (números pares de 4 á 14)");
    const spanContador = document.querySelector('.contador span');
    spanContador.innerHTML = 0;
    acertos = 0;
    carregarPagina();
  } else {
    document.location.reload(true);
  }
}

function checarFimDeJogo() {
  const qtdDePares = qtdDeCartas / 2;

  if (acertos === qtdDePares) {
    setTimeout(finalizarJogo, 500);
  }
}

function ordenacaoAleatoria() {
  return Math.random() - 0.5;
}

const cartas = [
  "./assets/img/bobrossparrot.gif",
  "./assets/img/explodyparrot.gif",
  "./assets/img/fiestaparrot.gif",
  "./assets/img/metalparrot.gif",
  "./assets/img/revertitparrot.gif",
  "./assets/img/tripletsparrot.gif",
  "./assets/img/unicornparrot.gif",
];


function carregarPagina() {
  clearInterval(idIntervalo);
  idIntervalo = undefined;
  tempoDeJogo = 0;

  while (numeroValido === false) {
    qtdDeCartas = prompt("Quantas cartas você deseja? (números pares de 4 á 14)");
    const numeroPar = qtdDeCartas % 2 === 0;

    if (numeroPar) {
      if (qtdDeCartas > 3 && qtdDeCartas <15) {
          numeroValido = true;
      }
    }
  }

  let cartasSorteadas = cartas.sort(ordenacaoAleatoria);
  let disposicaoDeCartas = [];

  const ulTabuleiro = document.querySelector('.mesaDeCartas');
  for (let i = 0; i < qtdDeCartas / 2; i++) {
    const cartaSelecionada = cartasSorteadas[i];

    // par de cartas
    disposicaoDeCartas.push(cartaSelecionada);
    disposicaoDeCartas.push(cartaSelecionada);
  }

  disposicaoDeCartas = disposicaoDeCartas.sort(ordenacaoAleatoria);

  ulTabuleiro.innerHTML = '';
  for (let i = 0; i < disposicaoDeCartas.length; i++) {
    ulTabuleiro.innerHTML += `
      <li class="carta" onclick="virarCarta(this)" data-identifier="card">
        <div class='front-face face' data-identifier="front-face">
          <img src='./assets/img/front.png'>
        </div>
        <div class='back-face face' data-identifier="back-face">
          <img src='${disposicaoDeCartas[i]}'>
        </div>
      </li>
    `;
  }
}

carregarPagina();
