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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't by empty"
        },
        notNull:{
          msg: "name can't by empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description can't by empty"
        },
        notNull:{
          msg: "description can't by empty"
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "duration can't by empty"
        },
        notNull:{
          msg: "duration can't by empty"
        }
      }
    },
    rating: DataTypes.INTEGER,
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "price can't by empty"
        },
        notNull:{
          msg: "price can't by empty"
        }
      }
    },
    CategoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category can't by empty"
        },
        notNull:{
          msg: "Category can't by empty"
        }
      }
    }
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