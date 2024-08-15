const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize; // Importe sua configuração do Sequelize

const Venda = sequelize.define('Venda', {
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
  lojaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lojas', // Nome da tabela de lojas
      key: 'id', // Chave primária da tabela de lojas
    }
  },
  estoqueVendido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataVenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotalVenda: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'vendas', // Nome da tabela no banco de dados
});

module.exports = Venda;
