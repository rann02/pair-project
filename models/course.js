'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.hasMany(models.Cart)
    }

    static filterCourse(filter) {
      const Category = sequelize.models.Category
      let queryFilter = {}
      
      if(filter){
        queryFilter.include = {
          model: Category,
          where:{
            'name': filter
          }
        }
      }

      return Course.findAll(queryFilter)
    }

  }

  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.beforeCreate((course, options) => {
    if (course.name) {
      course.rating = 0
    }
  });
  return Course;
};