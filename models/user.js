'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't by empty"
        },
        notNull: {
          msg: "name can't by empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "role can't by empty"
        },
        notNull: {
          msg: "role can't by empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email can't by empty"
        },
        notNull: {
          msg: "email can't by empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can't by empty"
        },
        notNull: {
          msg: "password can't by empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash
  });

  return User;
};