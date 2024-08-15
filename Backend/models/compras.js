const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize; // Importe sua configuração do Sequelize

const Compra = sequelize.define('Compra', {
  usuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela de usuários
      key: 'id', // Chave primária da tabela de usuários
    }
  },
  produtoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos', // Nome da tabela de produtos
      key: 'id', // Chave primária da tabela de produtos
    }
  },
  quantidadeComprada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataCompra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotalCompra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'compras', // Nome da tabela no banco de dados
});

module.exports = Compra;
