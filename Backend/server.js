const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/produto");
const storeRoute = require("./router/loja");
const purchaseRoute = require("./router/compras");
const salesRoute = require("./router/vendas");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Para hash de senha
const User = require("./models/usuarios");
const Produto = require("./models/produto");

const app = express();
const PORT = 4000;

main(); // Conecta ao banco de dados
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // Idealmente, gere um token JWT aqui
        res.status(200).json({ IdUsuario: user.IdUsuario, email: user.email });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Registro de Usuário
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, imageUrl } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
// Log os dados recebidos para depuração
console.log("Received data for registration:");
console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Email:", email);
console.log("Password:", password); // Nota: Não é recomendável exibir senhas em logs
console.log("Phone Number:", phoneNumber);
console.log("Image URL:", imageUrl);
    const registerUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      imageUrl,
    });

    res.status(201).json(registerUser);
    console.log("Signup Successful");
  } catch (err) {
    console.log("Signup: ", err);
    res.status(400).json({ message: "Failed to Register User", error: err });
  }
});

// Test Route to Get a Product by ID
app.get("/testget", async (req, res) => {
  try {
    const result = await Produto.findOne({ where: { id: '6429979b2e5434138eda1564' } });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listen to the server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
