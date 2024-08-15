const Sales = require("../models/vendas");
const soldStock = require("../controller/estoqueVendas");

// Adicionar Vendas
const adicionarVendas = (req, res) => {
  const adicionarVenda = new Sales({
    userID: req.body.userID,
    ProductID: req.body.productID,
    StoreID: req.body.storeID,
    EstoqueVendido: req.body.estoqueVendido,
    DataVenda: req.body.dataVenda,
    ValorTotalVenda: req.body.valorTotalVenda,
  });

  adicionarVenda
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.estoqueVendido);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Obter Todos os Dados de Vendas
const obterDadosVendas = async (req, res) => {
  const encontrarTodosDadosVendas = await Sales.find({ "userID": req.params.userID })
    .sort({ _id: -1 })
    .populate("ProductID")
    .populate("StoreID"); // -1 para ordem descendente
  res.json(encontrarTodosDadosVendas);
};

// Obter valor total das vendas
const obterValorTotalVendas = async (req, res) => {
  let valorTotalVenda = 0;
  const dadosVendas = await Sales.find({ "userID": req.params.userID });
  dadosVendas.forEach((venda) => {
    valorTotalVenda += venda.ValorTotalVenda;
  });
  res.json({ valorTotalVenda });
};

// Obter vendas mensais
const obterVendasMensais = async (req, res) => {
  try {
    const vendas = await Sales.find();

    // Inicializar array com 12 zeros
    const valorVendas = [];
    valorVendas.length = 12;
    valorVendas.fill(0);

    vendas.forEach((venda) => {
      const indiceMes = parseInt(venda.DataVenda.split("-")[1]) - 1;

      valorVendas[indiceMes] += venda.ValorTotalVenda;
    });

    res.status(200).json({ valorVendas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

module.exports = { adicionarVendas, obterVendasMensais, obterDadosVendas, obterValorTotalVendas };
