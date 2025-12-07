function imprimirPedido() {
  if (pedido.length === 0) {
    alert("Adicione ao menos uma quentinha!");
    return;
  }

  const cliente = document.getElementById("cliente").value || "Não informado";
  const pagamento = document.getElementById("pagamento").value.toUpperCase();
  const status = document.getElementById("statusPago").value === "sim" ? "PAGO" : "NÃO PAGO";
  const entrega = document.getElementById("tipoEntrega").value;
  const bairro = document.getElementById("bairro").value;
  const trocoPara = Number(document.getElementById("trocoPara").value || 0);
  const obs = document.getElementById("observacoes").value?.trim() || "Nenhuma";

  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR");

  // taxa
  let taxa = entrega === "entrega" && bairro ? (taxasEntrega[bairro] || 0) : 0;

  // cálculo
  let total = 0;
  let detalhes = "";

  pedido.forEach((q, i) => {
    const preco = q.tamanho === "P" ? PRECO_P : PRECO_G;
    total += preco;

    detalhes += `
QUENTINHA ${i + 1}
TAMANHO: ${q.tamanho}
--------------------------------
${q.itens.map(x => "• " + x).join("\n")}
`;
  });

  // acrescenta taxa
  total += taxa;

  // calcula troco final
  const trocoFinal = trocoPara > 0 ? (trocoPara - total) : null;

  const win = window.open("", "", "width=300,height=600");

  win.document.write(`
<html>
<head>
<meta charset="UTF-8">
<style>
  body {
    font-family: monospace;
    width: 80mm;
    font-size: 14px;
    padding: 5px;
  }
  h1 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 12px;
  }
  .line {
    border-top: 1px dashed #000;
    margin: 10px 0;
  }
  pre {
    white-space: pre-wrap;
    margin: 0;
  }
</style>
</head>

<body>

<h1>DEU FOME</h1>

<b>Cliente:</b> ${cliente}<br>
<b>Data:</b> ${data} — ${hora}<br>
<b>Pagamento:</b> ${pagamento}<br>
<b>Status:</b> ${status}<br>
${entrega === "entrega" ? `<b>Entrega:</b> ${bairro} (R$ ${taxa},00)<br>` : `<b>Retirada</b><br>`}
${trocoPara > 0 ? `<b>Troco para:</b> R$ ${trocoPara}<br>` : ""}
${trocoFinal !== null ? `<b>Troco:</b> R$ ${trocoFinal.toFixed(2).replace('.', ',')}<br>` : ""}

<div class="line"></div>

<pre>${detalhes}</pre>

<div class="line"></div>

<b>Observações:</b> ${obs}

<div class="line"></div>

<b>Total:</b> R$ ${total},00

</body>
</html>
  `);

  win.document.close();
  win.print();
}
