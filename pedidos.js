// =========================
// CONFIGURAÇÕES
// =========================
const PRECO_P = 10;
const PRECO_G = 15;

let pedido = [];

const fmt = n => (n ?? 0).toLocaleString('pt-BR', { 
  style: 'currency', 
  currency: 'BRL' 
});


// =========================
// ADICIONAR QUENTINHA
// =========================
function adicionarQuentinha() {
  const tamanho = document.getElementById('tamanho').value;
  const limite = tamanho === 'P' ? 2 : 3;
  const qtdProteinas = quentinhaAtual.filter(isProteina).length;

  if (qtdProteinas > limite) {
    alert(`Quentinha ${tamanho} só pode ter ${limite} proteínas.`);
    return;
  }

  pedido.push({
    tamanho: tamanho,
    itens: [...quentinhaAtual]
  });

  quentinhaAtual = [];
  renderSelecionados();
  renderPedido();
  toast("✅ Quentinha adicionada!");
}


// =========================
// RENDER TABELA COMANDA
// =========================
function renderPedido() {
  const tbody = document.querySelector("#pedidoTabela tbody");
  tbody.innerHTML = "";

  pedido.forEach((q, i) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${q.tamanho}</strong></td>
        <td>${q.itens.join(", ")}</td>
        <td>
          <button class="btn-secondary" onclick="removerQuentinha(${i})">Remover</button>
          <button class="btn-ghost" onclick="duplicarQuentinha(${i})">+</button>
        </td>
      </tr>
    `;
  });
}


// =========================
// REMOVER / DUPLICAR
// =========================
function removerQuentinha(i) {
  pedido.splice(i, 1);
  renderPedido();
}

function duplicarQuentinha(i) {
  pedido.push({
    tamanho: pedido[i].tamanho,
    itens: [...pedido[i].itens]
  });

  renderPedido();
  toast("🔁 Quentinha duplicada!");
}


// =========================
// IMPRESSÃO FINAL
// =========================
function imprimirPedido() {
  if (pedido.length === 0) {
    alert("Adicione ao menos uma quentinha!");
    return;
  }

  const cliente = document.getElementById("cliente").value || "Não informado";
  const pagamento = document.getElementById("pagamento").value;
  const status = document.getElementById("statusPago").value;
  const entrega = document.getElementById("tipoEntrega").value;
  const bairro = document.getElementById("bairro").value;
  const obs = document.getElementById("observacoes").value.trim() || "";
  const dataHora = new Date().toLocaleString("pt-BR");

  // =========================
  // TRATAMENTO DO TROCO
  // =========================
  let trocoPara = document.getElementById("trocoPara").value.trim();

  if (!trocoPara) {
    trocoPara = null;
  } else {
    trocoPara = parseFloat(trocoPara.replace(",", "."));
  }

  // =========================
  // MONTAGEM DO PEDIDO
  // =========================
  let total = 0;
  let bloco = "";

  pedido.forEach((q, i) => {
    const preco = q.tamanho === "P" ? PRECO_P : PRECO_G;
    total += preco;

    bloco += `
      <div style="margin:10px 0">
        <strong>Quentinha ${i + 1} (${q.tamanho}) — ${fmt(preco)}:</strong><br>
        ${q.itens.map(x => "• " + x).join("<br>")}
      </div>
    `;
  });

  // =========================
  // TAXA DE ENTREGA
  // =========================
  let taxaEntrega = 0;

  if (entrega === "entrega" && bairro) {
    taxaEntrega = taxasEntrega[bairro] || 0;
    total += taxaEntrega;
  }

  // =========================
  // CÁLCULO DO TROCO
  // =========================
  let troco = null;

  if (pagamento === "dinheiro" && trocoPara !== null) {
    troco = trocoPara - total;
  }

  // =========================
  // JANELA DE IMPRESSÃO
  // =========================
  const janela = window.open("", "", "width=700,height=700");

  janela.document.write(`
    <html>
    <head><title>Impressão</title><meta charset="UTF-8"></head>
    <body style="font-family:Segoe UI; padding:20px">
      <h2 style="color:#FF6600">Pedido — ${cliente}</h2>

      <p><strong>Data/Hora:</strong> ${dataHora}</p>
      <p><strong>Pagamento:</strong> ${pagamento.toUpperCase()}</p>
      <p><strong>Status:</strong> ${status === "sim" ? "Pago" : "Não Pago"}</p>

      ${entrega === "entrega" ? `<p><strong>Entrega:</strong> ${bairro} — ${fmt(taxaEntrega)}</p>` : ""}

      ${trocoPara !== null ? `<p><strong>Troco para:</strong> ${fmt(trocoPara)}</p>` : ""}
      ${troco !== null ? `<p><strong>Troco:</strong> ${fmt(troco)}</p>` : ""}

      <hr>

      ${bloco}

      ${obs ? `<p><strong>Observações:</strong> ${obs}</p>` : ""}

      <hr>
      <p><strong>Total:</strong> ${fmt(total)}</p>

    </body>
    </html>
  `);

  janela.document.close();
  janela.print();

  // =========================
  // RESET APÓS IMPRESSÃO
  // =========================
  pedido = [];
  quentinhaAtual = [];
  renderPedido();
  renderSelecionados();
  document.getElementById("cliente").value = "";
  document.getElementById("observacoes").value = "";
  document.getElementById("trocoPara").value = "";
}


// =========================
// EXPORTAR FUNÇÕES PARA O HTML
// =========================
window.adicionarQuentinha = adicionarQuentinha;
window.removerQuentinha = removerQuentinha;
window.duplicarQuentinha = duplicarQuentinha;
window.imprimirPedido = imprimirPedido;