const taxasEntrega = {
  "Ana Leite": 8, "Alto da Tubiba": 8, "B. Vitória": 7, "Bela Vista": 7, "Belo Horizonte": 7,
  "Bivar Olinto": 7, "Brasília": 6, "Centro": 6, "Condomínio dos Portugueses": 8,
  "Condomínio Vilas do Lago": 7, "Conjunto Geralda Medeiros": 7, "Conjunto Itatiunga": 8,
  "Conjunto José Mariz": 6, "Cruz da Menina": 8, "Distrito industrial": 8, "Dona milindra": 7,
  "Estados": 8, "Geraldo Carvalho": 7, "Jardim Brasil": 7, "Jardim Califórnia": 6,
  "Jardim Colonial": 8, "Jardim Europa": 8, "Jardim Guanabara": 6, "Jardim Lacerda": 6,
  "Jardim Magnólia": 8, "Jardim Queiroz": 7, "Jardim Redenção": 6, "Jardim Santa Teresa": 8,
  "Jatobá": 7, "Juá Doce": 7, "Liberdade": 6, "Loteamento Campestre": 6,
  "Loteamento Luar do Angelita": 7, "Loteamento Ridete": 7, "Luar Carmem Leda": 8,
  "Matadouro": 8, "Maternidade": 6, "Monte Castelo": 7, "Morada do Sol": 7,
  "Morro": 6, "Mutirão": 7, "Nóe Trajano": 8, "Nova Brasília": 7,
  "Nova Conquista": 7, "Novo Horizonte": 7, "Placas": 7, "Sapateiros": 7,
  "Salgadinho": 7, "Santa Cecília": 7, "Santa Clara": 7, "Santo Antônio": 6,
  "São Judas": 8, "São Sebastião": 7, "Sete Casas": 8, "Vila Cavalcante": 7,
  "Vila Mariana": 8, "Vila Teimosa": 7, "Vista da Serra": 7
};

const PRECO_P = 10;
const PRECO_G = 15;
let quentinhaAtual = [];
let pedido = [];

/* ====== Cardápio por dia ====== */
const cardapio = {
  segunda: {
    acompanhamentos: ['Arroz branco', 'Arroz de Leite', 'Feijão preto', 'Feijão na farofa', 'Macarrão espaguete (molho de tomate)'],
    proteinas: ['Frango ao molho', 'Fígado acebolado', 'Linguiça mista'],
    saladas: ['Purê de macaxeira', 'Vinagrete', 'Batata doce']
  },
  terca: {
    acompanhamentos: ['Arroz Refogado', 'Arroz de Leite', 'Feijão na farofa', 'Feijão no caldo', 'Macarrão espaguete (alho e óleo)'],
    proteinas: ['Carne guisada', 'Linguiça mista', 'Frango assado'],
    saladas: ['Purê de macaxeira', 'Salada', 'Batata doce']
  },
  quarta: {
    acompanhamentos: ['Arroz branco', 'Arroz de Leite', 'Feijão no caldo', 'Feijão na farofa', 'Macarrão espaguete (molho de tomate)'],
    proteinas: ['Fígado e moela', 'Frango assado', 'Linguiça mista'],
    saladas: ['Purê de macaxeira', 'Vinagrete', 'Batata doce']
  },
  quinta: {
    acompanhamentos: ['Arroz Refogado', 'Arroz de Leite', 'Feijão na farofa', 'Feijão no caldo', 'Macarrão espaguete (alho e óleo)'],
    proteinas: ['Porco ao molho', 'Linguiça mista', 'Frango assado'],
    saladas: ['Purê de macaxeira', 'Salada', 'Batata doce']
  },
  sexta: {
    acompanhamentos: ['Arroz branco', 'Arroz de Leite', 'Feijão preto', 'Feijão na farofa', 'Macarrão espaguete (molho de tomate)'],
    proteinas: ['Galinha ao molho', 'Frango assado', 'Linguiça mista'],
    saladas: ['Purê de macaxeira', 'Vinagrete', 'Batata doce']
  },
  sabado: {
    acompanhamentos: ['Arrubacão', 'Arroz refogado', 'Feijão no caldo', 'Feijão na Farofa', 'Macarrão espaguete (alho e óleo)'],
    proteinas: ['Carne de sol (na nata)', 'Linguiça mista', 'Frango assado'],
    saladas: ['Batata doce', 'Vinagrete']
  }
};

