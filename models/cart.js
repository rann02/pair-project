'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Course)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    quantity: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    nameCourse: DataTypes.STRING,
    CourseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};