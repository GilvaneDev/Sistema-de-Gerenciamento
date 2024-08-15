const Sales = require("../models/vendas");
const Product = require("../models/produto");

const atualizarEstoqueVendido = async (productID, dadosEstoqueVendido) => {

  // Atualizando estoque vendido
  try {
    
    const dadosMeuProduto = await Product.findOne({ _id: productID });
    let meuEstoqueAtualizado = dadosMeuProduto.estoque - dadosEstoqueVendido;
    console.log("MEU ESTOQUE VENDIDO: ", meuEstoqueAtualizado);

    const estoqueVendidoAtualizado = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        estoque: meuEstoqueAtualizado,
      },
      { new: true }
    );
    console.log(estoqueVendidoAtualizado);

  } catch (error) {
    console.error("Erro ao atualizar estoque vendido ", error);
  }
};

module.exports = atualizarEstoqueVendido;