/* ====== Utilitários ====== */
const fmt = n => (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function isProteina(item) {
  return Object.values(cardapio).some(dia => dia.proteinas.includes(item));
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1600);
}

/* ====== Renderização do cardápio ====== */
function atualizarMenu() {
  const dia = document.getElementById('dia').value;
  const a = document.getElementById('menuAcompanhamentos');
  const p = document.getElementById('menuProteinas');
  const s = document.getElementById('menuSaladas');
  a.innerHTML = p.innerHTML = s.innerHTML = '';

  cardapio[dia].acompanhamentos.forEach(item => {
    a.innerHTML += `<button onclick="addItem('${item}', 'outro')">${item}</button>`;
  });
  cardapio[dia].proteinas.forEach(item => {
    p.innerHTML += `<button onclick="addItem('${item}', 'proteina')">${item}</button>`;
  });
  cardapio[dia].saladas.forEach(item => {
    s.innerHTML += `<button onclick="addItem('${item}', 'outro')">${item}</button>`;
  });

  quentinhaAtual = [];
  renderSelecionados();
}

function renderSelecionados() {
  const el = document.getElementById('chipsSelecionados');
  if (quentinhaAtual.length === 0) {
    el.innerHTML = '<span class="muted">Nenhum item selecionado ainda.</span>';
    return;
  }
  el.innerHTML = quentinhaAtual.map((item, idx) =>
    `<span class="chip">${item}<span class="x" onclick="removerItemAtual(${idx})">×</span></span>`
  ).join('');
}

function addItem(item, tipo) {
  if (tipo === 'proteina') {
    const tam = document.getElementById('tamanho').value;
    const max = tam === 'P' ? 2 : 3;
    const qtdProteinas = quentinhaAtual.filter(isProteina).length;
    if (!quentinhaAtual.includes(item) && qtdProteinas >= max) {
      alert(`Quentinha ${tam} só pode ter ${max} proteínas.`);
      return;
    }
  }
  quentinhaAtual.push(item);
  renderSelecionados();
}

function removerItemAtual(idx) {
  quentinhaAtual.splice(idx, 1);
  renderSelecionados();
}

function limparQuentinhaAtual() {
  quentinhaAtual = [];
  renderSelecionados();
}

/* ====== Comanda ====== */
function adicionarQuentinha() {
  if (quentinhaAtual.length === 0) return alert('Adicione itens à quentinha antes.');

  const tam = document.getElementById('tamanho').value;
  const max = tam === 'P' ? 2 : 3;
  const qtdProteinas = quentinhaAtual.filter(isProteina).length;

  if (qtdProteinas > max) {
    alert(`Quentinha ${tam} só pode ter ${max} proteínas.`);
    return;
  }

  pedido.push({ tamanho: tam, itens: [...quentinhaAtual] });
  quentinhaAtual = [];
  renderSelecionados();
  renderPedido();
  toast('✅ Quentinha adicionada à comanda!');
}

