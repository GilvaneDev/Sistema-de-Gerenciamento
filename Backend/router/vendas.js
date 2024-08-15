const express = require("express");
const router = express.Router();
const salesController = require("../controller/vendas");

// Adicionar Vendas
router.post("/add", salesController.adicionarVendas);

// Obter Todas as Vendas
router.get("/get/:userID", salesController.obterDadosVendas);

// Obter Vendas Mensais
router.get("/getmonthly", salesController.obterVendasMensais);

// Obter Total de Vendas
router.get("/get/:userID/totalsaleamount", salesController.obterValorTotalVendas);

module.exports = router;
