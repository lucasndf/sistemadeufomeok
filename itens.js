let quentinhaAtual = [];

// é proteína?
function isProteina(item) {
  return Object.values(cardapio).some(dia => dia.proteinas.includes(item));
}

// adicionar item na quentinha atual
function addItem(item, tipo) {
  const tamanho = document.getElementById("tamanho").value;
  const limite = tamanho === "P" ? 2 : 3;

  if (tipo === "proteina") {
    const qtdProteinas = quentinhaAtual.filter(isProteina).length;

    if (qtdProteinas >= limite) {
      alert(`Quentinha ${tamanho} só pode ter ${limite} proteínas.`);
      return;
    }
  }

  quentinhaAtual.push(item);
  renderSelecionados();
}

// ajustar limite ao trocar de tamanho
function ajustarLimiteAoTrocarTamanho() {
  const tamanho = document.getElementById("tamanho").value;
  const limite = tamanho === "P" ? 2 : 3;

  let proteinas = quentinhaAtual.filter(isProteina);

  if (proteinas.length > limite) {
    const remover = proteinas.length - limite;

    for (let i = 0; i < remover; i++) {
      const prot = proteinas.pop();
      const idx = quentinhaAtual.indexOf(prot);
      quentinhaAtual.splice(idx, 1);
    }

    alert(`Agora a quentinha ${tamanho} só pode ter ${limite} proteínas. Ajustamos automaticamente.`);
    renderSelecionados();
  }
}

// render chips dos itens selecionados
function renderSelecionados() {
  const el = document.getElementById('chipsSelecionados');

  if (quentinhaAtual.length === 0) {
    el.innerHTML = '<span class="muted">Nenhum item selecionado ainda.</span>';
    return;
  }

  el.innerHTML = quentinhaAtual
    .map((item, i) =>
      `<span class="chip">${item}<span class="x" onclick="removerItemAtual(${i})">×</span></span>`
    ).join('');
}

function removerItemAtual(i) {
  quentinhaAtual.splice(i, 1);
  renderSelecionados();
}

function limparQuentinhaAtual() {
  quentinhaAtual = [];
  renderSelecionados();
}