function renderPedido() {
  const tbody = document.querySelector('#pedidoTabela tbody');
  tbody.innerHTML = '';
  pedido.forEach((q, i) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${q.tamanho}</strong></td>
        <td>${q.itens.join(', ')}</td>
        <td>
          <button class="btn-secondary" onclick="removerQuentinha(${i})">Remover</button>
          <button class="btn-ghost" onclick="duplicarQuentinha(${i})">+</button>
        </td>
      </tr>
    `;
  });
}

function removerQuentinha(i) {
  pedido.splice(i, 1);
  renderPedido();
}

function duplicarQuentinha(i) {
  const quentinhaDuplicada = { tamanho: pedido[i].tamanho, itens: [...pedido[i].itens] };
  pedido.push(quentinhaDuplicada);
  renderPedido();
  toast('🔁 Quentinha duplicada com sucesso!');
}

/* ====== Entrega / Pagamento ====== */
function toggleEndereco() {
  const val = document.getElementById('tipoEntrega').value;
  document.getElementById('bairroWrap').style.display = val === 'entrega' ? 'block' : 'none';
}

function toggleTroco() {
  const val = document.getElementById('pagamento').value;
  document.getElementById('trocoWrap').style.display = val === 'dinheiro' ? 'block' : 'none';
}

/* ====== Impressão ====== */
function imprimirPedido() {
  if (pedido.length === 0) return alert('Adicione ao menos uma quentinha na comanda.');

  const cliente = document.getElementById('cliente').value || 'Não informado';
  const pagamento = document.getElementById('pagamento').value;
  const trocoParaStr = document.getElementById('trocoPara').value?.replace(',', '.') || '';
  const trocoPara = parseFloat(trocoParaStr);
  const status = document.getElementById('statusPago').value;
  const entrega = document.getElementById('tipoEntrega').value;
  const bairro = document.getElementById('bairro').value;
  const obs = document.getElementById('observacoes').value?.trim() || '';
  const dataHora = new Date().toLocaleString('pt-BR');

  let total = 0;
  let blocoQuentinhas = '';
  pedido.forEach((q, i) => {
    const preco = q.tamanho === 'P' ? PRECO_P : PRECO_G;
    total += preco;
    const itens = q.itens.map(x => `• ${x}`).join('<br>');
    blocoQuentinhas += `
      <div style="margin:8px 0 14px">
        <strong>Quentinha ${i + 1} (${q.tamanho}) — ${fmt(preco)}:</strong><br>${itens}
      </div>
    `;
  });

  let taxaEntrega = 0;
  let entregaHTML = '';
  if (entrega === 'entrega' && bairro) {
    taxaEntrega = taxasEntrega[bairro] || 0;
    total += taxaEntrega;
    entregaHTML = `<p><strong>Entrega:</strong> ${bairro} — ${fmt(taxaEntrega)}</p>`;
  }

  let pagamentoHTML = `<p><strong>Pagamento:</strong> ${pagamento.toUpperCase()}</p>`;
  let trocoHTML = '';
  if (pagamento === 'dinheiro' && !isNaN(trocoPara) && trocoPara > 0) {
    pagamentoHTML += `<p><strong>Troco para:</strong> ${fmt(trocoPara)}</p>`;
    const troco = trocoPara - total;
    trocoHTML = `<p><strong>Troco:</strong> ${fmt(troco)}</p>`;
  }

  const statusHTML = `<p><strong>Status:</strong> ${status === 'sim' ? 'Pago' : 'Não Pago'}</p>`;

  const html = `
    <div style="font-family:Segoe UI, sans-serif; padding:10px 14px; line-height:1.4">
      <h2 style="color:#FF6600">Pedido — ${cliente}</h2>
      <p><strong>Data/Hora:</strong> ${dataHora}</p>
      ${pagamentoHTML}
      ${statusHTML}
      ${entregaHTML}
      <hr style="margin:12px 0">
      ${blocoQuentinhas}
      ${obs ? `<p><strong>Observações:</strong> ${obs}</p>` : ''}
      <hr style="margin:12px 0">
      <p><strong>Total:</strong> ${fmt(total)}</p>
      ${trocoHTML}
    </div>
  `;

  const janela = window.open('', '', 'width=700,height=700');
  janela.document.write(`<html><head><title>Impressão</title><meta charset="utf-8"></head><body>${html}</body></html>`);
  janela.document.close();
  janela.print();

  // reset após imprimir
  pedido = [];
  quentinhaAtual = [];
  renderPedido();
  renderSelecionados();
  document.getElementById('cliente').value = '';
  document.getElementById('observacoes').value = '';
}

/* ====== Dia automático ====== */
function definirDiaAtual() {
  const hoje = new Date().getDay(); // 0=domingo ... 6=sábado
  const map = ['segunda','segunda','terca','quarta','quinta','sexta','sabado']; // domingo => segunda
  document.getElementById('dia').value = map[hoje] || 'segunda';
  atualizarMenu();
}

// Inicializa ao carregar
window.addEventListener('DOMContentLoaded', () => {
  definirDiaAtual();
});