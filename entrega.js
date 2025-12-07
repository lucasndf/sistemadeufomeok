// TAXAS DE ENTREGA
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

function toggleEndereco() {
  const val = document.getElementById("tipoEntrega").value;
  document.getElementById("bairroWrap").style.display = val === "entrega" ? "block" : "none";
}

function toggleTroco() {
  const val = document.getElementById("pagamento").value;
  document.getElementById("trocoWrap").style.display = val === "dinheiro" ? "block" : "none";
}