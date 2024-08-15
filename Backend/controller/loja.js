const Store = require("../models/loja");

// Adicionar Loja
const addStore = async (req, res) => {
  console.log(req.body);
  const novaLoja = new Store({
    userID: req.body.userId,
    nome: req.body.nome,
    categoria: req.body.categoria,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    imagem: req.body.imagem
  });

  try {
    const result = await novaLoja.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(402).send(err);
  }
};

// Obter Todas as Lojas
const getAllStores = async (req, res) => {
  try {
    const encontrarTodasLojas = await Store.find({ userID: req.params.userID }).sort({ _id: -1 });
    res.json(encontrarTodasLojas);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { addStore, getAllStores };
