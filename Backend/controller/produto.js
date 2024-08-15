const Product = require('../models/produto');
const Purchase = require('../models/compras');
const Sales = require('../models/vendas');

// Adicionar Produto
const adicionarProduto = async (req, res) => {
  try {
    const novoProduto = await Product.create({
      usuarioID: req.body.userId,
      nome: req.body.nome,
      fabricante: req.body.fabricante,
      estoque: 0,
      descricao: req.body.descricao,
    });

    res.status(200).send(novoProduto);
  } catch (err) {
    res.status(402).send(err);
  }
};

// Obter Todos os Produtos
const obterTodosProdutos = async (req, res) => {
  try {
    const encontrarTodosProdutos = await Product.findAll({
      where: { usuarioID: req.params.userId },
      order: [['createdAt', 'DESC']], // Ordenar por data de criação, mais recente primeiro
    });
    res.json(encontrarTodosProdutos);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Deletar Produto Selecionado
const deletarProdutoSelecionado = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    await Purchase.destroy({ where: { ProductID: req.params.id } });
    await Sales.destroy({ where: { ProductID: req.params.id } });

    res.json({ message: 'Produto deletado com sucesso.' });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Atualizar Produto Selecionado
const atualizarProdutoSelecionado = async (req, res) => {
  try {
    const resultadoAtualizado = await Product.update(
      {
        nome: req.body.nome,
        fabricante: req.body.fabricante,
        descricao: req.body.descricao,
      },
      {
        where: { id: req.body.productID },
        returning: true,
        plain: true,
      }
    );

    res.json(resultadoAtualizado[1]); // O resultado da atualização é o segundo item do array
  } catch (error) {
    res.status(402).send('Erro ao atualizar o produto');
  }
};

// Buscar Produtos
const buscarProduto = async (req, res) => {
  try {
    const termoBusca = req.query.searchTerm;
    const produtos = await Product.findAll({
      where: {
        nome: { [Sequelize.Op.iLike]: `%${termoBusca}%` },
      },
    });
    res.json(produtos);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  adicionarProduto,
  obterTodosProdutos,
  deletarProdutoSelecionado,
  atualizarProdutoSelecionado,
  buscarProduto,
};
