const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize; // Ajuste o caminho aqui

const Produto = sequelize.define('Produto', {
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
  fabricante: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'produtos', // Nome da tabela no banco de dados
});

module.exports = Produto;
