const express = require('express');
const router = express.Router();
const productController = require('../controller/produto');

// Adicionar Produto
router.post('/add', productController.adicionarProduto);

// Obter Todos os Produtos
router.get('/get/:userId', productController.obterTodosProdutos);

// Deletar Produto Selecionado
router.delete('/delete/:id', productController.deletarProdutoSelecionado);

// Atualizar Produto Selecionado
router.put('/update', productController.atualizarProdutoSelecionado);

// Buscar Produto
router.get('/search', productController.buscarProduto);

module.exports = router;
