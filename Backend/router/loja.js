const express = require("express");
const router = express.Router();
const storeController = require("../controller/loja");

// Adicionar Loja
router.post("/add", storeController.addStore);

// Obter Todas as Lojas
router.get("/get/:userID", storeController.getAllStores);

module.exports = router;
