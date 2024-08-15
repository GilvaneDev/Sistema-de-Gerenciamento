const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Usuario = sequelize.define('Usuario', {
  IdUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NomeUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TipoUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, 
  tableName: 'usuario', 
});

module.exports = Usuario;
