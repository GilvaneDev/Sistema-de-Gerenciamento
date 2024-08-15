const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/compras");

// Adicionar Compra
router.post("/add", purchaseController.adicionarCompra);

// Obter Todos os Dados de Compras
router.get("/get/:userID", purchaseController.obterDadosCompra);

// Obter Total de Compras
router.get("/get/:userID/totalpurchaseamount", purchaseController.obterValorTotalCompra);

module.exports = router;
