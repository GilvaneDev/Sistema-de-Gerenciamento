const Purchase = require("../models/compras");
const Produto = require("../models/produto"); // Supondo que você tenha um modelo de Produto

// Adicionar Compra
const adicionarCompra = async (req, res) => {
  try {
    const novaCompra = await Purchase.create({
      userID: req.body.userID,
      ProductID: req.body.productID,
      QuantidadeComprada: req.body.quantidadeComprada,
      DataCompra: req.body.dataCompra,
      ValorTotalCompra: req.body.valorTotalCompra,
    });

    // Atualizar estoque após a compra
    await atualizarEstoque(req.body.productID, req.body.quantidadeComprada);

    res.status(200).json(novaCompra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar Estoque
const atualizarEstoque = async (productID, quantidadeComprada) => {
  try {
    const produto = await Produto.findByPk(productID);
    if (produto) {
      produto.estoque -= quantidadeComprada;
      await produto.save();
    }
  } catch (err) {
    console.error("Erro ao atualizar estoque:", err);
  }
};

// Obter Todos os Dados de Compra
const obterDadosCompra = async (req, res) => {
  try {
    const compras = await Purchase.findAll({
      where: { userID: req.params.userID },
      order: [['createdAt', 'DESC']],
      include: [{ model: Produto, as: 'Produto' }]
    });
    res.json(compras);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obter Valor Total da Compra
const obterValorTotalCompra = async (req, res) => {
  try {
    const compras = await Purchase.findAll({
      where: { userID: req.params.userID },
    });

    const valorTotalCompra = compras.reduce((total, compra) => total + compra.ValorTotalCompra, 0);

    res.json({ valorTotalCompra });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  adicionarCompra,
  obterDadosCompra,
  obterValorTotalCompra
};
