const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize; // Importe sua configuração do Sequelize

const Loja = sequelize.define('Loja', {
  usuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela de usuários
      key: 'id', // Chave primária da tabela de usuários
    }
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'lojas', // Nome da tabela no banco de dados
});

module.exports = Loja;
