'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }}, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Note, { foreignKey: 'userId' });
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
