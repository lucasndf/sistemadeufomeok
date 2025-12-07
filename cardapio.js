// CARDÁPIO POR DIA
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

function definirDiaAtual() {
  const hoje = new Date().getDay();
  const map = ["segunda", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  document.getElementById("dia").value = map[hoje];
  atualizarMenu();
}

window.addEventListener("DOMContentLoaded", definirDiaAtual);
