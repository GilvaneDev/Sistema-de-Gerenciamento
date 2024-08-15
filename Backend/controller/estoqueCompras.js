const Purchase = require("../models/compras");
const Product = require("../models/produto");

const atualizarEstoqueCompra = async (productID, dadosEstoqueCompra) => {
  // Atualizando estoque de compra
  try {
    const dadosMeuProduto = await Product.findOne({ _id: productID });
    let meuEstoqueAtualizado = parseInt(dadosMeuProduto.estoque) + dadosEstoqueCompra;

    const estoqueCompraAtualizado = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        estoque: meuEstoqueAtualizado,
      },
      { new: true }
    );
    console.log(estoqueCompraAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar estoque de compra ", error);
  }
};

module.exports = atualizarEstoqueCompra;
